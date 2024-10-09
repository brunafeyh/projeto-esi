import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { RESET } from 'jotai/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { accessTokenAtom, refreshTokenAtom } from '../contexts/auth';
import { getExpirationTime, getUserFromToken } from '../utils/auth';
import { AuthCredentials } from '../schemas/form-types';
import { AuthorizationRole, RegisterCredentials } from '../types/auth';
import { usePontuation } from './use-pontuation';
import { API_BASE_URL } from '../shared/api';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const expirationTime = getExpirationTime(accessToken);
  const navigate = useNavigate();
  const { setNewPontuation } = usePontuation(); 

  const user = useMemo(() => getUserFromToken(accessToken), [accessToken]);

  const updateTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const login = useCallback(async (credentials: AuthCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authentication/login`, credentials);
      const { token } = response.data;
      updateTokens(token, token);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Error logging in. Please check your credentials.');
      console.error('Error logging in:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const { email, password, cpf, name } = credentials;
      const role = 'ROLE_CUSTOMER';

      await axios.post(`${API_BASE_URL}/authentication/create-user`, {
        email,
        password,
        cpf,
        name,
        role,
      });

      await setNewPontuation({
        id: cpf, 
        pontosAcumulados: 0,
        nome: name,
        cpf: cpf,
      });

      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Error registering user. Please check your details.');
      console.error('Error registering user:', error);
      return false;
    }
  }, [setNewPontuation]);

  const logout = useCallback(async () => {
    try {
      setAccessToken(RESET);
      setRefreshToken(RESET);
      delete axios.defaults.headers.common['Authorization'];
      toast.info('Logged out successfully.');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out.');
      console.error('Error logging out:', error);
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  const renewToken = useCallback(async () => {
    if (isRefreshTokenExpired() || !refreshToken) return;

    try {
      toast.info('Token renewal not implemented.');
      console.log('Token renewal not implemented');
    } catch (error) {
      toast.error('Error renewing token.');
      console.error('Error renewing token:', error);
      logout();
    }
  }, [refreshToken, logout]);

  const hasSomeRole = useCallback(
    (requiredRoles: AuthorizationRole[]) => {
      return user ? requiredRoles.includes(user.role) : false;
    },
    [user]
  );

  const isAuthenticated = useCallback(() => {
    return accessToken && !isAccessTokenExpired();
  }, [accessToken]);

  const isAccessTokenExpired = useCallback(() => {
    return Date.now() > expirationTime;
  }, [expirationTime]);

  const isRefreshTokenExpired = useCallback(() => {
    return Date.now() > expirationTime;
  }, [expirationTime]);

  const isTokenAboutToExpire = useCallback(() => {
    const currentTime = Date.now();
    return !isAccessTokenExpired() && currentTime > expirationTime - 30000;
  }, [expirationTime, isAccessTokenExpired]);

  const isClient = () => {
      return !(user?.role === 'ROLE_ATTENDANT' || user?.role === 'ROLE_ADMINISTRATOR')
  }
  const isAdminOrAttendant = () => {
    return !isClient() && isAuthenticated()
  }
  return {
    token: accessToken,
    accessToken,
    refreshToken,
    isClient,
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isRefreshTokenExpired,
    isTokenAboutToExpire,
    hasSomeRole,
    renewToken,
    isAdminOrAttendant
  };
};

import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { RESET } from 'jotai/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { accessTokenAtom, refreshTokenAtom } from '../contexts/auth';
import { getExpirationTime, getUserFromToken } from '../utils/auth';
import { AuthCredentials } from '../schemas/form-types';
import { AuthorizationRole } from '../types/auth';

const API_BASE_URL = 'https://menu-master-production.up.railway.app';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const expirationTime = getExpirationTime(accessToken);
  const navigate = useNavigate();

  const user = useMemo(() => getUserFromToken(accessToken), [accessToken]);

  const updateTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const login = useCallback(async (credentials: AuthCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authentication/login`, credentials)
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
      // Assuming token refresh endpoint is available in the future
      // const response = await axios.post(`${API_BASE_URL}/authentication/refresh-token`, { refreshToken });
      // const newTokens = response.data;
      // updateTokens(newTokens.access_token, newTokens.refresh_token);
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
    // Assuming refreshToken expiration is the same as accessToken for simplicity
    return Date.now() > expirationTime;
  }, [expirationTime]);

  const isTokenAboutToExpire = useCallback(() => {
    const currentTime = Date.now();
    return !isAccessTokenExpired() && currentTime > expirationTime - 30000;
  }, [expirationTime, isAccessTokenExpired]);

  return {
    token: accessToken,
    accessToken,
    refreshToken,
    user,
    login,
    logout,
    isAuthenticated,
    isRefreshTokenExpired,
    isTokenAboutToExpire,
    hasSomeRole,
    renewToken,
  };
};

import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../shared/api';

export interface LoginResponse {
  token: string;
}

export interface CreateUserResponse {
  message: string;
}

export interface ValidateTokenResponse {
  message: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/authentication/login`, {
      email,
      password,
    });
    toast.success('Login successful!');
    return response.data.token;
  } catch (error) {
    toast.error('Login failed. Please check your credentials.');
    console.error('Login error:', error);
    throw error;
  }
};

export const createUser = async (user: {
  email: string;
  password: string;
  cpf: string;
  name: string;
  role: string;
}) => {
  try {
    const response = await axios.post<CreateUserResponse>(`${API_BASE_URL}/authentication/create-user`, user);
    toast.success('User created successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to create user. Please try again.');
    console.error('Create user error:', error);
    throw error;
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await axios.get<ValidateTokenResponse>(`${API_BASE_URL}/authentication/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Token validated successfully!');
    return response.data.message;
  } catch (error) {
    toast.error('Token validation failed.');
    console.error('Validate token error:', error);
    throw error;
  }
};

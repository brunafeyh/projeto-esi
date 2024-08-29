import { z } from "zod";

export type AuthorizationRole = 'ROLE_ADMINISTRATOR' | 'ROLE_CUSTOMER' | 'ROLE_ATTENDANT';

export interface User {
  name: string;
  email: string;
  cpf: string
  role: AuthorizationRole;
}

export interface AccessToken {
  exp: number;
  name?: string;
  email?: string;
  cpf?: string;
  role: AuthorizationRole;
}

export const credentialsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório').regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem coincidir',
  path: ['confirmPassword'],
});
export type RegisterCredentials = z.output<typeof credentialsSchema>
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
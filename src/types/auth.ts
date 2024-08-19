export type AuthorizationRole = 'ADMINISTRATOR' | 'CUSTUMER' | 'ATTENDANT';

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
  roles?: AuthorizationRole[];
}
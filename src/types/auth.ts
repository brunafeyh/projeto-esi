export type AuthorizationRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface User {
  name: string;
  email: string;
  role: AuthorizationRole;
}

export interface AccessToken {
  exp: number;
  name?: string;
  email?: string;
  roles?: AuthorizationRole[];
}

export interface User {
  email: string,
  password?: string,
  roles: string[],
  isVerified: 1 | 0;
}

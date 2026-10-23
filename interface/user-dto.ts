export interface UserDto {
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

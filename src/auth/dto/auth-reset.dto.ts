import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsStrongPassword({ minLength: 8 })
  password: string;

  @IsJWT()
  token: string;
}

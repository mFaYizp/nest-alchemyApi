import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

//login data types
export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserInputDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

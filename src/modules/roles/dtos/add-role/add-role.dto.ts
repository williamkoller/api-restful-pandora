import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  permissions: string[];

  @IsString()
  @IsNotEmpty()
  userId: string;
}

import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  roles: number[];
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

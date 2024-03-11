import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  urlLogo: string;

  @IsString()
  urlFrontPage: string;

  @IsString()
  address: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  role: string;

}

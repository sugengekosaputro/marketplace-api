import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { AdministratorRole } from '../infrastructure/persistence/relational/entities/administrator.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministratorDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong.' })
  full_name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Format email tidak valid.' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong.' })
  @MinLength(8, { message: 'Password minimal harus 8 karakter.' })
  password: string;

  @ApiProperty()
  @IsEnum(AdministratorRole, { message: 'Role tidak valid.' })
  role: AdministratorRole;
}

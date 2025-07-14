import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdministratorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

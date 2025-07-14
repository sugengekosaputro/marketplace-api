import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderHistoriesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommoditiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

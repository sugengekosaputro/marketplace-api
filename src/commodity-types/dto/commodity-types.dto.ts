import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommodityTypesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

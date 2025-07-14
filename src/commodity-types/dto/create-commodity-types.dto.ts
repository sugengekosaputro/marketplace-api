import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommodityTypesDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiPropertyOptional({ example: 'Perkebunan', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsString()
  name: string;
}

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateCommoditiesDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiPropertyOptional({ example: 'Perkebunan', type: String })
  @Transform(lowerCaseTransformer)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'b6a8e153-2d3d-4e7a-9c5e-39557d78fc9a',
    type: String,
  })
  @IsString()
  @IsUUID('4', { message: 'ID Jenis Komoditas harus berupa UUID.' })
  typeId: string;
}

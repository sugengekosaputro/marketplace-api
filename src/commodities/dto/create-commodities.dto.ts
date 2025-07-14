import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommoditiesDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4', { message: 'ID Jenis Komoditas harus berupa UUID.' })
  typeId: string;
}

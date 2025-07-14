import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOrdersDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nama pelanggan tidak boleh kosong.' })
  customerName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nomor telepon pelanggan tidak boleh kosong.' })
  customerPhone: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Format email pelanggan tidak valid.' })
  customerEmail: string;

  // Informasi Komoditas
  @ApiProperty()
  @IsUUID('4', { message: 'ID Jenis Komoditas harus berupa UUID.' })
  commodityTypeId: string;

  // Hanya validasi salah satu: commodityId jika ada, atau newCommodityName jika tidak ada. //cancel
  // @ValidateIf((o) => !o.newCommodityName)
  @ApiProperty()
  @IsUUID('4', { message: 'ID Komoditas harus berupa UUID.' })
  commodityId?: string;

  // @ValidateIf((o) => !o.commodityId)
  // @IsString()
  // @IsNotEmpty()
  // newCommodityName?: string;

  // Detail Pesanan
  @ApiProperty()
  @IsNumber({}, { message: 'Total harus berupa angka.' })
  @Min(1, { message: 'Total pesanan minimal harus 1.' })
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Satuan tidak boleh kosong.' })
  unit: string;
}

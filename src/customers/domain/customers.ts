import { ApiProperty } from '@nestjs/swagger';
import { Orders } from 'src/orders/domain/orders';

export class Customers {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  // Optional: only if you want to expose related orders
  @ApiProperty({ type: () => [Orders], required: false })
  orders?: Orders[];
}

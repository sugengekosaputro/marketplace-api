import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../infrastructure/persistence/relational/entities/orders.entity';
import { Customers } from 'src/customers/domain/customers';
import { Commodities } from 'src/commodities/domain/commodities';
import { OrderHistories } from 'src/order-histories/domain/order-histories';

export class Orders {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ type: Number, example: 15000.25 })
  total: number;

  @ApiProperty({ type: String, example: 'kg' })
  unit: string;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ type: () => Customers })
  customer: Customers;

  @ApiProperty({ type: () => Commodities })
  commodities: Commodities;

  @ApiProperty({ type: () => [OrderHistories], required: false })
  history?: OrderHistories[];
}

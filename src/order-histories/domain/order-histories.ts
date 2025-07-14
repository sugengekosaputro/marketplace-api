import { ApiProperty } from '@nestjs/swagger';
import { Administrator } from 'src/administrators/domain/administrator';
import { Orders } from 'src/orders/domain/orders';
import { OrderHistoryStatus } from '../infrastructure/persistence/relational/entities/order-histories.entity';

export class OrderHistories {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ enum: OrderHistoryStatus })
  status: OrderHistoryStatus;

  @ApiProperty({ type: String, required: false })
  notes?: string;

  @ApiProperty({ type: () => Orders })
  order: Orders;

  @ApiProperty({ type: () => Administrator, required: false })
  updatedBy?: Administrator;

  @ApiProperty({
    type: () => Orders,
    description: 'order',
  })
  type?: Orders | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CommoditiesEntity } from '../../../../../commodities/infrastructure/persistence/relational/entities/commodities.entity';
import { OrderHistoriesEntity } from '../../../../../order-histories/infrastructure/persistence/relational/entities/order-histories.entity';
import { CustomersEntity } from '../../../../../customers/infrastructure/persistence/relational/entities/customers.entity';

export enum OrderStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  PROCESSED = 'PROCESSED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity({
  name: 'orders',
})
export class OrdersEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  unit: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING_VERIFICATION,
  })
  status: OrderStatus;

  @ManyToOne(() => CustomersEntity, (customer) => customer.orders)
  customer: CustomersEntity;

  @ManyToOne(() => CommoditiesEntity, (commodity) => commodity.orders)
  commodities: CommoditiesEntity;

  @OneToMany(() => OrderHistoriesEntity, (history) => history.order, {
    cascade: true,
  })
  history: OrderHistoriesEntity[];
}

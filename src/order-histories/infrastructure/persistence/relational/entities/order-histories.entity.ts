import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  OrdersEntity,
  OrderStatus,
} from '../../../../../orders/infrastructure/persistence/relational/entities/orders.entity';
import { AdministratorEntity } from '../../../../../administrators/infrastructure/persistence/relational/entities/administrator.entity';

@Entity({
  name: 'order_histories',
})
export class OrderHistoriesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    enumName: 'status',
  })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => OrdersEntity, (order) => order.history)
  order: OrdersEntity;

  @ManyToOne(() => AdministratorEntity, { nullable: true, eager: false }) // `eager: false` is default
  updatedBy: AdministratorEntity;
}

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
import { OrdersEntity } from '../../../../../orders/infrastructure/persistence/relational/entities/orders.entity';
import { AdministratorEntity } from '../../../../../administrators/infrastructure/persistence/relational/entities/administrator.entity';

export enum OrderHistoryStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  PROCESSED = 'PROCESSED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
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
    enum: OrderHistoryStatus,
    default: OrderHistoryStatus.PENDING_VERIFICATION,
  })
  status: OrderHistoryStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => OrdersEntity, (order) => order.history)
  order: OrdersEntity;

  @ManyToOne(() => AdministratorEntity, { nullable: true, eager: false }) // `eager: false` is default
  updatedBy: AdministratorEntity;
}

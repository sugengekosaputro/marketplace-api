import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { OrdersEntity } from '../../../../../orders/infrastructure/persistence/relational/entities/orders.entity';

@Entity({
  name: 'customers',
})
export class CustomersEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  full_name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => OrdersEntity, (order) => order.customer)
  orders: OrdersEntity[];
}

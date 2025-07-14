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
import { CommodityTypesEntity } from '../../../../../commodity-types/infrastructure/persistence/relational/entities/commodity-types.entity';
import { OrdersEntity } from '../../../../../orders/infrastructure/persistence/relational/entities/orders.entity';

@Entity({
  name: 'commodities',
})
export class CommoditiesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => CommodityTypesEntity, (type) => type.commodities)
  type: CommodityTypesEntity;

  @OneToMany(() => OrdersEntity, (order) => order.commodities)
  orders: OrdersEntity[];
}

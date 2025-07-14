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
import { CommoditiesEntity } from '../../../../../commodities/infrastructure/persistence/relational/entities/commodities.entity';

@Entity({
  name: 'commodity_types',
})
export class CommodityTypesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CommoditiesEntity, (commodity) => commodity.type)
  commodities: CommoditiesEntity[];
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export enum AdministratorRole {
  SUPERADMIN = 'SUPERADMIN',
  STAFF = 'STAFF',
  TECHNICAL = 'TECHNICAL',
}
@Entity({
  name: 'administrator',
})
export class AdministratorEntity extends EntityRelationalHelper {
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
  email: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: AdministratorRole,
    default: AdministratorRole.SUPERADMIN,
  })
  role: AdministratorRole;
}

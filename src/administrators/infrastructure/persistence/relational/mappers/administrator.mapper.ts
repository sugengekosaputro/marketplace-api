import { Administrator } from '../../../../domain/administrator';
import { AdministratorEntity } from '../entities/administrator.entity';

export class AdministratorMapper {
  static toDomain(raw: AdministratorEntity): Administrator {
    const domainEntity = new Administrator();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.email = raw.email;
    domainEntity.full_name = raw.full_name;
    domainEntity.password_hash = raw.password_hash;
    domainEntity.role = raw.role;
    return domainEntity;
  }

  static toPersistence(domainEntity: Administrator): AdministratorEntity {
    const persistenceEntity = new AdministratorEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.full_name = domainEntity.full_name;
    persistenceEntity.password_hash = domainEntity.password_hash;
    persistenceEntity.role = domainEntity.role;

    return persistenceEntity;
  }
}

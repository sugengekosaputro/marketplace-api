import { Administrator } from '../../../../domain/administrator';
import { AdministratorEntity } from '../entities/administrator.entity';

export class AdministratorMapper {
  static toDomain(raw: AdministratorEntity): Administrator {
    const domainEntity = new Administrator();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

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

    return persistenceEntity;
  }
}

import { CommodityTypes } from '../../../../domain/commodity-types';
import { CommodityTypesEntity } from '../entities/commodity-types.entity';

export class CommodityTypesMapper {
  static toDomain(raw: CommodityTypesEntity): CommodityTypes {
    const domainEntity = new CommodityTypes();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.name = raw.name;

    return domainEntity;
  }

  static toPersistence(domainEntity: CommodityTypes): CommodityTypesEntity {
    const persistenceEntity = new CommodityTypesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.name = domainEntity.name;

    return persistenceEntity;
  }
}

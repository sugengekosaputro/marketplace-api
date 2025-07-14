import { Commodities } from '../../../../domain/commodities';
import { CommoditiesEntity } from '../entities/commodities.entity';

export class CommoditiesMapper {
  static toDomain(raw: CommoditiesEntity): Commodities {
    const domainEntity = new Commodities();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Commodities): CommoditiesEntity {
    const persistenceEntity = new CommoditiesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}

import { Commodities } from '../../../../domain/commodities';
import { CommoditiesEntity } from '../entities/commodities.entity';
import { CommodityTypesEntity } from '../../../../../commodity-types/infrastructure/persistence/relational/entities/commodity-types.entity';

export class CommoditiesMapper {
  static toDomain(raw: CommoditiesEntity): Commodities {
    console.log(raw);
    const domainEntity = new Commodities();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.name = raw.name;
    domainEntity.type = raw.type;

    return domainEntity;
  }

  static toPersistence(domainEntity: Commodities): CommoditiesEntity {
    const persistenceEntity = new CommoditiesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    if (domainEntity.type?.id) {
      const typeEntity = new CommodityTypesEntity();
      typeEntity.id = domainEntity.type.id;
      persistenceEntity.type = typeEntity;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}

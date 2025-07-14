import { OrderHistories } from '../../../../domain/order-histories';
import { OrderHistoriesEntity } from '../entities/order-histories.entity';

export class OrderHistoriesMapper {
  static toDomain(raw: OrderHistoriesEntity): OrderHistories {
    const domainEntity = new OrderHistories();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderHistories): OrderHistoriesEntity {
    const persistenceEntity = new OrderHistoriesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}

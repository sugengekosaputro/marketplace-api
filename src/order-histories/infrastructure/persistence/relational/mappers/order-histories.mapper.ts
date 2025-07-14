import { OrdersEntity } from 'src/orders/infrastructure/persistence/relational/entities/orders.entity';
import { OrderHistories } from '../../../../domain/order-histories';
import { OrderHistoriesEntity } from '../entities/order-histories.entity';
import { AdministratorEntity } from 'src/administrators/infrastructure/persistence/relational/entities/administrator.entity';
import { Administrator } from 'src/administrators/domain/administrator';
import { OrdersMapper } from 'src/orders/infrastructure/persistence/relational/mappers/orders.mapper';

export class OrderHistoriesMapper {
  static toDomain(raw: OrderHistoriesEntity): OrderHistories {
    const domain = new OrderHistories();

    domain.id = raw.id;
    domain.status = raw.status;
    domain.notes = raw.notes;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    domain.deletedAt = raw.deletedAt;

    if (raw.order) {
      domain.order = OrdersMapper.toDomain(raw.order);
    }

    if (raw.updatedBy) {
      domain.updatedBy = {
        id: raw.updatedBy.id,
        createdAt: raw.updatedBy.createdAt,
        updatedAt: raw.updatedBy.updatedAt,
        deletedAt: raw.updatedBy.deletedAt,
        // You may add more fields if needed
      } as Administrator;
    }

    return domain;
  }

  static toPersistence(domain: OrderHistories): OrderHistoriesEntity {
    const entity = new OrderHistoriesEntity();

    if (domain.id) entity.id = domain.id;

    entity.status = domain.status;
    entity.notes = domain.notes ?? '-';
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;

    if (domain.order?.id) {
      const orderEntity = new OrdersEntity();
      orderEntity.id = domain.order.id;
      entity.order = orderEntity;
    }

    if (domain.updatedBy?.id) {
      const adminEntity = new AdministratorEntity();
      adminEntity.id = domain.updatedBy.id;
      entity.updatedBy = adminEntity;
    }

    return entity;
  }
}

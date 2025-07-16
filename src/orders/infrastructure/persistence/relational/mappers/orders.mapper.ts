import { CustomersEntity } from 'src/customers/infrastructure/persistence/relational/entities/customers.entity';
import { Orders } from '../../../../domain/orders';
import { OrdersEntity } from '../entities/orders.entity';
import { CommoditiesEntity } from 'src/commodities/infrastructure/persistence/relational/entities/commodities.entity';
import { OrderHistoriesMapper } from 'src/order-histories/infrastructure/persistence/relational/mappers/order-histories.mapper';
import { CustomersMapper } from '../../../../../customers/infrastructure/persistence/relational/mappers/customers.mapper';
import { CommoditiesMapper } from 'src/commodities/infrastructure/persistence/relational/mappers/commodities.mapper';

export class OrdersMapper {
  static toDomain(raw: OrdersEntity): Orders {
    const domain = new Orders();
    domain.id = raw.id;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    domain.deletedAt = raw.deletedAt;
    domain.total = Number(raw.total);
    domain.unit = raw.unit;
    domain.status = raw.status;
    domain.orderCode = raw.orderCode;

    if (raw.customer) {
      domain.customer = CustomersMapper.toDomain(raw.customer);
    }

    if (raw.commodities) {
      domain.commodities = CommoditiesMapper.toDomain(raw.commodities);
    }

    if (raw.history?.length) {
      domain.history = raw.history.map(OrderHistoriesMapper.toDomain);
    }

    return domain;
  }

  static toPersistence(domain: Orders): OrdersEntity {
    const entity = new OrdersEntity();

    if (domain.id) entity.id = domain.id;

    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    entity.total = domain.total;
    entity.unit = domain.unit;
    entity.status = domain.status;
    entity.orderCode = domain.orderCode;

    if (domain.customer?.id) {
      const customerEntity = new CustomersEntity();
      customerEntity.id = domain.customer.id;
      entity.customer = customerEntity;
    }

    if (domain.commodities?.id) {
      const commodityEntity = new CommoditiesEntity();
      commodityEntity.id = domain.commodities.id;
      entity.commodities = commodityEntity;
    }

    if (domain.history?.length) {
      entity.history = domain.history.map(OrderHistoriesMapper.toPersistence);
    }

    return entity;
  }
}

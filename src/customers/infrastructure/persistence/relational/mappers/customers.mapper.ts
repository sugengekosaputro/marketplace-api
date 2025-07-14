import { Customers } from '../../../../domain/customers';
import { CustomersEntity } from '../entities/customers.entity';

export class CustomersMapper {
  /**
   * Maps a persistence entity (CustomersEntity) to a domain model (Customers).
   */
  static toDomain(raw: CustomersEntity): Customers {
    const domain = new Customers();

    // Basic fields
    domain.id = raw.id;
    domain.full_name = raw.full_name;
    domain.phone = raw.phone;
    domain.email = raw.email;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    domain.deletedAt = raw.deletedAt;

    // Map related orders if available
    // if (raw.orders?.length) {
    //   domain.orders = raw.orders.map(OrdersMapper.toDomain);
    // } else {
    //   domain.orders = [];
    // }

    return domain;
  }

  /**
   * Maps a domain model (Customers) to a persistence entity (CustomersEntity).
   */
  static toPersistence(domain: Customers): CustomersEntity {
    const entity = new CustomersEntity();

    // Optional ID assignment (only for updates)
    if (domain.id) {
      entity.id = domain.id;
    }

    // Basic fields
    entity.full_name = domain.full_name;
    entity.phone = domain.phone;
    entity.email = domain.email;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;

    // Map related orders (optional — only use this if cascading orders is intended)
    // if (domain.orders?.length) {
    //   entity.orders = domain.orders.map(OrdersMapper.toPersistence);
    // }

    return entity;
  }
}

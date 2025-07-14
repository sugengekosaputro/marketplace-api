import { Whatsapp } from '../../../../domain/whatsapp';
import { WhatsappEntity } from '../entities/whatsapp.entity';

export class WhatsappMapper {
  static toDomain(raw: WhatsappEntity): Whatsapp {
    const domainEntity = new Whatsapp();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Whatsapp): WhatsappEntity {
    const persistenceEntity = new WhatsappEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}

import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Whatsapp } from '../../domain/whatsapp';

export abstract class WhatsappRepository {
  abstract create(
    data: Omit<Whatsapp, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Whatsapp>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Whatsapp[]>;

  abstract findById(id: Whatsapp['id']): Promise<NullableType<Whatsapp>>;

  abstract findByIds(ids: Whatsapp['id'][]): Promise<Whatsapp[]>;

  abstract update(
    id: Whatsapp['id'],
    payload: DeepPartial<Whatsapp>,
  ): Promise<Whatsapp | null>;

  abstract remove(id: Whatsapp['id']): Promise<void>;
}

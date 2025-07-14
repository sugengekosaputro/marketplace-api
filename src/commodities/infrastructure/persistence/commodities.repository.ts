import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Commodities } from '../../domain/commodities';

export abstract class CommoditiesRepository {
  abstract create(
    data: Omit<Commodities, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Commodities>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Commodities[]>;

  abstract findById(id: Commodities['id']): Promise<NullableType<Commodities>>;

  abstract findByIds(ids: Commodities['id'][]): Promise<Commodities[]>;

  abstract update(
    id: Commodities['id'],
    payload: DeepPartial<Commodities>,
  ): Promise<Commodities | null>;

  abstract remove(id: Commodities['id']): Promise<void>;
}

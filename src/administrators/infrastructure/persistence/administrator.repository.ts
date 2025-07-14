import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Administrator } from '../../domain/administrator';

export abstract class AdministratorRepository {
  abstract create(
    data: Omit<Administrator, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Administrator>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Administrator[]>;

  abstract findById(
    id: Administrator['id'],
  ): Promise<NullableType<Administrator>>;

  abstract findByIds(ids: Administrator['id'][]): Promise<Administrator[]>;

  abstract update(
    id: Administrator['id'],
    payload: DeepPartial<Administrator>,
  ): Promise<Administrator | null>;

  abstract remove(id: Administrator['id']): Promise<void>;
}

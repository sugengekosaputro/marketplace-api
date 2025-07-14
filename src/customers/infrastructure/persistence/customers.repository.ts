import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Customers } from '../../domain/customers';

export abstract class CustomersRepository {
  abstract create(
    data: Omit<Customers, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Customers>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Customers[]>;

  abstract findById(id: Customers['id']): Promise<NullableType<Customers>>;

  abstract findByIds(ids: Customers['id'][]): Promise<Customers[]>;

  abstract update(
    id: Customers['id'],
    payload: DeepPartial<Customers>,
  ): Promise<Customers | null>;

  abstract remove(id: Customers['id']): Promise<void>;
}

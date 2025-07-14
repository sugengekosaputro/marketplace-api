import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderHistories } from '../../domain/order-histories';

export abstract class OrderHistoriesRepository {
  abstract create(
    data: Omit<OrderHistories, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<OrderHistories>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderHistories[]>;

  abstract findById(
    id: OrderHistories['id'],
  ): Promise<NullableType<OrderHistories>>;

  abstract findByIds(ids: OrderHistories['id'][]): Promise<OrderHistories[]>;

  abstract update(
    id: OrderHistories['id'],
    payload: DeepPartial<OrderHistories>,
  ): Promise<OrderHistories | null>;

  abstract remove(id: OrderHistories['id']): Promise<void>;
}

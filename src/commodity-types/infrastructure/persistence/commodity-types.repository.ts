import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CommodityTypes } from '../../domain/commodity-types';

export abstract class CommodityTypesRepository {
  abstract create(
    data: Omit<CommodityTypes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<CommodityTypes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CommodityTypes[]>;

  abstract findById(
    id: CommodityTypes['id'],
  ): Promise<NullableType<CommodityTypes>>;

  abstract findByIds(ids: CommodityTypes['id'][]): Promise<CommodityTypes[]>;

  abstract update(
    id: CommodityTypes['id'],
    payload: DeepPartial<CommodityTypes>,
  ): Promise<CommodityTypes | null>;

  abstract remove(id: CommodityTypes['id']): Promise<void>;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CommodityTypesEntity } from '../entities/commodity-types.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CommodityTypes } from '../../../../domain/commodity-types';
import { CommodityTypesRepository } from '../../commodity-types.repository';
import { CommodityTypesMapper } from '../mappers/commodity-types.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CommodityTypesRelationalRepository
  implements CommodityTypesRepository
{
  constructor(
    @InjectRepository(CommodityTypesEntity)
    private readonly commodityTypesRepository: Repository<CommodityTypesEntity>,
  ) {}

  async create(data: CommodityTypes): Promise<CommodityTypes> {
    const persistenceModel = CommodityTypesMapper.toPersistence(data);
    const newEntity = await this.commodityTypesRepository.save(
      this.commodityTypesRepository.create(persistenceModel),
    );
    return CommodityTypesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CommodityTypes[]> {
    const entities = await this.commodityTypesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommodityTypesMapper.toDomain(entity));
  }

  async findById(
    id: CommodityTypes['id'],
  ): Promise<NullableType<CommodityTypes>> {
    const entity = await this.commodityTypesRepository.findOne({
      where: { id },
    });

    return entity ? CommodityTypesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: CommodityTypes['id'][]): Promise<CommodityTypes[]> {
    const entities = await this.commodityTypesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CommodityTypesMapper.toDomain(entity));
  }

  async update(
    id: CommodityTypes['id'],
    payload: Partial<CommodityTypes>,
  ): Promise<CommodityTypes> {
    const entity = await this.commodityTypesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.commodityTypesRepository.save(
      this.commodityTypesRepository.create(
        CommodityTypesMapper.toPersistence({
          ...CommodityTypesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CommodityTypesMapper.toDomain(updatedEntity);
  }

  async remove(id: CommodityTypes['id']): Promise<void> {
    await this.commodityTypesRepository.softDelete(id);
  }
}

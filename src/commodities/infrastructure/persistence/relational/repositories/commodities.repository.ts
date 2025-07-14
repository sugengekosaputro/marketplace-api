import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CommoditiesEntity } from '../entities/commodities.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Commodities } from '../../../../domain/commodities';
import { CommoditiesRepository } from '../../commodities.repository';
import { CommoditiesMapper } from '../mappers/commodities.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CommoditiesRelationalRepository implements CommoditiesRepository {
  constructor(
    @InjectRepository(CommoditiesEntity)
    private readonly commoditiesRepository: Repository<CommoditiesEntity>,
  ) {}

  async create(data: Commodities): Promise<Commodities> {
    const persistenceModel = CommoditiesMapper.toPersistence(data);
    console.log(persistenceModel);
    const newEntity = await this.commoditiesRepository.save(
      this.commoditiesRepository.create(persistenceModel),
    );
    return CommoditiesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Commodities[]> {
    const entities = await this.commoditiesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommoditiesMapper.toDomain(entity));
  }

  async findById(id: Commodities['id']): Promise<NullableType<Commodities>> {
    const entity = await this.commoditiesRepository.findOne({
      where: { id },
      relations: ['type'],
    });

    return entity ? CommoditiesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Commodities['id'][]): Promise<Commodities[]> {
    const entities = await this.commoditiesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CommoditiesMapper.toDomain(entity));
  }

  async update(
    id: Commodities['id'],
    payload: Partial<Commodities>,
  ): Promise<Commodities> {
    const entity = await this.commoditiesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.commoditiesRepository.save(
      this.commoditiesRepository.create(
        CommoditiesMapper.toPersistence({
          ...CommoditiesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CommoditiesMapper.toDomain(updatedEntity);
  }

  async remove(id: Commodities['id']): Promise<void> {
    await this.commoditiesRepository.softDelete(id);
  }
}

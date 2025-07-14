import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AdministratorEntity } from '../entities/administrator.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Administrator } from '../../../../domain/administrator';
import { AdministratorRepository } from '../../administrator.repository';
import { AdministratorMapper } from '../mappers/administrator.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AdministratorRelationalRepository
  implements AdministratorRepository
{
  constructor(
    @InjectRepository(AdministratorEntity)
    private readonly administratorRepository: Repository<AdministratorEntity>,
  ) {}

  async create(data: Administrator): Promise<Administrator> {
    const persistenceModel = AdministratorMapper.toPersistence(data);
    const newEntity = await this.administratorRepository.save(
      this.administratorRepository.create(persistenceModel),
    );
    return AdministratorMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Administrator[]> {
    const entities = await this.administratorRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AdministratorMapper.toDomain(entity));
  }

  async findById(
    id: Administrator['id'],
  ): Promise<NullableType<Administrator>> {
    const entity = await this.administratorRepository.findOne({
      where: { id },
    });

    return entity ? AdministratorMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Administrator['id'][]): Promise<Administrator[]> {
    const entities = await this.administratorRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AdministratorMapper.toDomain(entity));
  }

  async update(
    id: Administrator['id'],
    payload: Partial<Administrator>,
  ): Promise<Administrator> {
    const entity = await this.administratorRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.administratorRepository.save(
      this.administratorRepository.create(
        AdministratorMapper.toPersistence({
          ...AdministratorMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AdministratorMapper.toDomain(updatedEntity);
  }

  async remove(id: Administrator['id']): Promise<void> {
    await this.administratorRepository.delete(id);
  }
}

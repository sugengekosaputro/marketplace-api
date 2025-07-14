import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WhatsappEntity } from '../entities/whatsapp.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Whatsapp } from '../../../../domain/whatsapp';
import { WhatsappRepository } from '../../whatsapp.repository';
import { WhatsappMapper } from '../mappers/whatsapp.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class WhatsappRelationalRepository implements WhatsappRepository {
  constructor(
    @InjectRepository(WhatsappEntity)
    private readonly whatsappRepository: Repository<WhatsappEntity>,
  ) {}

  async create(data: Whatsapp): Promise<Whatsapp> {
    const persistenceModel = WhatsappMapper.toPersistence(data);
    const newEntity = await this.whatsappRepository.save(
      this.whatsappRepository.create(persistenceModel),
    );
    return WhatsappMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Whatsapp[]> {
    const entities = await this.whatsappRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => WhatsappMapper.toDomain(entity));
  }

  async findById(id: Whatsapp['id']): Promise<NullableType<Whatsapp>> {
    const entity = await this.whatsappRepository.findOne({
      where: { id },
    });

    return entity ? WhatsappMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Whatsapp['id'][]): Promise<Whatsapp[]> {
    const entities = await this.whatsappRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => WhatsappMapper.toDomain(entity));
  }

  async update(
    id: Whatsapp['id'],
    payload: Partial<Whatsapp>,
  ): Promise<Whatsapp> {
    const entity = await this.whatsappRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.whatsappRepository.save(
      this.whatsappRepository.create(
        WhatsappMapper.toPersistence({
          ...WhatsappMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WhatsappMapper.toDomain(updatedEntity);
  }

  async remove(id: Whatsapp['id']): Promise<void> {
    await this.whatsappRepository.delete(id);
  }
}

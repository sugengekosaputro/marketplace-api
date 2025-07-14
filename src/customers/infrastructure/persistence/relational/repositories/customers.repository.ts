import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CustomersEntity } from '../entities/customers.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Customers } from '../../../../domain/customers';
import { CustomersRepository } from '../../customers.repository';
import { CustomersMapper } from '../mappers/customers.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CustomersRelationalRepository implements CustomersRepository {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customersRepository: Repository<CustomersEntity>,
  ) {}

  async create(data: Customers): Promise<Customers> {
    const persistenceModel = CustomersMapper.toPersistence(data);
    const newEntity = await this.customersRepository.save(
      this.customersRepository.create(persistenceModel),
    );
    return CustomersMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Customers[]> {
    const entities = await this.customersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CustomersMapper.toDomain(entity));
  }

  async findById(id: Customers['id']): Promise<NullableType<Customers>> {
    const entity = await this.customersRepository.findOne({
      where: { id },
    });

    return entity ? CustomersMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Customers['id'][]): Promise<Customers[]> {
    const entities = await this.customersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CustomersMapper.toDomain(entity));
  }

  async update(
    id: Customers['id'],
    payload: Partial<Customers>,
  ): Promise<Customers> {
    const entity = await this.customersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.customersRepository.save(
      this.customersRepository.create(
        CustomersMapper.toPersistence({
          ...CustomersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CustomersMapper.toDomain(updatedEntity);
  }

  async remove(id: Customers['id']): Promise<void> {
    await this.customersRepository.delete(id);
  }

  async findByEmail(
    email: Customers['email'],
  ): Promise<NullableType<Customers>> {
    if (!email) return null;

    const entity = await this.customersRepository.findOne({
      where: { email },
    });

    return entity ? CustomersMapper.toDomain(entity) : null;
  }
}

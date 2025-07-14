import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderHistoriesEntity } from '../entities/order-histories.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrderHistories } from '../../../../domain/order-histories';
import { OrderHistoriesRepository } from '../../order-histories.repository';
import { OrderHistoriesMapper } from '../mappers/order-histories.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderHistoriesRelationalRepository
  implements OrderHistoriesRepository
{
  constructor(
    @InjectRepository(OrderHistoriesEntity)
    private readonly orderHistoriesRepository: Repository<OrderHistoriesEntity>,
  ) {}

  async create(data: OrderHistories): Promise<OrderHistories> {
    const persistenceModel = OrderHistoriesMapper.toPersistence(data);
    const newEntity = await this.orderHistoriesRepository.save(
      this.orderHistoriesRepository.create(persistenceModel),
    );
    return OrderHistoriesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderHistories[]> {
    const entities = await this.orderHistoriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrderHistoriesMapper.toDomain(entity));
  }

  async findById(
    id: OrderHistories['id'],
  ): Promise<NullableType<OrderHistories>> {
    const entity = await this.orderHistoriesRepository.findOne({
      where: { id },
    });

    return entity ? OrderHistoriesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderHistories['id'][]): Promise<OrderHistories[]> {
    const entities = await this.orderHistoriesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderHistoriesMapper.toDomain(entity));
  }

  async update(
    id: OrderHistories['id'],
    payload: Partial<OrderHistories>,
  ): Promise<OrderHistories> {
    const entity = await this.orderHistoriesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderHistoriesRepository.save(
      this.orderHistoriesRepository.create(
        OrderHistoriesMapper.toPersistence({
          ...OrderHistoriesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderHistoriesMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderHistories['id']): Promise<void> {
    await this.orderHistoriesRepository.delete(id);
  }
}

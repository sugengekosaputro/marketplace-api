import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrderHistoriesDto } from './dto/create-order-histories.dto';
import { UpdateOrderHistoriesDto } from './dto/update-order-histories.dto';
import { OrderHistoriesRepository } from './infrastructure/persistence/order-histories.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderHistories } from './domain/order-histories';

@Injectable()
export class OrderHistoriesService {
  constructor(
    // Dependencies here
    private readonly orderHistoriesRepository: OrderHistoriesRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOrderHistoriesDto: CreateOrderHistoriesDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.orderHistoriesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderHistoriesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderHistories['id']) {
    return this.orderHistoriesRepository.findById(id);
  }

  findByIds(ids: OrderHistories['id'][]) {
    return this.orderHistoriesRepository.findByIds(ids);
  }

  async update(
    id: OrderHistories['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOrderHistoriesDto: UpdateOrderHistoriesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orderHistoriesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: OrderHistories['id']) {
    return this.orderHistoriesRepository.remove(id);
  }
}

import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { OrdersRepository } from './infrastructure/persistence/orders.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Orders } from './domain/orders';

@Injectable()
export class OrdersService {
  constructor(
    // Dependencies here
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOrdersDto: CreateOrdersDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.ordersRepository.create({});
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.ordersRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Orders['id']) {
    return this.ordersRepository.findById(id);
  }

  findByIds(ids: Orders['id'][]) {
    return this.ordersRepository.findByIds(ids);
  }

  async update(
    id: Orders['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOrdersDto: UpdateOrdersDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Orders['id']) {
    return this.ordersRepository.remove(id);
  }
}

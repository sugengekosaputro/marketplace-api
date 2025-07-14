import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { OrdersRepository } from './infrastructure/persistence/orders.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Orders } from './domain/orders';
import { CustomersService } from 'src/customers/customers.service';
import { CommoditiesService } from 'src/commodities/commodities.service';
import { OrderStatus } from './infrastructure/persistence/relational/entities/orders.entity';
import { DeepPartial } from 'typeorm';
import { OrderHistoriesService } from 'src/order-histories/order-histories.service';
import { Customers } from 'src/customers/domain/customers';
import { OrderHistoriesRepository } from 'src/order-histories/infrastructure/persistence/order-histories.repository';
import { OrderHistoryStatus } from '../order-histories/infrastructure/persistence/relational/entities/order-histories.entity';

@Injectable()
export class OrdersService {
  constructor(
    // Dependencies here
    private readonly ordersRepository: OrdersRepository,
    private readonly customersService: CustomersService,
    private readonly commoditiesService: CommoditiesService,
    private readonly orderHistoriesService: OrderHistoriesService,
    private readonly orderHistoriesRepository: OrderHistoriesRepository,
  ) {}

  async create(createOrdersDto: CreateOrdersDto): Promise<Orders> {
    // Validate input
    if (
      !createOrdersDto.customerEmail?.trim() ||
      !createOrdersDto.customerPhone?.trim()
    ) {
      throw new BadRequestException('Email and phone are required');
    }

    // let commodities: Commodities | null = null;
    let customer: Customers | null = await this.customersService.findByEmail(
      createOrdersDto.customerEmail.trim(),
    );

    if (!customer) {
      customer = await this.customersService.create({
        full_name: createOrdersDto.customerName?.trim() || 'Unnamed',
        phone: createOrdersDto.customerPhone.trim(),
        email: createOrdersDto.customerEmail.trim(),
      });
    }

    // Assume commodityId is required, validate and fetch
    if (!createOrdersDto.commodityId) {
      throw new BadRequestException('Commodity is required');
    }

    const commodities = await this.commoditiesService.findById(
      createOrdersDto.commodityId,
    );

    if (!commodities) {
      throw new NotFoundException('Commodity not found');
    }

    const order = await this.ordersRepository.create({
      total: createOrdersDto.total,
      unit: createOrdersDto.unit,
      status: OrderStatus.PENDING_VERIFICATION,
      customer,
      commodities, // ✅ now properly assigned
      history: [],
    });

    await this.orderHistoriesRepository.create({
      order: order,
      status: OrderHistoryStatus.PENDING_VERIFICATION,
      notes: 'Order created',
    });

    return order;
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

    updateOrdersDto: UpdateOrdersDto,
  ) {
    const payload: DeepPartial<Orders> = {};

    if (updateOrdersDto.total !== undefined) {
      payload.total = updateOrdersDto.total;
    }

    if (updateOrdersDto.unit !== undefined) {
      payload.unit = updateOrdersDto.unit;
    }

    if (updateOrdersDto.commodityId !== undefined) {
      const commodity = await this.commoditiesService.findById(
        updateOrdersDto.commodityId,
      );
      if (!commodity) {
        throw new NotFoundException('Commodity not found');
      }
      payload.commodities = commodity;
    }

    return this.ordersRepository.update(id, payload);
  }

  remove(id: Orders['id']) {
    return this.ordersRepository.remove(id);
  }
}

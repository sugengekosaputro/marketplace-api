import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCustomersDto } from './dto/create-customers.dto';
import { UpdateCustomersDto } from './dto/update-customers.dto';
import { CustomersRepository } from './infrastructure/persistence/customers.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Customers } from './domain/customers';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class CustomersService {
  constructor(
    // Dependencies here
    private readonly customersRepository: CustomersRepository,
  ) {}

  async create(createCustomersDto: CreateCustomersDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.customersRepository.create({
      full_name: createCustomersDto.full_name,
      phone: createCustomersDto.phone,
      email: createCustomersDto.email,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.customersRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Customers['id']) {
    return this.customersRepository.findById(id);
  }

  findByIds(ids: Customers['id'][]) {
    return this.customersRepository.findByIds(ids);
  }

  async update(
    id: Customers['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCustomersDto: UpdateCustomersDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.customersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Customers['id']) {
    return this.customersRepository.remove(id);
  }

  findByEmail(email: Customers['email']): Promise<NullableType<Customers>> {
    return this.customersRepository.findByEmail(email);
  }
}

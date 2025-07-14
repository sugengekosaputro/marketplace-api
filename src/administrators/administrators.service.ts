import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorRepository } from './infrastructure/persistence/administrator.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Administrator } from './domain/administrator';
import { AdministratorRole } from './infrastructure/persistence/relational/entities/administrator.entity';

@Injectable()
export class AdministratorsService {
  constructor(
    // Dependencies here
    private readonly administratorRepository: AdministratorRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createAdministratorDto: CreateAdministratorDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.administratorRepository.create({
      full_name: '',
      email: '',
      role: AdministratorRole.SUPERADMIN,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.administratorRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Administrator['id']) {
    return this.administratorRepository.findById(id);
  }

  findByIds(ids: Administrator['id'][]) {
    return this.administratorRepository.findByIds(ids);
  }

  async update(
    id: Administrator['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAdministratorDto: UpdateAdministratorDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.administratorRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Administrator['id']) {
    return this.administratorRepository.remove(id);
  }
}

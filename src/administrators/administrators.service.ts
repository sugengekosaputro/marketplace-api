import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorRepository } from './infrastructure/persistence/administrator.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Administrator } from './domain/administrator';

@Injectable()
export class AdministratorsService {
  constructor(
    // Dependencies here
    private readonly administratorRepository: AdministratorRepository,
  ) {}

  async create(createAdministratorDto: CreateAdministratorDto) {
    return this.administratorRepository.create({
      full_name: createAdministratorDto.full_name,
      email: createAdministratorDto.email,
      password_hash: createAdministratorDto.password,
      role: createAdministratorDto.role,
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

    updateAdministratorDto: UpdateAdministratorDto,
  ) {
    return this.administratorRepository.update(id, {
      full_name: updateAdministratorDto.full_name,
      email: updateAdministratorDto.email,
      password_hash: updateAdministratorDto.password,
      role: updateAdministratorDto.role,
    });
  }

  remove(id: Administrator['id']) {
    return this.administratorRepository.remove(id);
  }
}

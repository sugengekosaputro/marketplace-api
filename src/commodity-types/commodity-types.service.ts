import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCommodityTypesDto } from './dto/create-commodity-types.dto';
import { UpdateCommodityTypesDto } from './dto/update-commodity-types.dto';
import { CommodityTypesRepository } from './infrastructure/persistence/commodity-types.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CommodityTypes } from './domain/commodity-types';

@Injectable()
export class CommodityTypesService {
  constructor(
    // Dependencies here
    private readonly commodityTypesRepository: CommodityTypesRepository,
  ) {}

  async create(createCommodityTypesDto: CreateCommodityTypesDto) {
    return this.commodityTypesRepository.create({
      name: createCommodityTypesDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.commodityTypesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: CommodityTypes['id']) {
    return this.commodityTypesRepository.findById(id);
  }

  findByIds(ids: CommodityTypes['id'][]) {
    return this.commodityTypesRepository.findByIds(ids);
  }

  async update(
    id: CommodityTypes['id'],
    updateCommodityTypesDto: UpdateCommodityTypesDto,
  ) {
    return this.commodityTypesRepository.update(id, {
      name: updateCommodityTypesDto.name,
    });
  }

  remove(id: CommodityTypes['id']) {
    return this.commodityTypesRepository.remove(id);
  }
}

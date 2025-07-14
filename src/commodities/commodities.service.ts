import { Injectable } from '@nestjs/common';
import { CreateCommoditiesDto } from './dto/create-commodities.dto';
import { UpdateCommoditiesDto } from './dto/update-commodities.dto';
import { CommoditiesRepository } from './infrastructure/persistence/commodities.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Commodities } from './domain/commodities';
import { CommodityTypesService } from '../commodity-types/commodity-types.service';
import { CommodityTypes } from '../commodity-types/domain/commodity-types';

@Injectable()
export class CommoditiesService {
  constructor(
    // Dependencies here
    private readonly commoditiesRepository: CommoditiesRepository,
    private readonly commodityTypesService: CommodityTypesService,
  ) {}

  async create(createCommoditiesDto: CreateCommoditiesDto) {
    let type: CommodityTypes | null = null;
    if (createCommoditiesDto.typeId) {
      type = await this.commodityTypesService.findById(
        createCommoditiesDto.typeId,
      );
    }

    return this.commoditiesRepository.create({
      name: createCommoditiesDto.name,
      type: type,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.commoditiesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Commodities['id']) {
    return this.commoditiesRepository.findById(id);
  }

  findByIds(ids: Commodities['id'][]) {
    return this.commoditiesRepository.findByIds(ids);
  }

  async update(
    id: Commodities['id'],
    updateCommoditiesDto: UpdateCommoditiesDto,
  ) {
    let type: CommodityTypes | null = null;
    if (updateCommoditiesDto.typeId) {
      type = await this.commodityTypesService.findById(
        updateCommoditiesDto.typeId,
      );
    }
    return this.commoditiesRepository.update(id, {
      name: updateCommoditiesDto.name,
      type: type,
    });
  }

  remove(id: Commodities['id']) {
    return this.commoditiesRepository.remove(id);
  }
}

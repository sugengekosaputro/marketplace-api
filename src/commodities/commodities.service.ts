import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCommoditiesDto } from './dto/create-commodities.dto';
import { UpdateCommoditiesDto } from './dto/update-commodities.dto';
import { CommoditiesRepository } from './infrastructure/persistence/commodities.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Commodities } from './domain/commodities';

@Injectable()
export class CommoditiesService {
  constructor(
    // Dependencies here
    private readonly commoditiesRepository: CommoditiesRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCommoditiesDto: CreateCommoditiesDto,
  ) {
    // Do not remove comment below.
    // <creating-property />
    // let type: CommodityTypes | undefined = undefined;
    return this.commoditiesRepository.create({
      name: '',
      type: 'type',
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCommoditiesDto: UpdateCommoditiesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.commoditiesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Commodities['id']) {
    return this.commoditiesRepository.remove(id);
  }
}

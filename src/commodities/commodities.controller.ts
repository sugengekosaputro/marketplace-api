import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommoditiesService } from './commodities.service';
import { CreateCommoditiesDto } from './dto/create-commodities.dto';
import { UpdateCommoditiesDto } from './dto/update-commodities.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Commodities } from './domain/commodities';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCommoditiesDto } from './dto/find-all-commodities.dto';

@ApiTags('Commodities')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'commodities',
  version: '1',
})
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Commodities,
  })
  create(@Body() createCommoditiesDto: CreateCommoditiesDto) {
    return this.commoditiesService.create(createCommoditiesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Commodities),
  })
  async findAll(
    @Query() query: FindAllCommoditiesDto,
  ): Promise<InfinityPaginationResponseDto<Commodities>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.commoditiesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Commodities,
  })
  findById(@Param('id') id: string) {
    return this.commoditiesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Commodities,
  })
  update(
    @Param('id') id: string,
    @Body() updateCommoditiesDto: UpdateCommoditiesDto,
  ) {
    return this.commoditiesService.update(id, updateCommoditiesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.commoditiesService.remove(id);
  }
}

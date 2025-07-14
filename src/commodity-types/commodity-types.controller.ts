import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommodityTypesService } from './commodity-types.service';
import { CreateCommodityTypesDto } from './dto/create-commodity-types.dto';
import { UpdateCommodityTypesDto } from './dto/update-commodity-types.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CommodityTypes } from './domain/commodity-types';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCommodityTypesDto } from './dto/find-all-commodity-types.dto';

@ApiTags('Commoditytypes')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'commodity-types',
  version: '1',
})
export class CommodityTypesController {
  constructor(private readonly commodityTypesService: CommodityTypesService) {}

  @Post()
  @ApiCreatedResponse({
    type: CommodityTypes,
  })
  create(@Body() createCommodityTypesDto: CreateCommodityTypesDto) {
    return this.commodityTypesService.create(createCommodityTypesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CommodityTypes),
  })
  async findAll(
    @Query() query: FindAllCommodityTypesDto,
  ): Promise<InfinityPaginationResponseDto<CommodityTypes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.commodityTypesService.findAllWithPagination({
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
    type: CommodityTypes,
  })
  findById(@Param('id') id: string) {
    return this.commodityTypesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: CommodityTypes,
  })
  update(
    @Param('id') id: string,
    @Body() updateCommodityTypesDto: UpdateCommodityTypesDto,
  ) {
    return this.commodityTypesService.update(id, updateCommodityTypesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.commodityTypesService.remove(id);
  }
}

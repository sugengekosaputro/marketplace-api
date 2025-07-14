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
import { OrderHistoriesService } from './order-histories.service';
import { CreateOrderHistoriesDto } from './dto/create-order-histories.dto';
import { UpdateOrderHistoriesDto } from './dto/update-order-histories.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderHistories } from './domain/order-histories';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderHistoriesDto } from './dto/find-all-order-histories.dto';

@ApiTags('Orderhistories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-histories',
  version: '1',
})
export class OrderHistoriesController {
  constructor(private readonly orderHistoriesService: OrderHistoriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderHistories,
  })
  create(@Body() createOrderHistoriesDto: CreateOrderHistoriesDto) {
    return this.orderHistoriesService.create(createOrderHistoriesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderHistories),
  })
  async findAll(
    @Query() query: FindAllOrderHistoriesDto,
  ): Promise<InfinityPaginationResponseDto<OrderHistories>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderHistoriesService.findAllWithPagination({
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
    type: OrderHistories,
  })
  findById(@Param('id') id: string) {
    return this.orderHistoriesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderHistories,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderHistoriesDto: UpdateOrderHistoriesDto,
  ) {
    return this.orderHistoriesService.update(id, updateOrderHistoriesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orderHistoriesService.remove(id);
  }
}

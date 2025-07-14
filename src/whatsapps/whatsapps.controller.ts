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
import { WhatsappsService } from './whatsapps.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Whatsapp } from './domain/whatsapp';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllWhatsappsDto } from './dto/find-all-whatsapps.dto';

@ApiTags('Whatsapps')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'whatsapps',
  version: '1',
})
export class WhatsappsController {
  constructor(private readonly whatsappsService: WhatsappsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Whatsapp,
  })
  create(@Body() createWhatsappDto: CreateWhatsappDto) {
    return this.whatsappsService.create(createWhatsappDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Whatsapp),
  })
  async findAll(
    @Query() query: FindAllWhatsappsDto,
  ): Promise<InfinityPaginationResponseDto<Whatsapp>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.whatsappsService.findAllWithPagination({
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
    type: Whatsapp,
  })
  findById(@Param('id') id: string) {
    return this.whatsappsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Whatsapp,
  })
  update(
    @Param('id') id: string,
    @Body() updateWhatsappDto: UpdateWhatsappDto,
  ) {
    return this.whatsappsService.update(id, updateWhatsappDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.whatsappsService.remove(id);
  }
}

// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderHistoriesDto } from './create-order-histories.dto';

export class UpdateOrderHistoriesDto extends PartialType(
  CreateOrderHistoriesDto,
) {}

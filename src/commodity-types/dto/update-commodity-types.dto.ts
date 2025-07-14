// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCommodityTypesDto } from './create-commodity-types.dto';

export class UpdateCommodityTypesDto extends PartialType(
  CreateCommodityTypesDto,
) {}

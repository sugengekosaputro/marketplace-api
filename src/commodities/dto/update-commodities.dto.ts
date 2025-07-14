// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCommoditiesDto } from './create-commodities.dto';

export class UpdateCommoditiesDto extends PartialType(CreateCommoditiesDto) {}

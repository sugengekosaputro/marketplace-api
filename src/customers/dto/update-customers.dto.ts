// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCustomersDto } from './create-customers.dto';

export class UpdateCustomersDto extends PartialType(CreateCustomersDto) {}

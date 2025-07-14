// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateWhatsappDto } from './create-whatsapp.dto';

export class UpdateWhatsappDto extends PartialType(CreateWhatsappDto) {}

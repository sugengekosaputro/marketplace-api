import { Module } from '@nestjs/common';
import { WhatsappRepository } from '../whatsapp.repository';
import { WhatsappRelationalRepository } from './repositories/whatsapp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsappEntity } from './entities/whatsapp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsappEntity])],
  providers: [
    {
      provide: WhatsappRepository,
      useClass: WhatsappRelationalRepository,
    },
  ],
  exports: [WhatsappRepository],
})
export class RelationalWhatsappPersistenceModule {}

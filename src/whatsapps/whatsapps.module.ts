import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { WhatsappsService } from './whatsapps.service';
import { WhatsappsController } from './whatsapps.controller';
import { RelationalWhatsappPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // do not remove this comment
    RelationalWhatsappPersistenceModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [WhatsappsController],
  providers: [WhatsappsService],
  exports: [WhatsappsService, RelationalWhatsappPersistenceModule],
})
export class WhatsappsModule {}

import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { RelationalAdministratorPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalAdministratorPersistenceModule,
  ],
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
  exports: [AdministratorsService, RelationalAdministratorPersistenceModule],
})
export class AdministratorsModule {}

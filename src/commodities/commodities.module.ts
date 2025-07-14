import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CommoditiesService } from './commodities.service';
import { CommoditiesController } from './commodities.controller';
import { RelationalCommoditiesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalCommoditiesPersistenceModule,
  ],
  controllers: [CommoditiesController],
  providers: [CommoditiesService],
  exports: [CommoditiesService, RelationalCommoditiesPersistenceModule],
})
export class CommoditiesModule {}

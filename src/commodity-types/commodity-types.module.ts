import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CommodityTypesService } from './commodity-types.service';
import { CommodityTypesController } from './commodity-types.controller';
import { RelationalCommodityTypesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalCommodityTypesPersistenceModule,
  ],
  controllers: [CommodityTypesController],
  providers: [CommodityTypesService],
  exports: [CommodityTypesService, RelationalCommodityTypesPersistenceModule],
})
export class CommodityTypesModule {}

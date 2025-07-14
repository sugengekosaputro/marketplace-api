import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderHistoriesService } from './order-histories.service';
import { OrderHistoriesController } from './order-histories.controller';
import { RelationalOrderHistoriesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalOrderHistoriesPersistenceModule,
  ],
  controllers: [OrderHistoriesController],
  providers: [OrderHistoriesService],
  exports: [OrderHistoriesService, RelationalOrderHistoriesPersistenceModule],
})
export class OrderHistoriesModule {}

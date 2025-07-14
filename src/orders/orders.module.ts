import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RelationalOrdersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CustomersModule } from '../customers/customers.module';
import { CommoditiesModule } from 'src/commodities/commodities.module';
import { OrderHistoriesModule } from 'src/order-histories/order-histories.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalOrdersPersistenceModule,
    CustomersModule,
    CommoditiesModule,
    OrderHistoriesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrdersPersistenceModule],
})
export class OrdersModule {}

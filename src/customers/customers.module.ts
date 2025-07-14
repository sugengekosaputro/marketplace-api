import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { RelationalCustomersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalCustomersPersistenceModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, RelationalCustomersPersistenceModule],
})
export class CustomersModule {}

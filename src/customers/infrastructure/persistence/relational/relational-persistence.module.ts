import { Module } from '@nestjs/common';
import { CustomersRepository } from '../customers.repository';
import { CustomersRelationalRepository } from './repositories/customers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  providers: [
    {
      provide: CustomersRepository,
      useClass: CustomersRelationalRepository,
    },
  ],
  exports: [CustomersRepository],
})
export class RelationalCustomersPersistenceModule {}

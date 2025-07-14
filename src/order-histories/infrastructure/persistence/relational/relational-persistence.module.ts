import { Module } from '@nestjs/common';
import { OrderHistoriesRepository } from '../order-histories.repository';
import { OrderHistoriesRelationalRepository } from './repositories/order-histories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoriesEntity } from './entities/order-histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistoriesEntity])],
  providers: [
    {
      provide: OrderHistoriesRepository,
      useClass: OrderHistoriesRelationalRepository,
    },
  ],
  exports: [OrderHistoriesRepository],
})
export class RelationalOrderHistoriesPersistenceModule {}

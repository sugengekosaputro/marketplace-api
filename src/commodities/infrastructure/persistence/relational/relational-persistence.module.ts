import { Module } from '@nestjs/common';
import { CommoditiesRepository } from '../commodities.repository';
import { CommoditiesRelationalRepository } from './repositories/commodities.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommoditiesEntity } from './entities/commodities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommoditiesEntity])],
  providers: [
    {
      provide: CommoditiesRepository,
      useClass: CommoditiesRelationalRepository,
    },
  ],
  exports: [CommoditiesRepository],
})
export class RelationalCommoditiesPersistenceModule {}

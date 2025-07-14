import { Module } from '@nestjs/common';
import { CommodityTypesRepository } from '../commodity-types.repository';
import { CommodityTypesRelationalRepository } from './repositories/commodity-types.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityTypesEntity } from './entities/commodity-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommodityTypesEntity])],
  providers: [
    {
      provide: CommodityTypesRepository,
      useClass: CommodityTypesRelationalRepository,
    },
  ],
  exports: [CommodityTypesRepository],
})
export class RelationalCommodityTypesPersistenceModule {}

import { Module } from '@nestjs/common';
import { AdministratorRepository } from '../administrator.repository';
import { AdministratorRelationalRepository } from './repositories/administrator.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity])],
  providers: [
    {
      provide: AdministratorRepository,
      useClass: AdministratorRelationalRepository,
    },
  ],
  exports: [AdministratorRepository],
})
export class RelationalAdministratorPersistenceModule {}

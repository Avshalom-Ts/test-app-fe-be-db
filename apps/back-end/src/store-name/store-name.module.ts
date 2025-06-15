import { Module } from '@nestjs/common';
import { StoreNameService } from './store-name.service';
import { StoreNameController } from './store-name.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreName } from './entities/store-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreName])],
  controllers: [StoreNameController],
  providers: [StoreNameService],
})
export class StoreNameModule { }

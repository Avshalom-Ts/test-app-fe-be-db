import { HttpException, Injectable } from '@nestjs/common';
import { CreateStoreNameDto } from './dto/create-store-name.dto';
import { UpdateStoreNameDto } from './dto/update-store-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreName } from './entities/store-name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreNameService {

  constructor(
    @InjectRepository(StoreName) private readonly storeNameRerpository: Repository<StoreName>) { }

  create(createStoreNameDto: CreateStoreNameDto) {
    try {
      const storeName = this.storeNameRerpository.create(createStoreNameDto);
      return this.storeNameRerpository.save(storeName);
    } catch (error) {
      throw new HttpException('Error creating store name', 500);
    }
  }

  findAll() {
    try {
      return this.storeNameRerpository.find();
    } catch (error) {
      throw new HttpException('Error fetching store names', 500);
    }
  }

  findOne(id: string) {
    try {
      const storeName = this.storeNameRerpository.findOneBy({ id });
      if (!storeName) {
        throw new HttpException('Store name not found', 404);
      }
      return storeName;
    } catch (error) {
      throw new HttpException('Error fetching store name', 500);
    }
  }

  async update(id: string, updateStoreNameDto: UpdateStoreNameDto) {
    try {
      const storeName = await this.storeNameRerpository.preload({
        id: id,
        ...updateStoreNameDto,
      });
      if (!storeName) {
        throw new HttpException('Store name not found', 404);
      }
      return this.storeNameRerpository.save(storeName);
    } catch (error) {
      throw new HttpException('Error updating store name', 500);
    }
  }

  async remove(id: string) {
    try {
      const storeName = await this.storeNameRerpository.findOneBy({ id });
      if (!storeName) {
        throw new HttpException('Store name not found', 404);
      }
      return this.storeNameRerpository.remove(storeName);
    } catch (error) {
      throw new HttpException('Error removing store name', 500);
    }
  }
}

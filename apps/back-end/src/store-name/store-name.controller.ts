import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreNameService } from './store-name.service';
import { CreateStoreNameDto } from './dto/create-store-name.dto';
import { UpdateStoreNameDto } from './dto/update-store-name.dto';

@Controller('store-name')
export class StoreNameController {
  constructor(private readonly storeNameService: StoreNameService) { }

  @Post()
  create(@Body() createStoreNameDto: CreateStoreNameDto) {
    return this.storeNameService.create(createStoreNameDto);
  }

  @Get()
  findAll() {
    return this.storeNameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeNameService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreNameDto: UpdateStoreNameDto
  ) {
    return this.storeNameService.update(id, updateStoreNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeNameService.remove(id);
  }
}

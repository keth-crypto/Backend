
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { BrandsService } from './brands.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.brandsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.brandsService.findById(+id);
  }

  @Post()
  async create(@Body() body: { brand_name: string }) {
    return this.brandsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.brandsService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.brandsService.delete(+id);
  }
}

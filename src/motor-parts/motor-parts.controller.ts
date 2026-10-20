
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

import { MotorPartsService } from './motor-parts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('motor-parts')
export class MotorPartsController {
  constructor(
    private motorPartsService: MotorPartsService,
  ) {}

  // Get all motor parts
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.motorPartsService.getAll();
  }

  // Get single motor part by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.motorPartsService.findById(+id);
  }

  // Create motor part
  @Post()
  async create(
    @Body()
    body: {
      motorPart: string;
      price: number;
      brand_id: number;
      supplier_id: number;
    },
  ) {
    return this.motorPartsService.create(body);
  }

  // Update motor part
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.motorPartsService.update(+id, body);
  }

  // Delete motor part
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.motorPartsService.delete(+id);
  }
}

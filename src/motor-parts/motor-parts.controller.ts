import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,
} from '@nestjs/common';
import { MotorPartsService } from './motor-parts.service';
import { MotorPartDto } from './motor-part.dto';

// HYPHEN ang route: /motor-parts
// Kung may auth guard ka, idagdag ang @UseGuards(...) dito.
@Controller('motor-parts')
export class MotorPartsController {
  constructor(private readonly service: MotorPartsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: MotorPartDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: MotorPartDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
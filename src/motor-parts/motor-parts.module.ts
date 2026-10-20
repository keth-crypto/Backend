import { Module } from '@nestjs/common';
import { MotorPartsController } from './motor-parts.controller';
import { MotorPartsService } from './motor-parts.service';

@Module({
  controllers: [MotorPartsController],
  providers: [MotorPartsService],
  exports: [MotorPartsService],
})
export class MotorPartsModule {}
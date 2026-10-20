
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MotorPartsModule } from './motor-parts/motor-parts.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    BrandsModule,
    SuppliersModule,
    MotorPartsModule,
  ],
})
export class AppModule {}

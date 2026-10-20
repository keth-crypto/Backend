
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BrandsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // Get all brands
  async getAll() {
    return this.databaseService.query(
      'SELECT * FROM brands',
    );
  }

  // Get brand by ID
  async findById(id: number) {
    const rows: any = await this.databaseService.query(
      'SELECT * FROM brands WHERE brand_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Brand not found');
    }

    return rows[0];
  }

  // Create a new brand
  async create(body: { brand_name: string }) {
    const result: any = await this.databaseService.query(
      'INSERT INTO brands (brand_name) VALUES (?)',
      [body.brand_name],
    );

    return {
      message: 'Brand created successfully',
      brand_id: result.insertId,
    };
  }

  // Update brand
  async update(
    id: number,
    body: { brand_name: string },
  ) {
    await this.findById(id);

    await this.databaseService.query(
      'UPDATE brands SET brand_name = ? WHERE brand_id = ?',
      [body.brand_name, id],
    );

    return {
      message: 'Brand updated successfully',
    };
  }

  // Delete brand
  async delete(id: number) {
    await this.findById(id);

    await this.databaseService.query(
      'DELETE FROM brands WHERE brand_id = ?',
      [id],
    );

    return {
      message: 'Brand deleted successfully',
    };
  }
}

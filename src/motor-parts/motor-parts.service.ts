
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class MotorPartsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // Get all motor parts with brand and supplier
  async getAll() {
    return this.databaseService.query(`
      SELECT
        mp.part_id,
        mp.motorPart,
        mp.price,
        b.brand_name,
        s.supplier_name
      FROM motor_parts mp
      INNER JOIN brands b
        ON mp.brand_id = b.brand_id
      INNER JOIN suppliers s
        ON mp.supplier_id = s.supplier_id
    `);
  }

  // Get one motor part by ID
  async findById(id: number) {
    const rows: any = await this.databaseService.query(
      'SELECT * FROM motor_parts WHERE part_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Motor part not found');
    }

    return rows[0];
  }

  // Create a motor part
  async create(body: {
    motorPart: string;
    price: number;
    brand_id: number;
    supplier_id: number;
  }) {
    const result: any = await this.databaseService.query(
      `INSERT INTO motor_parts
        (motorPart, price, brand_id, supplier_id)
       VALUES (?, ?, ?, ?)`,
      [
        body.motorPart,
        body.price,
        body.brand_id,
        body.supplier_id,
      ],
    );

    return {
      message: 'Motor part created successfully',
      part_id: result.insertId,
    };
  }

  // Update a motor part
  async update(
    id: number,
    body: {
      motorPart: string;
      price: number;
      brand_id: number;
      supplier_id: number;
    },
  ) {
    await this.findById(id);

    await this.databaseService.query(
      `UPDATE motor_parts
       SET motorPart = ?,
           price = ?,
           brand_id = ?,
           supplier_id = ?
       WHERE part_id = ?`,
      [
        body.motorPart,
        body.price,
        body.brand_id,
        body.supplier_id,
        id,
      ],
    );

    return {
      message: 'Motor part updated successfully',
    };
  }

  // Delete a motor part
  async delete(id: number) {
    await this.findById(id);

    await this.databaseService.query(
      'DELETE FROM motor_parts WHERE part_id = ?',
      [id],
    );

    return {
      message: 'Motor part deleted successfully',
    };
  }
}

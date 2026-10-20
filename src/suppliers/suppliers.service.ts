
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // Get all suppliers
  async getAll() {
    return this.databaseService.query(
      'SELECT * FROM suppliers',
    );
  }

  // Get supplier by ID
  async findById(id: number) {
    const rows: any = await this.databaseService.query(
      'SELECT * FROM suppliers WHERE supplier_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Supplier not found');
    }

    return rows[0];
  }

  // Create a supplier
  async create(body: {
    supplier_name: string;
    contact_number?: string;
  }) {
    const result: any = await this.databaseService.query(
      `INSERT INTO suppliers
        (supplier_name, contact_number)
       VALUES (?, ?)`,
      [
        body.supplier_name,
        body.contact_number || null,
      ],
    );

    return {
      message: 'Supplier created successfully',
      supplier_id: result.insertId,
    };
  }

  // Update a supplier
  async update(
    id: number,
    body: {
      supplier_name: string;
      contact_number?: string;
    },
  ) {
    await this.findById(id);

    await this.databaseService.query(
      `UPDATE suppliers
       SET supplier_name = ?, contact_number = ?
       WHERE supplier_id = ?`,
      [
        body.supplier_name,
        body.contact_number || null,
        id,
      ],
    );

    return {
      message: 'Supplier updated successfully',
    };
  }

  // Delete a supplier
  async delete(id: number) {
    await this.findById(id);

    await this.databaseService.query(
      'DELETE FROM suppliers WHERE supplier_id = ?',
      [id],
    );

    return {
      message: 'Supplier deleted successfully',
    };
  }
}

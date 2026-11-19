import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { createPool, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MotorPartDto } from './motor-part.dto';

@Injectable()
export class MotorPartsService implements OnModuleInit {
  private pool: Pool = createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 5,
  });

  // Gagawa ng table kung wala pa
  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS motor_parts (
        part_id     INT AUTO_INCREMENT PRIMARY KEY,
        motorPart   VARCHAR(255) NOT NULL,
        price       DECIMAL(12,2) NOT NULL,
        brand_id    INT NOT NULL,
        supplier_id INT NOT NULL
      )
    `);
    console.log('motor_parts table ready');
  }

  private async findOne(id: number) {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      'SELECT part_id, motorPart, price, brand_id, supplier_id FROM motor_parts WHERE part_id = ?',
      [id],
    );
    return rows[0];
  }

  async findAll() {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      'SELECT part_id, motorPart, price, brand_id, supplier_id FROM motor_parts ORDER BY part_id',
    );
    return rows;
  }

  async create(d: MotorPartDto) {
    const [res] = await this.pool.query<ResultSetHeader>(
      'INSERT INTO motor_parts (motorPart, price, brand_id, supplier_id) VALUES (?, ?, ?, ?)',
      [d.motorPart, d.price, d.brand_id, d.supplier_id],
    );
    return this.findOne(res.insertId);
  }

  async update(id: number, d: MotorPartDto) {
    const [res] = await this.pool.query<ResultSetHeader>(
      'UPDATE motor_parts SET motorPart = ?, price = ?, brand_id = ?, supplier_id = ? WHERE part_id = ?',
      [d.motorPart, d.price, d.brand_id, d.supplier_id, id],
    );
    if (!res.affectedRows) throw new NotFoundException('Motor part not found');
    return this.findOne(id);
  }

  async remove(id: number) {
    const [res] = await this.pool.query<ResultSetHeader>(
      'DELETE FROM motor_parts WHERE part_id = ?',
      [id],
    );
    if (!res.affectedRows) throw new NotFoundException('Motor part not found');
    return { deleted: true };
  }
}
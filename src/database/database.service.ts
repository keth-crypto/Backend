
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnModuleDestroy
{
  pool!: mysql.Pool;

  async onModuleInit(): Promise<void> {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'defaultdb',

      ssl: {
        rejectUnauthorized: false,
      },

      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    });

    try {
      const conn = await this.pool.getConnection();

      try {
        await conn.ping();
        console.log('MySQL connection successful');
      } finally {
        conn.release();
      }
    } catch (error) {
      await this.pool.end();
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }

  getPool(): mysql.Pool {
    return this.pool;
  }

  async query(
    sql: string,
    values: any[] = [],
  ): Promise<any> {
    const [rows] = await this.pool.execute(sql, values);
    return rows;
  }
}

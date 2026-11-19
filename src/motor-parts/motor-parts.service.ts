private pool: Pool = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
});

async onModuleInit() {
  try {
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
  } catch (err) {
    console.error('DB init failed:', err);
  }
}
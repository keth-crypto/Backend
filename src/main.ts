import * as dotenv from 'dotenv';
import { createApp } from './create-app';

async function bootstrap() {
  dotenv.config();
  const app = await createApp();
  const port = Number(process.env.PORT) || 3001; // 3001: 3000 ay para sa Next.js

  await app.listen(port, '0.0.0.0');
  console.log(`Server listening on http://localhost:${port}`);
}

bootstrap();
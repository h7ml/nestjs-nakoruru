import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
const envpath = join(__dirname, '../../', '.env');
dotenv.config({ path: envpath });

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'aurora-mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'mydatabase',
  retryDelay: parseInt(process.env.DB_RETRY_DELAY || '5000'),
  retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3'),
};

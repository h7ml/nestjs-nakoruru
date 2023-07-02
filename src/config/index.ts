import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
const envpath = join(__dirname, '../../', '.env');
dotenv.config({ path: envpath });

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql.sqlpub.com',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  retryDelay: parseInt(process.env.DB_RETRY_DELAY || '5000'),
  retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3'),
};

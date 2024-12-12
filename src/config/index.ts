import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

// 尝试加载环境变量文件
const envpath = join(__dirname, '../../', '.env');
try {
  dotenv.config({ path: envpath });
} catch (err) {
  console.warn('无法加载 .env 文件:', err);
}

// 数据库配置
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql.sqlpub.com',
  port: (() => {
    try {
      return parseInt(process.env.DB_PORT || '3306');
    } catch {
      return 3306;
    }
  })(),
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  retryDelay: (() => {
    try {
      return parseInt(process.env.DB_RETRY_DELAY || '5000');
    } catch {
      return 5000;
    }
  })(),
  retryAttempts: (() => {
    try {
      return parseInt(process.env.DB_RETRY_ATTEMPTS || '3');
    } catch {
      return 3;
    }
  })(),
  // 添加错误处理
  synchronize: false, // 防止生产环境意外同步
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionLimit: 10,
  },
};

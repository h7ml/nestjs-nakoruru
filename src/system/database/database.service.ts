import { Injectable } from '@nestjs/common';
import { Pool, QueryResult, createPool, sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { Database } from './entities/database.entity';

type Handler = (
  request: VercelRequest,
  response: VercelResponse,
) => Promise<void>;

interface Handlers {
  [key: string]: {
    [key: string]: Handler;
  };
}
@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      connectionString:
        'postgres://default:gEeq9pN2BPCJ@ep-late-bread-842559-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15',
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async getAllDatabases(): Promise<string[]> {
    const query =
      "SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog');";
    const result: QueryResult = await this.pool.query(query);
    return result.rows.map((row) => row.table_name);
  }

  async getDatabaseByTable(
    tableName: string,
    page?: number,
    pageSize?: number,
  ): Promise<{ data: Database[]; total: number }> {
    let query = `SELECT * FROM ${tableName}`;

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      query += ` LIMIT ${pageSize} OFFSET ${offset}`;
    }

    const { rows }: QueryResult<Database> = await this.pool.query(query);
    const countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;
    const countResult: QueryResult<{ total: string }> = await this.pool.query(
      countQuery,
    );
    const total = parseInt(countResult.rows[0].total);

    return { data: rows, total };
  }

  async getDatabaseByTableRows(
    table: string,
    columns?: string[],
    page?: number,
    pageSize?: number,
  ): Promise<{ data: Database[]; total: number }> {
    let columnString = '*';
    if (columns && columns.length > 0) {
      columnString = columns.join(', ');
    }

    // 计算开始索引和结束索引
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 查询总记录数
    const countQuery = `SELECT COUNT(*) FROM ${table}`;
    const countResult: QueryResult<{ count: number }> = await this.pool.query(
      countQuery,
    );
    const total = countResult.rows[0].count;

    // 执行分页查询
    const query = `SELECT ${columnString} FROM ${table} LIMIT ${pageSize} OFFSET ${startIndex}`;
    const result: QueryResult<Database> = await this.pool.query(query);
    const data = result.rows;

    return { data, total };
  }

  async createDatabase(
    createDatabaseDto: CreateDatabaseDto,
  ): Promise<Database> {
    const query = 'INSERT INTO databases (name) VALUES ($1) RETURNING *';
    const values = [createDatabaseDto.name];
    const result: QueryResult<Database> = await this.pool.query(query, values);
    return result.rows[0];
  }

  async updateDatabase(
    id: string,
    updateDatabaseDto: UpdateDatabaseDto,
  ): Promise<Database> {
    const query = 'UPDATE databases SET name = $1 WHERE id = $2 RETURNING *';
    const values = [updateDatabaseDto.name, id];
    const result: QueryResult<Database> = await this.pool.query(query, values);
    return result.rows[0];
  }

  async deleteDatabase(id: string): Promise<void> {
    const query = 'DELETE FROM databases WHERE id = $1';
    const values = [id];
    await this.pool.query(query, values);
  }
}

/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-07-02 23:36:16
 * @lastModified  2023-07-03 04:28:23
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-07-02 23:36:16
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-07-03 04:28:23
 * @FilePath: \src\common\utils\sqlUtils.ts
 * @Description: 封装postgresql数据库操作
 *
 * Copyright (c) 2023 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */

import { sql } from '@vercel/postgres';
import { Readable } from 'stream';

/**
 * 执行 SQL 查询，并返回单条记录
 * @param query 查询语句，可以包含参数占位符
 * @param params 查询参数，用于替换占位符
 * @returns 查询结果中的第一条记录
 */
export async function findOne(
  table: string,
  conditions: string,
  params: any[] = [],
): Promise<any> {
  const query: any = `SELECT * FROM ${table} WHERE ${conditions}`;
  const { rows } = await sql<[any]>(query, ...params);
  return rows[0];
}

/**
 * 执行 SQL 查询，并返回多条记录
 * @param query 查询语句，可以包含参数占位符
 * @param params 查询参数，用于替换占位符
 * @returns 查询结果的记录数组
 */
export async function findAll(
  table: string,
  conditions: string,
): Promise<any[]> {
  console.log(
    '%c [ conditions ]-46',
    'font-size:13px; background:pink; color:#bf2c9f;',
    conditions,
  );
  console.log(
    '%c [ table ]-45',
    'font-size:13px; background:pink; color:#bf2c9f;',
    table,
  );
  // const query: any = sql`SELECT * FROM ${table} WHERE ${conditions}`;
  const { rows } = await sql`SELECT * FROM ${table} WHERE ${conditions}`;

  return rows;
}

/**
 * 执行 SQL 插入操作
 * @param query 插入语句，可以包含参数占位符
 * @param params 插入参数，用于替换占位符
 */
export async function insert(
  table: string,
  values: string,
  params: any[] = [],
): Promise<void> {
  const query: any = `INSERT INTO ${table} VALUES (${values})`;
  await sql(query, ...params);
}

/**
 * 执行 SQL 更新操作
 * @param query 更新语句，可以包含参数占位符
 * @param params 更新参数，用于替换占位符
 */
export async function update(
  table: string,
  values: string,
  conditions: string,
  params: any[] = [],
): Promise<void> {
  const query: any = `UPDATE ${table} SET ${values} WHERE ${conditions}`;
  await sql(query, ...params);
}

/**
 * 执行 SQL 删除操作
 * @param query 删除语句，可以包含参数占位符
 * @param params 删除参数，用于替换占位符
 */
export async function remove(
  table: string,
  conditions: string,
  params: any[] = [],
): Promise<void> {
  const query: any = `DELETE FROM ${table} WHERE ${conditions}`;
  await sql(query, ...params);
}

/**
 * 创建数据库表
 * @param tableName 表名
 * @param columns 表的列定义
 */
export async function createTable(tableName: string, columns: string) {
  const query: any = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
  await sql(query);
}
/**
 * 删除数据库表
 * @param tableName 表名
 */
export async function dropTable(tableName: string) {
  const query: any = `DROP TABLE IF EXISTS ${tableName}`;
  await sql(query);
}

/**
 * 导入数据库表
 * @param tableName 表名
 * @param columns 表的列定义
 * @param dataStream 包含数据的可读流
 * @returns 导入表的结果
 */
export async function importTable(
  tableName: string,
  columns: string,
  dataStream: Readable | any,
): Promise<any> {
  const query: any = `COPY ${tableName} (${columns}) FROM STDIN (FORMAT csv)`;
  const result = await sql(query, dataStream);
  return result;
}

/**
 * 导入数据库
 * @param dataStream 包含数据库导出数据的可读流
 * @returns 导入数据库的结果
 */
export async function importDatabase(
  dataStream: Readable | any,
): Promise<void> {
  const query: any = `COPY table1, table2, table3 FROM STDIN (FORMAT csv)`;
  await sql(query, dataStream);
}

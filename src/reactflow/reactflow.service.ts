import { Injectable } from '@nestjs/common';
import { CreateReactflowDto } from './dto/create-reactflow.dto';
import { UpdateReactflowDto } from './dto/update-reactflow.dto';
import { sql } from '@vercel/postgres';
import * as Mock from 'mockjs';

@Injectable()
export class ReactflowService {
  async create(createReactflowDto: CreateReactflowDto) {
    return 'This action adds a new reactflow';
  }

  async findAll() {
    return 'This action returns all reactflow';
  }

  async findOne(id: string) {
    // await this.deleteTable();
    // return false;
    try {
      await this.ensureTableExists();

      let { rows } = await sql`SELECT * FROM CARTS WHERE user_id=${id}`;

      if (rows.length === 0) {
        const { name, owner, city } = this.generateMockData();
        await sql`
          INSERT INTO CARTS (user_id, Name, OWNER,  City) 
          VALUES (${id}, ${name}, ${owner},  ${city});
        `;
        ({ rows } = await sql`SELECT * FROM CARTS WHERE user_id=${id}`);
      }

      return rows;
    } catch (error) {
      console.log('[ error ]', error);
      throw new Error('An error occurred while fetching data');
    }
  }

  async update(id: number, updateReactflowDto: UpdateReactflowDto) {
    return `This action updates a #${id} reactflow`;
  }

  async remove(id: number) {
    return `This action removes a #${id} reactflow`;
  }

  private async ensureTableExists() {
    console.log('ensureTableExists');
    await sql`
      CREATE TABLE IF NOT EXISTS CARTS (
        user_id varchar(255),
        Name varchar(255),
        OWNER varchar(255),
        City varchar(255)
      );
    `;
  }

  private generateMockData() {
    const mockData = Mock.mock({
      name: '@ctitle',
      owner: '@cname',
      city: '@city',
    });
    return mockData;
  }

  private async deleteTable() {
    try {
      // 删除表
      await sql`DROP TABLE IF EXISTS CARTS;`;
      console.log('表已成功删除');
    } catch (error) {
      console.log('[ error ]', error);
    }
  }
}

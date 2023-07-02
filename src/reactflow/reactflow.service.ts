import { Injectable } from '@nestjs/common';
import { CreateReactflowDto } from './dto/create-reactflow.dto';
import { UpdateReactflowDto } from './dto/update-reactflow.dto';
import { sql } from '@vercel/postgres';

@Injectable()
export class ReactflowService {
  create(createReactflowDto: CreateReactflowDto) {
    return 'This action adds a new reactflow';
  }

  findAll() {
    return `This action returns all reactflow`;
  }

  async findOne(id: string) {
    try {
      // await sql`CREATE TABLE CARTS (user_id varchar(255), Name varchar(255), Owner varchar(255) );`;
      // const names = ['Fiona', 'Lucy'];
      // await sql`INSERT INTO CARTS (Name, Owner) VALUES (${names[0]}, ${names[1]});`;

      await sql`INSERT INTO CARTS (user_id, cart) VALUES (${id}, ${'{}'})`;
      const { rows } = await sql`SELECT * from CARTS where user_id=${id}`;
      return rows;
    } catch (error) {
      console.log(
        '%c [ error ]-23',
        'font-size:13px; background:pink; color:#bf2c9f;',
        error,
      );
      return error;
    }
  }

  update(id: number, updateReactflowDto: UpdateReactflowDto) {
    return `This action updates a #${id} reactflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} reactflow`;
  }
}

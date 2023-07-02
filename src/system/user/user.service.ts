import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sql } from '@vercel/postgres';
@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    // 将 createUserDto 转换为适合插入数据库的格式
    const { firstName, lastName, email, department, status } = createUserDto;
    const insert: any = sql`
    INSERT INTO users (FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT,STATUS) 
    VALUES (${firstName}, ${lastName}, ${email},  ${department},  ${status})`;
    await insert;
    // await insert('users', values);
    return createUserDto;
  }

  async findAll() {
    // 调用数据库查询方法
    // const users = await findAll('users', '1 = 1');
    const { rows } = await sql`SELECT * FROM users WHERE 1 = 1`;

    return rows;
  }

  async findOne(id: number) {
    // 调用数据库查询方法
    const { rows } = await sql`SELECT * FROM users WHERE id=${id}`;
    return rows[0] || '没有找到用户';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 将 updateUserDto 转换为适合更新数据库的格式
    const { firstName, lastName, email, department, status } = updateUserDto;
    // 调用数据库更新方法
    await sql`UPDATE users SET FIRST_NAME = ${firstName}, LAST_NAME = ${lastName}, EMAIL = ${email}, DEPARTMENT = ${department}, STATUS = ${status} WHERE id = ${id}`;
    const { rows } = await sql`SELECT * FROM users WHERE id=${id}`;
    return rows;
  }

  async remove(id: number) {
    // 调用数据库删除方法
    await sql`DELETE FROM users WHERE id = ${id}`;

    return '这个操作删除用户 #' + id;
  }
}

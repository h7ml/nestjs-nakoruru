import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedUserDto, UserDto } from './dto/paginated-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { QueryResultRow, sql } from '@vercel/postgres';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, department, status } = createUserDto;
    const insert: any = sql`
      INSERT INTO users (FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT, STATUS) 
      VALUES (${firstName}, ${lastName}, ${email}, ${department}, ${status})`;

    await insert;

    return createUserDto;
  }

  async findAll(page?: number, limit?: number): Promise<PaginatedUserDto> {
    const offset = (page - 1) * limit;

    const { rows } =
      await sql`SELECT id, first_name, last_name, email, department, status FROM users WHERE 1 = 1 LIMIT ${limit} OFFSET ${offset}`;
    const {
      rows: count,
    }: {
      rows: QueryResultRow[];
    } = await sql`SELECT COUNT(*) as count FROM users WHERE 1 = 1`;

    const users: UserDto[] = rows.map((row: any) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      department: row.department,
      status: row.status,
    }));

    return { data: users, total: count[0].count };
  }

  async findOne(id: number) {
    const { rows } = await sql`SELECT * FROM users WHERE id=${id}`;
    return rows[0] || '没有找到用户';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, email, department, status } = updateUserDto;

    await sql`
      UPDATE users SET FIRST_NAME = ${firstName}, LAST_NAME = ${lastName}, 
      EMAIL = ${email}, DEPARTMENT = ${department}, STATUS = ${status}
      WHERE id = ${id}
    `;

    const { rows } = await sql`SELECT * FROM users WHERE id=${id}`;
    return rows;
  }

  async remove(id: number) {
    await sql`DELETE FROM users WHERE id = ${id}`;
    return '这个操作删除用户 #' + id;
  }
}

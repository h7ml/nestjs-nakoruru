import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  firstName: string;

  @Column({ length: 300 })
  lastName: string;

  @Column({ length: 300 })
  email: string;

  @Column({ length: 300 })
  department: string;

  @Column({ length: 300 })
  status: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  path: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  icon?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  parentId?: number;

  @ApiProperty({ required: false })
  @ManyToOne(() => Menu, (menu) => menu.children)
  parent?: Menu;

  @ApiProperty({ required: false })
  @OneToMany(() => Menu, (menu) => menu.parent)
  children?: Menu[];
}

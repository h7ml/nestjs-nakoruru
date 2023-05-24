import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    const info = this.menuRepository.find();
    // console.log(
    //   '%c [ info ]-15',
    //   'font-size:13px; background:pink; color:#bf2c9f;',
    //   info,
    // );
    return info;
  }

  async findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ id });
  }

  async create(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async update(id: number, updatedMenu: Menu): Promise<void> {
    await this.menuRepository.update(id, updatedMenu);
  }

  async delete(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}

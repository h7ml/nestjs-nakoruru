import { Injectable } from '@nestjs/common';
import * as Mock from 'mockjs';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  private readonly menus: Menu[];

  constructor() {
    this.menus = Mock.mock({
      'menus|5-10': [
        {
          'id|+1': 1,
          title: '@ctitle',
          path: '@word',
          icon: '@word',
          'parentId|0-3': 0,
          'children|0-3': [
            {
              'id|+1': 100,
              title: '@ctitle',
              path: '@word',
              icon: '@word',
              'parentId|0-3': 0,
            },
          ],
        },
      ],
    }).menus;
  }

  findAll(): Menu[] {
    return this.menus;
  }

  findOne(id: number): Menu {
    return this.menus.find((menu) => menu.id === id);
  }

  create(menu: Menu): void {
    this.menus.push(menu);
  }

  update(id: number, updatedMenu: Menu): void {
    const menu = this.menus.find((menu) => menu.id === id);
    Object.assign(menu, updatedMenu);
  }

  delete(id: number): void {
    const menuIndex = this.menus.findIndex((menu) => menu.id === id);
    this.menus.splice(menuIndex, 1);
  }
}

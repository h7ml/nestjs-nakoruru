/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-05-17 00:17:31
 * @lastModified  2023-05-17 00:17:55
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-05-17 00:17:31
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-05-17 00:17:55
 * @FilePath: \nestjs-nakoruru\src\user\user.entity.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { IsString, IsNumber } from 'class-validator';

export class User {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

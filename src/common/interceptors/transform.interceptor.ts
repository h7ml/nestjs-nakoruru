/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-06-11 22:45:19
 * @lastModified  2023-06-11 22:45:19
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-06-11 22:45:19
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-06-11 22:45:31
 * @FilePath: \nestjs-nakoruru\src\common\interceptors\transform.interceptor.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  response: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    if (request.url === '/api/swagger-json') {
      return next.handle().pipe(map((data) => data));
    } else {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          cmd: request.url,
          response: data,
          responseTime: new Date(),
        })),
      );
    }
  }
}

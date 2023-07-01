/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-06-11 22:45:19
 * @lastModified  2023-06-30 20:56:21
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-06-11 22:45:19
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-07-01 10:42:22
 * @FilePath: \src\common\interceptors\transform.interceptor.ts
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
  implements NestInterceptor<T, Response<T>> {
  private readonly whitelist: string[] = [
    '/api/swagger-json',
    '/api/github',
    '/api/github.json',
    '/api/github.md',
    // Add other whitelisted paths here
  ];
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    console.log(
      '%c [ request.url ]-45',
      'font-size:13px; background:pink; color:#bf2c9f;',
      request.url,
    );
    if (this.whitelist.includes(request.url)) {
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

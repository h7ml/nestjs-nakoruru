/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-06-11 22:48:55
 * @lastModified  2023-06-11 22:48:55
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-06-11 22:48:55
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-06-11 23:07:30
 * @FilePath: \nestjs-nakoruru\src\common\exceptions\http.exception.filter.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BusinessException } from './business.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    this.Logger.error('exception:' + JSON.stringify(exception));
    this.Logger.error('url:' + JSON.stringify(request.url));
    this.Logger.error('body:' + JSON.stringify(request.body));
    this.Logger.error('query:' + JSON.stringify(request.query));
    this.Logger.error('params:' + JSON.stringify(request.params));
    this.Logger.error('headers:' + JSON.stringify(request.headers));

    // 处理业务异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      response.status(HttpStatus.OK).send({
        response: null,
        responseTime: new Date(),
        status: error['code'],
        message: error['message'],
        success: false,
      });
      return;
    }

    const exResponse = exception.getResponse();

    if (typeof exResponse === 'string') {
      response.status(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.getResponse(),
      });
    } else {
      response.status(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(exception.getResponse() as any),
      });
    }
  }
}

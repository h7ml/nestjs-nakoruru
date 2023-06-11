/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-06-11 11:53:10
 * @lastModified  2023-06-11 11:53:14
 * Copyright © www.h7ml.cn All rights reserved
 */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as Joi from 'joi';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

/**
 * 对象验证逻辑
 */
const shcema = Joi.object().keys({
  SERVER_VALUE: Joi.object({
    port: Joi.number().default(8000),
    host: Joi.string().required(),
  }),
  LOG_CONFIG: Joi.object({
    TIMESTAMP: Joi.boolean().default(false),
    LOG_LEVEL: Joi.string().valid('info', 'error').required(),
    LOG_ON: Joi.boolean().default(false),
  }),
});

/**
 * 去的环境配置内容
 * @returns 环境配置
 */
export const getConfig = () => {
  const environment = getEnv() ?? 'dev';
  const yamlPath = join(process.cwd(), `./dist/config/.${environment}.yaml`);
  const config = yaml.load(readFileSync(yamlPath, 'utf8')) as Record<
    string,
    any
  >;

  try {
    const { value, error } = shcema.validate(config);
    if (error) {
      console.log(error);
    }
    return value;
  } catch (error) {
    console.log(error);
    return {};
  }
};

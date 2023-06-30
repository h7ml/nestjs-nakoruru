/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-06-11 22:50:12
 * @lastModified  2023-06-11 22:50:13
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-06-11 22:50:12
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-06-11 22:50:48
 * @FilePath: \nestjs-nakoruru\src\common\exceptions\business.exception.ts
 * @Description:
 *
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
export const BUSINESS_ERROR_CODE = {
  // 公共错误码
  COMMON: 10001,
  // 特殊错误码
  TOKEN_INVALID: 10002,
  // 禁止访问
  ACCESS_FORBIDDEN: 10003,
  // 权限已禁用
  PERMISSION_DISABLED: 10003,
  // 用户已冻结
  USER_DISABLED: 10004,
};

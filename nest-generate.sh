###
 # @Author: h7ml <h7ml@qq.com>
 # @Date: 2023-05-16 13:14:59
 # @LastEditors: h7ml <h7ml@qq.com>
 # @LastEditTime: 2023-05-16 13:17:32
 # @FilePath: \nestjs-nakoruru\nest-generate.sh
 # @Description: 
 # 
 # Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved. 
### 

#!/bin/bash

# 检查参数数量
if [ $# -lt 1 ]; then
  echo "参数不足，需要提供名称"
  echo "用法：./nest-generate.sh <name> [<generate-type>]"
  exit 1
fi

# 名称
name=$1

# 生成类型
generate_type=$2

# 生成模块、控制器和服务
if [ -z "$generate_type" ]; then
  nest generate module $name
  nest generate controller $name --no-spec
  nest generate service $name --no-spec
else
  # 根据生成类型执行相应的命令
  case $generate_type in
    "module")
      nest generate module $name
      ;;
    "controller")
      nest generate controller $name --no-spec
      ;;
    "service")
      nest generate service $name --no-spec
      ;;
    *)
      echo "无效的生成类型"
      echo "支持的生成类型：module、controller、service"
      exit 1
      ;;
  esac
fi

#!/bin/bash

# 检查参数数量
if [ $# -lt 1 ]; then
  echo "参数不足，需要提供名称"
  echo "用法：./nest-generate.sh <name1> <name2> ..."
  exit 1
fi

# 遍历所有参数
for name in "$@"
do
  echo "正在生成：$name"

  nest generate module $name
  nest generate controller $name --no-spec
  nest generate service $name --no-spec
  nest generate entity $name --no-spec
  echo "生成完成：$name"
done

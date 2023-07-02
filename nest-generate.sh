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
  yes | nest generate resource $name --no-spec > /dev/null
  echo "生成完成：$name"
done

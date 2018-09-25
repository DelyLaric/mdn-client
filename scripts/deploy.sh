#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

yarn build

scp -r dist/* ubuntu@115.159.51.252:/var/www/mdn

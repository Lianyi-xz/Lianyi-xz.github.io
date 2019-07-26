#!/bin/sh

deploy_env=$1;


if [ $deploy_env == "dev" ]
then
  echo "dev"
elif [ $deploy_env == "stgaing" ]
then
  echo "stagig"
elif [ $deploy_env == "prod" ]
then
  
  ssh travis@47.96.70.2 -o StrictHostKeyChecking=no <<remotessh

  cd /data/wwwroot/www.sosad.cn
  git pull
  cnpm i
  hexo generate
  exit
remotessh

fi

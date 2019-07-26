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
  
  ssh -t travis@47.96.70.2 -o StrictHostKeyChecking=no <<remotessh
  cd /data/wwwroot/
  ls 
  if [ ! -d "/data/wwwroot/www.sosad.cn" ]; then
    mkdir www.sosad.cn
    chown -R www:www ./www.sosad.cn
  fi
  exit;
remotessh

  rsync -az -vv --delete -e  public/ travis@47.96.70.2:/data/wwwroot/www.sosad.cn/

fi

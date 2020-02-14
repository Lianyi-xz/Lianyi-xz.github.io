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
  
  ssh -t deployer@47.96.70.2 -o StrictHostKeyChecking=no <<remotessh
  cd /data/wwwroot/

  if [ ! -d "/data/wwwroot/www.sosad.cn" ]; then
   sudo mkdir www.sosad.cn
  fi

  sudo chown -R deployer:deployer www.sosad.cn

  exit;
remotessh

  npm i

  hexo generate

  rm -rf node_modules

  chmod -R +r public

  rsync -azr -vv --delete  public/ deployer@47.96.70.2:/data/wwwroot/www.sosad.cn/

  ssh -t deployer@47.96.70.2 -o StrictHostKeyChecking=no <<remotessh
  cd /data/wwwroot/

  sudo chown -R www:www www.sosad.cn

  exit;
remotessh


fi
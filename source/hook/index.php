<?php
/**
 * 通过GitHub的webhook实现代码及时更新
 */
error_reporting(-1);

ini_set('display_errors','on');
if (!$_POST['payload']) {
    die('Request Error');
}

$res = system('sudo git pull');

var_dump($res);
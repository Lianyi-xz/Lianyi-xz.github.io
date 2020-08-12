---
title: Python调用微信公众号后台数据
tags: 代码
categories: 技术
date: 2018-02-11 17:28:00
---
### 概述
* 基于Python 2.7.5 实现
* 抓取公司微信公众号平台数据 存入本地数据库
* centos定时任务 中午12点之后运行

<!-- more -->
### 源代码
```python
#!/usr/bin/python
#coding: utf-8
import urllib
import json
import requests
import MySQLdb
from datetime import datetime,timedelta

#get_access_token
access_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
access_data={'appid':'xxxx',
    'secret':'xxxxxx'}
access_data=urllib.urlencode(access_data)

weixin_token=json.loads(urllib.urlopen(access_url,access_data).read())['access_token']
get_date=(datetime.now()-timedelta(days=1)).strftime('%Y-%m-%d')
users_token={'access_token':"%s" % weixin_token}
users_date={'begin_date':'%s' %(get_date),
      'end_date':'%s' %(get_date)}
#users_date={'begin_date':'2017-11-04',
#        'end_date':'2017-11-04'}

api=['getarticlesummary','getuserread','getuserreadhour','getusershare','getusersharehour','getusersummary','getusercumulate']

for i in api:
  api_url='https://api.weixin.qq.com/datacube/{:s}'. format(i)
  ans=requests.post(api_url,params=users_token,json=users_date)
  json_ans=json.loads(ans.text)
  names=locals()
  names['%s' % i] = json_ans

getarticletotal=[]
for i in xrange(1,7):
  api_url='https://api.weixin.qq.com/datacube/getarticletotal'
  get_date=(datetime.now()-timedelta(days=7-i)).strftime('%Y-%m-%d')
  users_date={'begin_date':'%s' %(get_date),'end_date':'%s' %(get_date)}
  ans=requests.post(api_url,params=users_token,json=users_date)
  json_ans=json.loads(ans.text)
  for j in json_ans['list']:
    getarticletotal.append(j)

#connect mysql
try:
  conn = MySQLdb.connect (host = "192.168.0.1",
                           user = "root",
                           passwd = "root123",
                           db = "os_system",
                           charset="utf8")
except Exception as e:
  print(e)
  sys.exit()

#insert article_summary
for i in getarticlesummary['list']:
  cursor =  conn.cursor ()
  insert="insert into wechat_articlesummary values('%s','%s','%s',%d,%d,%d,%d,%d,%d,%d,%d)" %(
        i['msgid'],
        i['ref_date'],
        i['title'],
        i['int_page_read_user'],
        i['int_page_read_count'],
        i['ori_page_read_user'],
        i['ori_page_read_count'],
        i['share_user'],
        i['share_count'],
        i['add_to_fav_user'],
        i['add_to_fav_count'])
  cursor.execute(insert)
  cursor.close()

#insert article_total
#get 7time
for i in getarticletotal:
  cursor =  conn.cursor ()
#  delete="delete from wechat_articletotal where msgid='%s'" %(i['msgid'])
#  cursor.execute(delete)
  insert="insert into wechat_articletotal values('%s','%s','%s','%s',%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d)" %(
        i['msgid'],
        i['ref_date'],
        i['details'][-1]['stat_date'],
        i['title'],
        i['details'][-1]['target_user'],
        i['details'][-1]['int_page_read_user'],
        i['details'][-1]['int_page_read_count'],
        i['details'][-1]['ori_page_read_user'],
        i['details'][-1]['ori_page_read_count'],
        i['details'][-1]['share_user'],
        i['details'][-1]['share_count'],
        i['details'][-1]['add_to_fav_user'],
        i['details'][-1]['add_to_fav_count'],
        i['details'][-1]['int_page_from_session_read_user'],
        i['details'][-1]['int_page_from_session_read_count'],
        i['details'][-1]['int_page_from_hist_msg_read_user'],
        i['details'][-1]['int_page_from_feed_read_count'],
        i['details'][-1]['int_page_from_friends_read_user'],
        i['details'][-1]['int_page_from_friends_read_count'],
        i['details'][-1]['int_page_from_friends_read_user'],
        i['details'][-1]['int_page_from_friends_read_count'],
        i['details'][-1]['int_page_from_other_read_user'],
        i['details'][-1]['int_page_from_other_read_count'],
        i['details'][-1]['feed_share_from_session_user'],
        i['details'][-1]['feed_share_from_session_cnt'],
        i['details'][-1]['feed_share_from_feed_user'],
        i['details'][-1]['feed_share_from_feed_cnt'],
        i['details'][-1]['feed_share_from_other_user'],
        i['details'][-1]['feed_share_from_other_cnt'])
  cursor.execute(insert)
  cursor.close()

#insert user_read
for i in getuserread['list']:
  cursor =  conn.cursor ()
  insert="insert into wechat_userread values('%s',%d,%d,%d,%d,%d,%d,%d,%d,%d)" %(
        i['ref_date'],
        i['user_source'],
        i['int_page_read_user'],
        i['int_page_read_count'],
        i['ori_page_read_user'],
        i['ori_page_read_count'],
        i['share_user'],
        i['share_count'],
        i['add_to_fav_user'],
        i['add_to_fav_count'])
  cursor.execute(insert)
  cursor.close()

#insert user_read_hour
for i in getuserreadhour['list']:
  cursor =  conn.cursor ()
  insert="insert into wechat_userreadhour values('%s',%d,%d,%d,%d,%d,%d,%d,%d,%d,%d)" %(
        i['ref_date'],
        i['ref_hour'],
        i['user_source'],
        i['int_page_read_user'],
        i['int_page_read_count'],
        i['ori_page_read_user'],
        i['ori_page_read_count'],
        i['share_user'],
        i['share_count'],
        i['add_to_fav_user'],
        i['add_to_fav_count'])
  cursor.execute(insert)
  cursor.close()

#insert user_share
for i in getusershare['list']:
  cursor =  conn.cursor ()
  insert="insert into wechat_usershare values('%s',%d,%d,%d)" %(
        i['ref_date'],
        i['share_scene'],
        i['share_count'],
        i['share_user'])
  cursor.execute(insert)
  cursor.close()

#insert user_share_hour
for i in getusersharehour['list']:
  cursor =  conn.cursor ()
  insert="insert into wechat_usersharehour values('%s',%d,%d,%d,%d)" %(
        i['ref_date'],
        i['ref_hour'],
        i['share_scene'],
        i['share_count'],
        i['share_user'])
  cursor.execute(insert)
  cursor.close()

#insert user_summary
for i in getusersummary['list']:
  summary_user='{"user_source": %d,"new_user":%d,"cancel_user":%d}' %(
        i['user_source'],
        i['new_user'],
        i['cancel_user'])
  cursor = conn.cursor ()
  insert="insert into wechat_usersummary  values('%s','%s')" %(
        i['ref_date'],
        summary_user)
  cursor.execute(insert)
  cursor.close()

#insert user_cumulate
for i in getusercumulate['list']:
  cursor = conn.cursor ()
  insert="insert into wechat_usercumulate  values('%s',%d)" %(
        i['ref_date'],
        i['cumulate_user'])
  cursor.execute(insert)
  cursor.close()

#close mysql
conn.commit()
conn.close ()
```
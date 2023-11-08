[TOC]

## DESP单元测试

### 主页

- 从微信跳转到网站，进入登录状态，如果是新医生，则用*openid*作为*weixin_id*在*doctor*表中添加新记录
- 后端根据*openid*作为*weixin_id*查询所有病人纪录，对响应的病人记录，根据病人身份证号和纪录id号检查返回的数据是否有误
- 根据身份证号搜索病人，检查返回的数据是否有误
- 查询病人记录的请求、搜索病人的请求，都需要已登录身份才能通过，否则响应：`{"code": 0, "msg": "无权访问"}`

### 添加记录

**添加记录的所有请求，都需要已登录身份才能通过请求，否则响应：`{"code": 0, "msg": "无权访问"}`**

对于没有过记录的病人，执行以下步骤：

1. 前端将*demo_character*表的数据发送到后端，后端使用*id_card*在*doctor_subject*中添加新纪录
2. 后端生成*id*，*time*，*unix_timestamp*，与人口学相关字段、*id_card*一并保存到表*demo_character*
3. 后端将*id*（命名为**subject_id**）和*unix_timestamp*传到前端，前端携带两个字段跳转*life_style*表的收集页面
4. 前端将*life_style*表的数据发送到后端，包括*subject_id*，*unix_timestamp*，后端将其保存到表*life_style*
5. 此后的*health_statu*，*moca*，*mmse*，*gdscale*，*npiq*，*adl*表页面都需要前端携带*subject_id*和*unix_timestamp*访问，并一起发送到后端

对于有过记录的病人，执行步骤为去掉新加入病人步骤的2-5步

### 查看一条记录

1. 前端携带*id*请求后端查询一条记录，后端根据*id*到*demo_character*中查询人口学特征数据并返回到前端
2. 对于后续表*life_style*，*health_statu*，*moca*，*mmse*，*gdscale*，*npiq*，*adl*，前端也需要携带*id*请求后端查询记录，后端将*id*作为*subject_id*到这7个表中查询数据并响应
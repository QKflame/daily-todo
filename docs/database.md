# 系统数据库设计

## user 用户表

| 字段名   | 类型    | 备注   | 说明                       |
| -------- | ------- | ------ | -------------------------- |
| id       | int     | 用户ID |                            |
| name     | varchar | 姓名   |                            |
| email    | varchar | 邮箱   |                            |
| phone    | varchar | 手机号 |                            |
| gender   | tinyint | 性别   | 0 未知<br />1 男<br />2 女 |
| password | varchar | 密码   |                            |



## todo 待办事项表

| 字段名          | 类型      | 备注         | 说明                                                         |
| --------------- | --------- | ------------ | ------------------------------------------------------------ |
| id              | int       | todo id      |                                                              |
| title           | varchar   | 标题         |                                                              |
| icafe_card_link | varchar   | 卡片链接     |                                                              |
| priority        | tinyint   | 优先级       | 0 无优先级<br />1 高优<br />2 中优先级<br />3 低优先级       |
| status          | tinyint   | 状态         | -1 无状态<br />0 待需求设计<br />1 待原型设计<br />2 待需求评审<br />3 待原型评审<br />4 待UE图设计<br />5 待UE图评审<br />6 待开发<br />7 开发中<br />8 待联调<br />9 联调中<br />10 待提测<br />11 待测试<br />12 测试中<br />13 待上线<br />14 已上线<br />15 已完成<br />16 HOLD<br /> |
| progress        | int       | 进度         | 0-100                                                        |
| content         | text      | 内容         |                                                              |
| start_time      | timestamp | 预计开始时间 |                                                              |
| finish_time     | timestamp | 预计结束时间 |                                                              |



## plan 计划表

| 字段名    | 类型    | 备注     | 说明 |
| --------- | ------- | -------- | ---- |
| id        | int     | 计划ID   |      |
| title     | varchar | 计划标题 |      |
| parent_id | int     | 父计划ID |      |
|           |         |          |      |
|           |         |          |      |
|           |         |          |      |
|           |         |          |      |


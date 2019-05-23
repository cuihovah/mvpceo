# mvpceo
 In order to better learn enterprise management technology. To be the next King Of Worker

## Todo list

 - 员工管理
 - 项目管理
 - 迭代管理
 - 任务管理
 - 能力模型管理
 - 绩效管理


# SCHEMA

Worker

```json
{
  id: ObjectId,
  name: string,
  ctime: date,
  teach: string,
  preformance: string,
  gender: string,
  birthday: date,
  avator: string,
}
```

Project

```json
{
  id: ObjectId,
  name: string,
  ctime: date,
  type: string,
}
```

Iteration

```json
{
  id: ObjectId,
  project_id: string,
  name: string,
  ctime: date,
  score: int,
  master: string,
  members: [{
    id: string,
    cv: int, // 贡献值
    role: string,
  }]
}
```

mission

```json
{
  id: ObjectId,
  name: string,
  ctime: date,
  time: int,
  urgent: int, // 紧急程度
  score: int,
  master: string,
  members: [{
    id: string,
    cv: int, // 贡献值
  }]
}
```

Techincal

```json
{
  id: ObjectId,
  name: string,
  user_id: string,
  etime: date,
  stime: date,
  level: int,
  technical: int, // 1-10 解决问题能力
  knowledge: int,
  finish: int,
  project: int,
  job: int
}
```

Preformance

```json
{
  id: ObjectId,
  name: string,
  etime: date,
  stime: date,
  level: string,
  performance: int,
  technical: int,
  profession: int
}
```


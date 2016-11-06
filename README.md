### 使用node + express + jade + mysql搭建基础手机版百度新闻及后台

#### 配置  
1. 启动mysql数据库
2. 导入baidu-news.sql中的数据
3. 在config/default.js中配置用户名、密码和数据库名

#### 启动
1. npm install 安装依赖
2. npm start 或者 grunt 

#### 页面说明，设置了三个分类：分类、百家、本地
1. 首页：127.0.0.1:3000/
2. 详情页：127.0.0.1:3000/news/1
3. 后台管理页：127.0.0.1:3000/admin
4. 后台添加页：127.0.0.1:3000/admin/create
5. 后台更新页：127.0.0.1:3000/admin/update/1
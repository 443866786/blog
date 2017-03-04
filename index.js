var path=require('path');
var express=require('express');
// sission中间件
var session=require('express-session');
// 将session储存在mongo中
var MongoStore=require('connect-mongo')(session);
// flash中间件
var flash=require('connect-flash');
// 表单和文件上传中间件
var form=require('express-formidable')
// 读取默认配置
var config=require('config-lite');
// 路由自动读取index.js
var routes=require('./routes');
// package.json
var pkg=require('./package');
// 实例express对象
var app= express();
// 设置模板静态目录
app.set('views',path.join(__dirname,'views'));
// 设置模板引擎
app.set('view engine','ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));
// sission中间件
app.use(session({
    // 设置 cookie 中保存 session id 的字段名称
    name:config.session.key,
    // 通过设置 secret 来计算 hash 值并放在 cookie 中
    secret:config.session.secret,
    // 强制更新 session
    resave:true,
    // 设置为 false，强制创建一个 session，即使用户未登录
    saveUninitialized:false,
    // 过期时间，过期后 cookie 中的 session id 自动删除
    cookie:{
        maxAge:config.session.maxAge
    },
    // 将 session 存储到 mongodb
    store: new MongoStore({url:config.mongodb})
    // mongodb 地址
}));
// 使用flash中间件
app.use(flash());
// 处理表单及文件上传的中间件
app.use(form({
    uploadDir:path.join(__dirname,'public/img'),//上传文件目录,
    keepExtensions:true
}))
// 设置全局模板常量
app.locals.blog={
    title:pkg.name,
    description:pkg.description
}
// 添加模板需要的三个量
app.use(function (req,res,next) {
    res.locals.user=req.session.user;
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    next();
})
// 使用路由
routes(app);
// 监听端口
app.listen(config.port,function () {
    console.log("成功启动myblog");
})

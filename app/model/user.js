module.exports = (app) => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const User = app.model.define('user', {
        username: STRING(30),
        password: STRING(32),
        email: STRING,
        openid: STRING,
        pic: STRING,
        type: STRING,
        authority: STRING,
        statu: STRING,
        vip: STRING,
        sign: STRING,
        reply:INTEGER,
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL 创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    });

    // 创建表
    // User.sync() 会创建表并且返回一个 Promise 对象
    // 如果 force = true 则会把存在的表（如果 users 表已存在）先销毁再创建表
    // 默认情况下 forse = false
    let user = User.sync({force: false});

    // 添加用户qq
    User.addUserqq = function (username, pic, type, authority, statu, vip, sign,openid) {
        return app.model.User.create({
            username,
            pic,
            type,
            authority,
            statu,
            vip,
            sign,
            openid,
            reply:'0'
        });
    };


    // 添加用户
    User.addUser = function (username, password, email, pic, type, authority, statu, vip, sign) {
        return app.model.User.create({
            username,
            password,
            email,
            pic,
            type,
            authority,
            statu,
            vip,
            sign,
            reply:'0'
        });
    };

    // 查找用户用户
    User.findOneUser = function (email) {
        return app.model.User.findOne({"where": {"email": email}});
    }

    // 查找用户用户
    User.findOneUserOpenid = function (openid) {
        return app.model.User.findOne({"where": {"openid": openid}});
    }

    //修改回帖次数
    User.updataReply = function(id,n){
        return app.model.User.update({'reply':n},{
            where:{
                 'id':id
            },
        });
    }

    //获取回帖次数
    User.findReply = function(id){
        return app.model.User.findOne({"where":{'id':id}});
    }

    //回帖排行榜
    User.hotReply = function(index){
        let indexs = (index - 1) * 20;
        let rows = 20;
        return app.model.User.findAndCountAll({
             order: [
                ['reply', 'DESC']
            ],
             limit: rows,
             offset: indexs
        });
    }


    return User;
};
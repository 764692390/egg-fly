module.exports = (app) => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const Qq = app.model.define('qq', {
        ret: STRING,
        msg: STRING,
        is_lost: STRING,
        nickname: STRING,
        gender: STRING,
        province:STRING,
        city:STRING,
        year: STRING,
        figureurl:STRING,
        figureurl_1: STRING,
        figureurl_2: STRING,
        figureurl_qq_1: STRING,
        figureurl_qq_2:STRING,
        is_yellow_vip: STRING,
        vip: STRING,
        yellow_vip_level: STRING,
        level: STRING,
        is_yellow_year_vip: STRING,
        openid:STRING,
        statu:STRING,
        email:STRING,
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
    let qq = Qq.sync({force: false});

    // 添加用户
    Qq.addQq = function (data) {
        data.statu = '1'; //添加用户默认状态是1 开启
        data.email = '0'; //默认没有绑定邮箱
        return app.model.Qq.create(data);
    };

    //更新QQ用户信息
    Qq.updateQq = function (openid,data) {
        return app.model.Qq.update(data,{'where':{'openid':{$like:openid}}});
    };

    //更新QQ用户状态statu
    Qq.updateQqStatu = function (openid,statu){
        //statu状态1 是开启 0 是禁用
        return app.model.Qq.update({"statu":statu},{'where':{'openid':{eq:openid}}})
    }

    // 查找QQ用户
    Qq.findOneQq = function (openid) {
        return app.model.Qq.findOne({"where": {"openid": openid}});
    }

    // 查找QQ绑定的email
    Qq.findOneQqEmail = function (email) {
        return app.model.Qq.findOne({"where": {"email": email}});
    }


    return Qq;
};
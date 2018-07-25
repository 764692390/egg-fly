module.exports = (app) => {
    const {STRING,TEXT,INTEGER, DATE} = app.Sequelize;

    const Jie = app.model.define('jie', {
        title: STRING,
        username:STRING,
        clas:STRING,
        content: TEXT,
        openid: STRING,
        email:STRING,
        pic: STRING,
        statu: STRING,
        recommend: STRING,
        stick: STRING,
        look:STRING,
        repat:STRING,
        ip:STRING,
        city:STRING,
        country:STRING,
        authority: STRING,
        userstatu: STRING,
        vip: STRING,
        sign: STRING,

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
    let jie = Jie.sync({force: false});

    // 添加帖子
    Jie.addJie = function (title,username,clas,content,openid,email,pic,statu,recommend,stick,look,repat,ip,city,country,authority,userstatu,vip,sign) {
        return app.model.Jie.create({title,username,clas,content,openid,email,pic,statu,recommend,stick,look,repat,ip,city,country,authority,userstatu,vip,sign});
    };


    // 查找帖子
    Jie.findOneJie = function (id) {
        return app.model.Jie.findOne({
            where: {"id": id}
        });
    }

    // 查找帖子 分页
    Jie.findJie1 = function (index) {
        let indexs = (index - 1) * 20;
        let rows = 20;
        return app.model.Jie.findAndCountAll({
             where:{'statu':'1','clas':'0','stick': '0'},
             order: [
                ['created_at', 'DESC']
            ],
             limit: rows,
             offset: indexs
        });
    }

    //查找当前用户发布的帖子分页 type=0 本站注册用户
    Jie.findUserJie = function (index,rows,email) {
        let row = rows || 20;
        let indexs = (index - 1) * row;
        return app.model.Jie.findAndCountAll({
             where:{'statu':'1','clas':'0','email': email},
             order: [
                ['created_at', 'DESC']
            ],
             limit: row,
             offset: indexs
        });
    }

    //查找当前用户发布的帖子分页 type=qq qq登录用户发帖
    Jie.findUserQQJie = function (index,rows,openid) {
        let row = rows || 20;
        let indexs = (index - 1) * row;
        return app.model.Jie.findAndCountAll({
             where:{'statu':'1','clas':'1','openid': openid},
             order: [
                ['created_at', 'DESC']
            ],
             limit: row,
             offset: indexs
        });
    }


    // 查找帖子-公告
    Jie.findJie2 = function (index) {
        let indexs = (index - 1) * 20;
        let rows = 20;
        return app.model.Jie.findAndCountAll({
             where:{'statu':1,'clas':'1','clas':'1'},
             order: [
                ['created_at', 'DESC']
            ],
             limit: rows,
             offset: indexs
        });
    }

    // 查找帖子-置顶
    Jie.findJie3 = function () {
        return app.model.Jie.findAndCountAll({
            where:{
                 'statu':'1','stick': '1'
            },
            order: [
                ['created_at', 'DESC']
            ],
             limit: 4,
             offset: 0
        });
    }

    // 查找帖子-浏览量
    Jie.findJie4 = function () {
        return app.model.Jie.findAndCountAll({
            where:{
                 'statu':'1'
            },
            order: [
                ['repat', 'DESC']
            ],
             limit: 20,
             offset: 0
        });
    }

    // 更新帖子浏览量
    Jie.upDateLook = function(id,n){
        return app.model.Jie.update({'look':n},{
            where:{
                 'id':id
            },
            
        });
    }

    // 更新帖子回复量
    Jie.upDateRepat = function(id,n){
        return app.model.Jie.update({'repat':n},{
            where:{
                 'id':id
            },
        });
    }



    return  Jie;
};
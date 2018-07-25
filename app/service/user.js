const Service = require('egg').Service;

class UserService extends Service {
    /*登录*/
    async login(email, pass) {
        let password = this.ctx.helper.Md5(pass);
        let finduser = await this.ctx.model.User.findOneUser(email);
        if (finduser == null) {
            return {"success": false, "msg": "用户名不存在！"};
        } else {
            if (finduser.dataValues.password != password) {
                return {"success": false, "msg": "密码不对！"};
            } else {
                this.ctx.session.user = finduser.dataValues;
                return {"success": true, "msg": "登录成功！"};
            }
        }
    };

    /*注册*/
    async reg(email, username, pass) {
        let password = this.ctx.helper.Md5(pass);
        let finduser = await this.ctx.model.User.findOneUser(email);
        let n = await this.ctx.helper.Random(0, 11);
        let userImage = '/images/avatar/' + n + '.jpg'; //系统默认图像
        let sign = '这个人懒得留下签名！';

        if (finduser == null) {
            let data = await this.ctx.model.User.addUser(username, password, email, userImage, '0', '0', '1', '0', sign);
            return data;
        } else {
            return false;
        }
        ;
    };

    /*更新回帖数量*/
    async updataReply(id,n){
       return  await this.ctx.model.User.updataReply(id,n);
    }

    /*获取回帖数量*/
    async getReply(id){
        return await this.ctx.model.User.findReply(id);
    }

    //回帖用户排行榜
    async getHotReply(index){
        return await this.ctx.model.User.hotReply(index);
    }
};

module.exports = UserService;
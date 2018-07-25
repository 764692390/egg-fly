const Controller = require('egg').Controller;

class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    };
    //判断是否管理员
    async IsAuthAdmin(){
        if (this.ctx.session.populated && this.ctx.session.user != undefined){
            if(this.ctx.session.user.authority == 1){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        };
    }

    //判断是否登录
    async IsAuth(){
        if (this.ctx.session.populated && this.ctx.session.user != undefined){
            return true;
        }else{
            this.success(false,'请登录!')
            return false;
        };
    }

    //api接口返回
    async success(data,msg) {
        if(data){
            this.ctx.body = {
                success: true,
                msg:msg,
                code:0,
                data,
            };
        }else{
            this.ctx.body = {
                success: false,
                code:1,
                msg:msg,
                data:null,
            };
        }
    };

};



module.exports = BaseController;
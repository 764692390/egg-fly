const Controller = require('egg').Controller;

class AppController extends Controller {
    /*QQ互联登陆get*/
    async qq() {
        //获取上一个页面
        let  referer = this.ctx.request.header.referer;
        let client_id = this.ctx.app.config.qq.client_id;
        let redirect_uri = this.ctx.app.config.qq.redirect_uri;
        /**
         * Step1：获取Authorization Code
         */
        await this.ctx.redirect('https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&state='+referer);
    }

    /*QQ互联回调地址*/
    async loginCallBack() {
        //QQ互联
        if(this.ctx.query.code){
            //QQ互联
            const QQLogin = await this.ctx.service.qq.login(this);
        }    
    }
};

module.exports = AppController;
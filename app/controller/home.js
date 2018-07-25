const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.locals.lay.base = {
            keywords:"Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术",
            description:"Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io",
            title:"Egg-中文社区",
            clas:'0',
        };

        //QQ互联
        if(this.ctx.query.code){
            //QQ互联
            const QQLogin = await this.ctx.service.qq.login(this);
        }else{
            /*提问*/
            const page = await this.ctx.service.jie.page(1);
            this.ctx.locals.pages = page;

            /*置顶*/
            const page3 = await this.ctx.model.Jie.findJie3();
            this.ctx.locals.pages3 = page3;

            /*热议帖子 */
            const hotPage = await this.ctx.model.Jie.findJie4();
            this.ctx.locals.hotPage = hotPage;

             /*回帖排行榜*/
             const hotReply = await this.ctx.service.user.getHotReply(1);
             this.ctx.locals.hotReply = hotReply;

            await this.ctx.render('index.tpl');
        }
    }
};

module.exports = HomeController;
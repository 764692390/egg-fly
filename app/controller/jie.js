const Controller = require('egg').Controller;

class DetailController extends Controller {
    //查看详情
    async detail() {
        if (isNaN(this.ctx.params.id) || this.ctx.params.id < 1) {
            await this.ctx.render('404.tpl');
            return false;
        }
        let id = Math.floor(this.ctx.params.id) || 1;

        let rows = await this.ctx.service.jie.findOneJieS(id);
        if (rows == null) {
            return false;
        }

        //查看是否是自己的帖子
        if (rows.openid.length) {
            if (this.ctx.session.user != undefined) {
                if (this.ctx.session.user.openid == rows.openid) {
                    rows.isUserJie = 2;
                } else {
                    rows.isUserJie = 1;
                }
            }
        } else {
            if (this.ctx.session.user != undefined) {
                if (this.ctx.session.user.email == rows.email) {
                    rows.isUserJie = 2;
                } else {
                    rows.isUserJie = 1;
                }
            }
        }
        if (this.ctx.session.user == undefined) {
            rows.isUserJie = 0;
        }
        //更新浏览量
        let n = Math.floor(rows.look) + 1;
        this.ctx.service.jie.upDateLook(id, n);
        //获取留言分页
        let page = await this.ctx.service.reply.page(1, id);
        //更新帖子表中的回复数量
        let length = page.count;
        this.ctx.service.jie.upDateRepat(id, length);
        this.ctx.locals.page = page;
        rows.repat = length;
        this.ctx.locals.rows = rows;
        this.ctx.locals.lay.base = {
            keywords: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术",
            description: rows.title + ",Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,",
            title: rows.title + "-Egg中文社区",
            page: "jie",
            jieid: id,
            isPage: false,
            index: 1,
        };

        /*提问*/
        this.ctx.locals.pages = await this.ctx.service.jie.page(1);

        // /*置顶*/
        this.ctx.locals.pages3 = await this.ctx.model.Jie.findJie3();

        // /*热议帖子 */
        this.ctx.locals.hotPage = await this.ctx.model.Jie.findJie4();

        // /*回帖排行榜*/
        this.ctx.locals.hotReply = await this.ctx.service.user.getHotReply(1);


        await this.ctx.render('./jie/detail.tpl');
    };

    //帖子详情留言分页
    async detailindex() {
        if (isNaN(this.ctx.params.id) || isNaN(this.ctx.params.index) || this.ctx.params.id < 1 || this.ctx.params.index < 1) {
            await this.ctx.render('404.tpl');
            return false;
        }
        let id = Math.floor(this.ctx.params.id) || 1;
        let index = Math.floor(this.ctx.params.index) || 1;

        let rows = await this.ctx.service.jie.findOneJieS(id);
        if (rows == null) {
            return false;
        }
        //查看是否是自己的帖子
        if (rows.openid.length) {
            if (this.ctx.session.user != undefined) {
                if (this.ctx.session.user.openid == rows.openid) {
                    rows.isUserJie = 2;
                } else {
                    rows.isUserJie = 1;
                }
            }
        } else {
            if (this.ctx.session.user != undefined) {
                if (this.ctx.session.user.email == rows.email) {
                    rows.isUserJie = 2;
                } else {
                    rows.isUserJie = 1;
                }
            }
        }
        if (this.ctx.session.user == undefined) {
            rows.isUserJie = 0;
        }

        //获取留言分页
        let page = await this.ctx.service.reply.page(index, id);
        //更新帖子表中的回复数量
        let length = page.count;
        this.ctx.service.jie.upDateRepat(id, length);
        this.ctx.locals.page = page;
        rows.repat = length;
        this.ctx.locals.rows = rows;
        this.ctx.locals.lay.base = {
            keywords: "",
            description: "",
            title: "详情页",
            page: "jie",
            jieid: id,
            isPage: true,
            index: index
        };

        await this.ctx.render('./jie/detail.tpl');
    }

    //发表新帖子
    async add() {
        this.ctx.locals.lay.base = {
            keywords: "",
            description: "",
            title: "发表新帖",
            page: "jie",
        };

        let Authorization = this.ctx.helper.Authorization(this.ctx);

        if (Authorization) {
            await this.ctx.render('./jie/add.tpl');
        };
    }
};

module.exports = DetailController;
const Controller = require('egg').Controller;

class ColumnController extends Controller {
  //提问分页
  async page() {
    if (typeof this.ctx.params.index == 'undefined' || isNaN(this.ctx.params.index) || this.ctx.params.index < 1) {
      await this.ctx.render('404.tpl');
      return false;
    }

    let index = Math.floor(this.ctx.params.index) || 1;

    this.ctx.locals.lay.base = {
      keywords: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术",
      description: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io",
      title: "Egg-中文社区",
      name: "",
      clas: '0',
      index: index,
      page: "jie",
    };

    /*提问*/
    const page = await this.ctx.service.jie.page(index);
    this.ctx.locals.pages = page;

    // /*置顶*/
    this.ctx.locals.pages3 = await this.ctx.model.Jie.findJie3();

    // /*热议帖子 */
    this.ctx.locals.hotPage = await this.ctx.model.Jie.findJie4();

    // /*回帖排行榜*/
    this.ctx.locals.hotReply = await this.ctx.service.user.getHotReply(1);

    await this.ctx.render('./jie/index.tpl');
  };

  //公告
  async notice() {
    this.ctx.locals.lay.base = {
      keywords: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术",
      description: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io",
      title: "Egg-中文社区",
      clas: '1',
    };

    /*公告*/
    const page = await this.ctx.service.jie.page2(1);
    this.ctx.locals.pages = page;

    /*热议帖子 */
    const hotPage = await this.ctx.model.Jie.findJie4();
    this.ctx.locals.hotPage = hotPage;

    /*回帖排行榜*/
    const hotReply = await this.ctx.service.user.getHotReply(1);
    this.ctx.locals.hotReply = hotReply;

    await this.ctx.render('index.tpl');

  };


  //公告分页
  async noticepage() {
    if (typeof this.ctx.params.index == 'undefined' || isNaN(this.ctx.params.index) || this.ctx.params.index < 1) {
      await this.ctx.render('404.tpl');
      return false;
    }
    let index = Math.floor(this.ctx.params.index) || 1;

    this.ctx.locals.lay.base = {
      keywords: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术",
      description: "Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io",
      title: "Egg-中文社区",
      name: "",
      clas: '1',
      index: index,
      page: "jie",
    };

    /*公告*/
    const page = await this.ctx.service.jie.page(index);
    this.ctx.locals.pages = page;

    await this.ctx.render('./jie/index.tpl');
  };

};

module.exports = ColumnController; 
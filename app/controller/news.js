const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        const data = newsList.data.result;
        await ctx.render('news/list.tpl', { list: data });
    };
};


module.exports = NewsController;
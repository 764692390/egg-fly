const Service = require('egg').Service;

class NewsService extends Service {
    async list(page) {
        const { serverUrl, rows } = this.config.news;
        return await this.ctx.curl(`${serverUrl.getArticlePage}`, {
            data: {
               index: page,
               rows:rows
            },
            dataType: 'json',
        });
    }
}

module.exports = NewsService;
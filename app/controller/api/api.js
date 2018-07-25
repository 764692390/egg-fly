const BaseController = require('./base');

class ApiController extends BaseController {

    async index() {
        let page = await parseFloat((this.ctx.query.page || 1));
        let rows = await parseFloat((this.ctx.query.rows || 10));
        let index = await (parseFloat(page) - 1) * rows;
        const results = await this.app.mysql.select('loginlog', {
            orders: [['id', 'abs']],
            limit: rows,
            offset: index
        });
        this.success(results);
    }
}
module.exports = ApiController;
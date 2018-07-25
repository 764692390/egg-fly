const fs = require('fs');
const path = require('path');
const BaseController = require('./base');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UploadController extends BaseController {
    /*上传图片*/
    async index() {
        const stream = await this.ctx.getFileStream();
        const oDate = new Date();
        const Y = oDate.getFullYear();//年
        const M = oDate.getMonth() + 1;  // 0-11月
        const D = oDate.getDate();//日
        const H = oDate.getHours();      // 小时
        const MM = oDate.getMinutes();   // 分
        const filename = "/" + H + '-' + MM + path.extname(stream.filename).toLowerCase();
        const url = 'app/public/upload/' + Y + '-' + M + '-' + D;
        const childUrl = '/public/upload/' + Y + '-' + M + '-' + D;
        //查看是否存在url文件目录
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url);
        }
        const target = path.join(this.config.baseDir, url , filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }

        this.success({url: childUrl + filename },'上传成功!');
    };
};
module.exports = UploadController;
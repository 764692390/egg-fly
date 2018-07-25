/*验证码处理*/
const captchapng = require('captchapng');
module.exports = (app) => {
    return async function imgCode(ctx, next) {
        //处理验证码
        if (ctx.request.url.indexOf('/captchapng.png') != -1) {
            let code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);  //生成随机验证码
            let p = new captchapng(120, 36, parseInt(code)); // width,height,numeric captcha
            p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
            p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
            let img = p.getBase64();
            let imgbase64 = new Buffer(img, 'base64');
            ctx.response.type = "image/png";
            ctx.response.body = imgbase64;
            ctx.session.code = code;
        } else {
            await next();
        }
    };
};
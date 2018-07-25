const Service = require('egg').Service;

class QqService extends Service {
    //通过code获取qq用户信息;
    async login(obj) {
        let state = obj.ctx.query.state;
        let code = obj.ctx.query.code;
        let code2 = await obj.ctx.curl('https://graph.qq.com/oauth2.0/token',{
            data: {
                'grant_type': 'authorization_code',
                'client_id': obj.ctx.app.config.qq.client_id,
                'redirect_uri': obj.ctx.app.config.qq.redirect_uri,
                'code': code,
                'client_secret': obj.ctx.app.config.qq.client_secret
            },
            dataType: 'text'
        });
        if( code2.data.indexOf('access_token=') == -1 ){
            await obj.ctx.render('user/login.tpl');
            return;
        };
        let access_token = code2.data.split('&expires_in=')[0].split('=')[1];
        let refresh_token = code2.data.split('refresh_token=')[1];
        let code3 = await obj.ctx.curl('https://graph.qq.com/oauth2.0/me',{
            data:{
                'access_token':access_token
            },
            dataType: 'text'
        });
        if( code3.data.indexOf('openid":"') == -1 ){
            await obj.ctx.render('user/login.tpl');
            return;
        };
        let openid = code3.data.split('openid":"')[1].split('"}')[0];

        let code4 = await obj.ctx.curl('https://graph.qq.com/user/get_user_info',{
            data:{
                'access_token':access_token,
                'openid':openid,
                'oauth_consumer_key':obj.ctx.app.config.qq.client_id
            },
            dataType: 'json'
        });
        //处理https去掉前面的http
        code4.data.figureurl = code4.data.figureurl.substring(5,code4.data.figureurl.length-1);
        code4.data.figureurl_1 = code4.data.figureurl_1.substring(5,code4.data.figureurl_1.length-1);
        code4.data.figureurl_2 = code4.data.figureurl_2.substring(5,code4.data.figureurl_2.length-1);
        code4.data.figureurl_qq_1 = code4.data.figureurl_qq_1.substring(5,code4.data.figureurl_qq_1.length-1);
        code4.data.figureurl_qq_2 = code4.data.figureurl_qq_2.substring(5,code4.data.figureurl_qq_2.length-1);
        code4.data.openid = openid;
        //如果是登录或者注册页面 进来的 就跳到个人主页 ，否则那里跳进去的就去那里
        if(state.indexOf('/user/reg') != -1 ){
            obj.ctx.redirect('/user/home');
        }else if(state.indexOf('/user/login') != -1 ){
            obj.ctx.redirect('/user/home');
        }else{
            obj.ctx.redirect(state);
        };
        //存库qq
        let findqq = await obj.ctx.model.Qq.findOneQq(openid);
        if (findqq == null) {
            let addQQ = await obj.ctx.model.Qq.addQq(code4.data);
        } else {
            let updateQQ = await obj.ctx.model.Qq.updateQq(openid,code4.data);
        };
       
        //存库user
        let finduseropenid = await obj.ctx.model.User.findOneUserOpenid(openid);
        if (finduseropenid == null) {
            let addQQEmail = await obj.ctx.model.User.addUserqq(
                code4.data.nickname,
                code4.data.figureurl_qq_1,
                'qq',
                '0', //管理员
                '1',
                '1', //会员3
                '这个人懒得留下签名!',
                openid
            );
        }
       
        //缓存
        let FindOneUser = await obj.ctx.model.User.findOneUserOpenid(openid); 
        obj.ctx.session.user =FindOneUser;
        obj.ctx.locals.user = obj.ctx.session.user;


    }
}

module.exports = QqService;
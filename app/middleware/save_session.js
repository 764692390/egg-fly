module.exports = () => {
    return async function saveSession(ctx, next) {
        //把用户信息放在locals对象上全局模版都能访问
        if (ctx.session.populated && ctx.session.user != undefined) {
            ctx.locals.user = ctx.session.user;
        }

        //把baseurl信息放在locals对象上全局模版都能访问
        ctx.locals.BaseUrl = ctx.app.config.BaseUrl;
        ctx.locals.lay = ctx.app.config.lay;
        await next();

        /*404 处理 */
        if (ctx.status == 404 || ctx.status == 500) {
            ctx.locals.lay.base = {
                keywords: "404keywords",
                description: "404description",
                title: "404",
            };
            await ctx.render('404.tpl');
        }

        // 如果 Session 是空的，则不保存
        if (!ctx.session.populated && ctx.session.user == undefined) return;
        await ctx.session.save();
    };
};
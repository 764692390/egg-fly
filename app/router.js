module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);

    router.get('/app/qq', controller.app.qq);
    router.get('/loginCallBack', controller.app.loginCallBack);

    router.get('/user/login', controller.user.login);
    router.get('/user/reg', controller.user.reg);
    router.get('/user/logout', controller.user.logout);
    router.get('/user/set', controller.user.set);
    router.get('/user/activate', controller.user.activate);
    router.get('/user/message', controller.user.message);
    router.get('/user/home', controller.user.home);

    router.get('/jie/:id', controller.jie.detail);
    router.get('/jie/:id/page/:index', controller.jie.detailindex);
    router.get('/jie/add/page', controller.jie.add);

    router.get('/column/all/page/:index',controller.column.page);
    router.get('/column/notice/',controller.column.notice);
    router.get('/column/notice/page/:index',controller.column.noticepage);

    router.post('/api/user/login', controller.api.user.login);
    router.post('/api/user/reg', controller.api.user.reg);

    router.post('/api/upload', controller.api.upload.index);

    router.post('/api/jie/add', controller.api.jie.add);
    router.get('/api/jie/page/:index', controller.api.jie.page);

    router.post('/api/reply/add', controller.api.reply.add);

    router.post('/api/reply/add', controller.api.reply.add);

};
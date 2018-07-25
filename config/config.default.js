exports.keys = '20171205_lizhi';

//域名配置
exports.BaseUrl = {
    "CDN": "https://bbs.jczxw.cn/public",
    "HOST": "https://bbs.jczxw.cn"
};

//lay信息
exports.lay = {
    version: "2.3.3",
    timer: new Date().getTime(),
    base: {
        keywords: "",
        description: "",
        title: "",
    }
};

// 添加 view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};

//CURL
exports.news = {
    serverUrl: {
        'getArticlePage': 'https://blog.jczxw.cn/api/ArticlePage'
    },
    rows: '10',
}


/* egg-sequelize */
exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'newEggFlyTest',
    host: '47.95.205.217',
    port: '3306',
    username: 'newEggFlyTest',
    password: '123456',
    timezone: '+08:00' //东八时区
};

/* Redis */
exports.redis = {
    client: {
        host: "127.0.0.1", //安装好的redis服务器地址
        port: 6379, //端口
	    password:'qq5201314',    
        db: 0
    },
};

/*QQ互联*/
exports.qq = {
    client_id:'101459467',
    redirect_uri:'https://bbs.jczxw.cn/loginCallBack',
    client_secret:'fb76143eab136ad500a4b2daa80ac477',
}

/*自定义中间件 每次访问 延长Session */
exports.middleware = ['saveSession', 'imgCode'];



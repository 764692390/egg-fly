const moment = require('moment');
const config = require('../../config/config.default');
/*邮件 */
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

/*格式化时间戳*/
exports.FormatDate = (time,type) =>{
    //补零函数
    function toDub(n) {
        return n > 9 ? n : '0' + n;
    }
    if(type){
        if (time) {
            let oDate = new Date();
            oDate.setTime(time);
            let y = oDate.getFullYear();
            let m = oDate.getMonth() + 1;
            let d = oDate.getDate();
            let h = oDate.getHours();
            let mm = oDate.getMinutes();
            let s = oDate.getSeconds();
            return y + '/' + toDub(m) + '/' + toDub(d);
        }
    }else{
        if (time) {
            let oDate = new Date();
            oDate.setTime(time);
            let y = oDate.getFullYear();
            let m = oDate.getMonth() + 1;
            let d = oDate.getDate();
            let h = oDate.getHours();
            let mm = oDate.getMinutes();
            let s = oDate.getSeconds();
            return y + '-' + toDub(m) + '-' + toDub(d) + ' ' + toDub(h) + ':' + toDub(mm) + ':' + toDub(s);
        }
    }
};

/*格式化时间几条前几小时前 */
 exports.FormatDateText = time =>{
     //补零函数
    function toDub(n) {
        return n > 9 ? n : '0' + n;
    }
    if (time) {
        var n=new Date().getTime();
        var f=n-time;
        var bs=(f>=0?'前':'后');//判断时间点是在当前时间的 之前 还是 之后
        f=Math.abs(f);
        if(f<6e4){return '刚刚'}//小于60秒,刚刚
        if(f<36e5){return parseInt(f/6e4)+'分钟'+bs}//小于1小时,按分钟
        if(f<864e5){return parseInt(f/36e5)+'小时'+bs}//小于1天按小时
        if(f<2592e6){
            if(parseInt(f/864e5) < 7){
                return parseInt(f/864e5)+'天'+bs
            }else{
               return exports.FormatDate(time,true);
            }
        }
        return exports.FormatDate(time,true);
    }

 };

/*获取当前格式化后的时间*/
exports.GetDate = ()=>{
    const timer = this.FormatDate(new Date().getTime());
    return timer;
};

/*时间转换 */
exports.ToTimer = (str)=>{
    return str.replace(/T/,' ').replace('.000Z','')
}

/*MD5加密 */
exports.Md5 = data =>{
    let Buffer = require("buffer").Buffer;
    let buf = new Buffer(data);
    let str = buf.toString("binary");
    let crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
};

/*随机数*/
exports.Random = (m,n) =>{
   return Math.floor(Math.random()*(m-n)+n);
}

/* 用户授权 authorization */
exports.Authorization = (ctx) => {
    if (ctx.session.populated && ctx.session.user != undefined){
      return true;
    }else{
      ctx.redirect('/user/login');
      return false;
    };
};

/*发送邮件 userEmail,codeEmail  发给谁，验证码*/
exports.Mail = function(userEmail,codeEmail){
    let data = {
        userEmail:userEmail,
        title:'欢迎注册',
        html:'<div></div><h1 style="color: #153643;font-family: Arial, sans-serif;font-size: 24px;">欢迎注册</h1><p style="padding: 20px 0 30px 0;color: #153643;font-family: Arial, sans-serif;font-size: 16px;line-height: 20px;">欢迎注册Egg社区，你的验证码是：<span style="color:red">'+codeEmail+'</span></p></div>',
    };
    // 开启一个 SMTP 连接池
    let transport =  nodemailer.createTransport(smtpTransport({
        host: "smtp.mxhichina.com", // 主机
        secure: true, // 使用 SSL
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "Administrator@jczxw.cn", // 账号
            pass: "Qq13718439536" // 密码
        }
    }));
    // 设置邮件内容
    let mailOptions = {
        from: "Administrator<Administrator@jczxw.cn>", // 发件地址
        to: [data.userEmail], // 收件列表
        subject: data.title, // 标题
        html: data.html /* html 内容*/
    }
    // 发送邮件
    return new Promise(function(resolve, reject) {
        transport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log('邮件发送失败！')
                reject(error);
            } else {
                resolve(response);
            };
            transport.close(); // 如果没用，关闭连接池
        });
    })
}




/*内容转义 */
 exports.ContenToHtml = function(content){
    let CDN = config.BaseUrl.HOST; 
    function escape(html){
        return String(html||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }
    //表情转换
    let faces = {"[微笑]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif","[嘻嘻]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif","[哈哈]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif","[可爱]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif","[可怜]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif","[挖鼻]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif","[吃惊]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif","[害羞]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif","[挤眼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif","[闭嘴]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif","[鄙视]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif","[爱你]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif","[泪]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif","[偷笑]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif","[亲亲]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif","[生病]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif","[太开心]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif","[白眼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif","[右哼哼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif","[左哼哼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif","[嘘]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif","[衰]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif","[委屈]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif","[吐]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif","[哈欠]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif","[抱抱]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif","[怒]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif","[疑问]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif","[馋嘴]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif","[拜拜]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif","[思考]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif","[汗]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif","[困]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif","[睡]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif","[钱]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif","[失望]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif","[酷]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/cool_thumb.gif","[色]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif","[哼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif","[鼓掌]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif","[晕]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif","[悲伤]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif","[抓狂]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif","[黑线]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif","[阴险]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif","[怒骂]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif","[互粉]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif","[心]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif","[伤心]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif","[猪头]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/pig.gif","[熊猫]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/panda_thumb.gif","[兔子]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/81/rabbit_thumb.gif","[ok]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif","[耶]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif","[good]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif","[NO]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif","[赞]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif","[来]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif","[弱]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif","[草泥马]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/shenshou_thumb.gif","[神马]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/horse2_thumb.gif","[囧]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/j_thumb.gif","[浮云]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/fuyun_thumb.gif","[给力]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/geiliv2_thumb.gif","[围观]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_thumb.gif","[威武]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/vw_thumb.gif","[奥特曼]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/otm_thumb.gif","[礼物]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/liwu_thumb.gif","[钟]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d3/clock_thumb.gif","[话筒]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/huatongv2_thumb.gif","[蜡烛]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/lazhuv2_thumb.gif","[蛋糕]":"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/cakev2_thumb.gif"};
  
    //支持的html标签
    var html = function(end){
        return new RegExp('\\n*\\['+ (end||'') +'(pre|hr|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
    };
    content = escape(content||'') //XSS
    .replace(/img\[([^\s]+?)\]/g, function(img){  
        //转义图片
        return '<img src="'+CDN+ img.replace(/(^img\[)|(\]$)/g, '') + '">';
    }).replace(/@(\S+)(\s+?|$)/g, 
    //转义@
    '@<a href="javascript:;" class="fly-aite">$1</a>$2'
    ).replace(/face\[([^\s\[\]]+?)\]/g, function(face){  
        //转义表情
        var alt = face.replace(/^face/g, '');
        return '<img alt="'+ alt +'" title="'+ alt +'" src="' + faces[alt] + '">';
    }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ 
        //转义链接
        var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
        var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
        if(!href) return str;
        var rel =  /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
        return '<a href="'+ href +'" target="_blank"'+ (rel ? ' rel="nofollow"' : '') +'>'+ (text||href) +'</a>';
    }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
    .replace(/\n/g, '<br>') //转义换行  
    return content;
 }
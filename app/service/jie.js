const Service = require('egg').Service;

class JieService extends Service {
    /*获取ip */
    async getIp() {
        let ip;
        if (this.ctx.header['x-forwarded-for'] === undefined && this.ctx.header['x-real-ip'] === undefined) {
            ip = '127.0.0.1'
        } else {
            ip = await this.ctx.header['x-forwarded-for'].split(',')[0] || this.ctx.header['x-real-ip'];
        }
        console.log('---------------')
        console.log(ip)
        let res = await this.ctx.curl(`http://ip.taobao.com/service/getIpInfo.php`, {
            data: {
                ip: ip
            },
            dataType: 'json',
        });
        console.log(res)
        let json = {};
        if (res.data.code === 0) {
            json = {
                ip: ip,
                city: res.data.data.city,
                country: res.data.data.country,
                isp: res.data.data.isp
            };
        } else {
            json = {
                ip: "127.0.0.1",
                city: "本地",
                country: "本地",
                isp: "运营商"
            };
        }
        console.log(json)
        return json;
    }

    /*发表帖子*/
    async add(title,username,cla,content,openid,email,pic,recommend,stick,ip,city,country,authority,userstatu,vip,sign) {
        let addJIE = await this.ctx.model.Jie.addJie(title,username,cla,content,openid,email,pic,'1',recommend,stick,'0','0',ip,city,country,authority,userstatu,vip,sign);
        if (addJIE) {
            return {"success": true, "msg": "发表成功！"};
        } 
    };

    /*获取提问分页*/
    async page(index){
        let page = await this.ctx.model.Jie.findJie1(index);
        return  page;
    };

    /*获取公告分页*/
     async page2(index){
        let page = await this.ctx.model.Jie.findJie2(index);
        return  page;
    };

    /*获取帖子详情 */
    async findOneJieS(id){
        let data = await this.ctx.model.Jie.findOneJie(id);
        return  data;
    };

    /*更新帖子浏览量*/
    async upDateLook(id,n){
        this.ctx.model.Jie.upDateLook(id,n);
    }

    /*更新帖子回复数量*/
    async upDateRepat(id,n){
        this.ctx.model.Jie.upDateRepat(id,n);
    }

    /*查找当前用户发布的帖子分页 type=0 本站注册用户*/
    async findUserJie(index,rows,email){
        let data = this.ctx.model.Jie.findUserJie(index,rows,email);
        return data;
    }

    //查找当前用户发布的帖子分页 type=qq qq登录用户发帖
    async findUserQQJie(index,rows,openid){
        let data = this.ctx.model.Jie.findUserQQJie(index,rows,openid);
        return data;
    }

};

module.exports = JieService;
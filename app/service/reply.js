const Service = require('egg').Service;

class ReplyService extends Service {
    
    /*发表帖子*/
    async add(replyconten,username,openid,email,pic,ip,city,country,jieid,authority,userstatu,vip,sign) {
        let addReply = await this.ctx.model.Reply.addReply(replyconten,username,openid,email,pic,ip,city,country,jieid,authority,userstatu,vip,sign);
        if (addReply) {
            return {"success": true, "msg": "发表成功！"};
        } 
    };

    /*获取回复分页*/
    async page(index,jieid){
        let page = await this.ctx.model.Reply.findReply(index,jieid);
        return  page;
    };

     /*查找指定用户回复分页-用户类型0 本站注册*/
     async findUserReply(index,rows,email){
        let data = await this.ctx.model.Reply.findUserReply(index,rows,email);
        return data;
     }

     /* 查找指定用户回复分页-用户类型qq qq登录用户*/
     async findUserQQReply(index,rows,openid){
        let data = await this.ctx.model.Reply.findUserReply(index,rows,openid);
        return data;
     }
};

module.exports = ReplyService;
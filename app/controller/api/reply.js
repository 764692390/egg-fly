const BaseController = require("./base");

class ReplyController extends BaseController {
  /*帖子 回复一级*/
  async add() {
    //判断用户是否登录
    let Authorization = await this.IsAuth();
    if (!Authorization) {
      return false;
    }

    let replyconten = this.ctx.request.body.replyconten;
    let username = this.ctx.session.user.username;
    let openid = this.ctx.session.user.openid || "";
    let email = this.ctx.session.user.email || "";
    let pic = this.ctx.session.user.pic;
    let jieid = this.ctx.request.body.jieid;
    let authority = this.ctx.session.user.authority;
    let userstatu = this.ctx.session.user.statu;
    let vip = this.ctx.session.user.vip;
    let sign = this.ctx.session.user.sign;

    if (typeof replyconten != "undefined" && typeof jieid != "undefined") {
      let ip = await this.ctx.service.jie.getIp();
      let res = await this.ctx.service.reply.add(
        replyconten,
        username,
        openid,
        email,
        pic,
        ip.ip,
        ip.city,
        ip.country,
        jieid,
        authority,
        userstatu,
        vip,
        sign
      );

      if (res.success) {
        this.success(true, "发布成功!");
        
        //发布成功后更新用户的回帖数据
        let reply = await this.ctx.service.user.getReply(
          this.ctx.session.user.id
        );
        if (isNaN(reply.dataValues.reply)) {
          reply = 1;
        } else {
          reply = Math.floor(reply.dataValues.reply) + 1;
        }
        this.ctx.service.user.updataReply(this.ctx.session.user.id, reply);

      } else {
        this.success(false, res.msg);
      }
    } else {
      this.success(false, "缺少必填项！");
    }
  }

  // /* 分页 */
  // async page() {
  //   let index = this.ctx.params.index || 1;
  //   console.log('--------------------------------');
  //   console.log(index);
  //   let res = await this.ctx.service.reply.page(index);

  //   if(res){
  //     this.success(res,'获取成功!');
  //   }else{
  //     this.success(false,res.msg);
  //   };
  // }
}
module.exports = ReplyController;

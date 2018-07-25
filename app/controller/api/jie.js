const BaseController = require('./base');

class JieController extends BaseController {
  

    /*发布帖子*/
    async add() {
      //判断用户是否登录  
      let Authorization = await this.IsAuth();  
      
      let cla = this.ctx.request.body.class;
      let title = this.ctx.request.body.title;
      let vercode = this.ctx.request.body.vercode;
      let content = this.ctx.request.body.content;
      let openid =this.ctx.session.user.openid || '';
      let email = this.ctx.session.user.email || '';
      let pic = this.ctx.session.user.pic ;
      let username = this.ctx.session.user.username;
      let authority = this.ctx.session.user.authority;
      let userstatu = this.ctx.session.user.statu;
      let vip =this.ctx.session.user.vip;
      let sign=this.ctx.session.user.sign;
      let recommend,stick;
      

      if(this.ctx.session.code != vercode){
        this.success(false,'验证码有误!');
      }else if(typeof cla != 'undefined' &&  cla == 1  && this.ctx.session.user.authority != 1 ){
        this.success(false,'当前用户权限不足!');
      }else if( typeof title != 'undefined' && typeof  content != 'undefined' && typeof cla != 'undefined' ){
        let ip = await this.ctx.service.jie.getIp();

        if(cla == 1){
            recommend = '1';
            stick = '1';
        }else{
            recommend = '0';
            stick = '0';
        }
        let res = await this.ctx.service.jie.add(title,username,cla,content,openid,email,pic,recommend,stick,ip.ip,ip.city,ip.country,authority,userstatu,vip,sign);

        if(res.success){
          this.success(true,'发布成功!');
        }else{
          this.success(false,res.msg);
        };
      }else{
        this.success(false,'缺少必填项！');
      };
    };

    /* 分页 */
    async page() {
      let index = this.ctx.params.index || 1;
      //let index = this.ctx.request.body.index || 1;
      let res = await this.ctx.service.jie.page(index);
      if(res){
        this.success(res,'获取成功!');
      }else{
        this.success(false,res.msg);
      };
    }

};
module.exports = JieController;
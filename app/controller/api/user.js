const BaseController = require('./base');

class UserController extends BaseController {
    /*登录*/
    async login() {
      let email = this.ctx.request.body.email;
      let pass = this.ctx.request.body.pass;
      let vercode = this.ctx.request.body.vercode;

      if(this.ctx.session.code != vercode){
        this.success(false,'验证码有误!');
      }else if( typeof email != 'undefined' && typeof  pass != 'undefined'){
        let res = await this.ctx.service.user.login(email,pass);
        if(res.success){
          this.success(true,'登录成功!');
        }else{
          this.success(false,res.msg);
        };
      }else{
        this.success(false,'缺少必填项！');
      };
    };

    /*注册*/
    async reg() {
      let email = this.ctx.request.body.email;
      let username = this.ctx.request.body.username;
      let pass = this.ctx.request.body.pass;
      let repass = this.ctx.request.body.repass;
      let vercode = this.ctx.request.body.vercode;

      if(pass != repass){
        this.success(false,'两次密码不一致!');
      }else if(this.ctx.session.code != vercode){
        this.success(false,'验证码有误!');
      }else if( typeof email != 'undefined' && typeof username != 'undefined' && typeof  pass != 'undefined' && typeof  repass != 'undefined' ){
        let res = await this.ctx.service.user.reg(email,username,pass);
        if(res){
          this.success(res,'注册成功!');
        }else{
          this.success(false,'用户名已存在!');
        }
      }else{
        this.success(false,'缺少必填项！');
      };
    };
};
module.exports = UserController;
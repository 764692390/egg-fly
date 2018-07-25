<ul class="layui-nav layui-nav-tree layui-inline" lay-filter="user">
  <li class="layui-nav-item">
    <a href="/user/home">
      <i class="layui-icon">&#xe609;</i>
      我的主页
    </a>
  </li>
  {# <li class="layui-nav-item">
    <a href="/user/">
      <i class="layui-icon">&#xe612;</i>
      用户中心
    </a>
  </li> #}
  <li class="layui-nav-item {% if lay.base.active == 'set' %}layui-this{% endif %}">
    <a href="/user/set/">
      <i class="layui-icon">&#xe620;</i>
      基本设置
    </a>
  </li>
  <li class="layui-nav-item {% if lay.base.active == 'message' %}layui-this{% endif %}">
    <a href="/user/message/">
      <i class="layui-icon">&#xe611;</i>
      我的消息
    </a>
  </li>
  <!--{% if user.vip != '0' %}-->
  <!--<li class="layui-nav-item">-->
    <!--<a href="/auth/get/">-->
      <!--<i class="layui-icon">&#xe61e;</i>-->
      <!--产品授权-->
    <!--</a>-->
  <!--</li>-->
  <!--<li class="layui-nav-item">-->
    <!--<a href="/cooperation/">-->
      <!--<i class="layui-icon">&#xe629;</i>-->
      <!--合作平台-->
    <!--</a>-->
  <!--</li>-->
  <!--{% endif %}-->
</ul>

<div class="site-tree-mobile layui-hide">
  <i class="layui-icon">&#xe602;</i>
</div>
<div class="site-mobile-shade"></div>
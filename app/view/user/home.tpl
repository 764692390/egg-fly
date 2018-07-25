<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="{{ lay.base.keywords }}">
<meta name="description" content="{{ lay.base.description }}">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>{{ lay.base.title }}</title>
{% include '../common/link.tpl' %}
</head>
<body class="fly-full">
{% include '../common/header.tpl' %}
<div class="fly-home fly-panel" style="background-image: url();">
  {% if user.type == 'qq'%}
      <img src="{{ user.pic }}" title="{{ user.username }}">
  {% else %}
    <img src="{{  BaseUrl.CDN }}{{ user.pic }}" title="{{ user.username }}">
  {% endif %}
  {% if user.vip > 0 %}
    <i class="iconfont icon-renzheng" title="Fly社区认证"></i>
  {% endif %}
  <h1>
    {{user.username}} 
    <i class="iconfont icon-nan"></i> 
    {% if user.vip > 0 %}
      <i class="layui-badge fly-badge-vip">VIP{{ user.vip }}</i>
    {% endif %}
    {% if user.authority == 1%}
      <span style="color:#c00;">（管理员）</span>
    {% endif %}  
    {% if user.authority == 0 %}
      <span style="color:#5FB878;">（社区之光）</span>
    {% endif %}  
    {% if user.authority == -1 %}
      <span>（该号已被封）</span>
    {% endif %}
  </h1>
  {# {{# if(info.approve){ }}
    <p style="padding: 10px 0; color: #5FB878;">认证信息：{{ info.approve }}</p>
  {{# } }} #}
  <p class="fly-home-info">
    <i class="iconfont icon-shijian"></i><span>{{ helper.ToTimer(user.created_at)}} 加入</span>
    <i class="iconfont icon-chengshi"></i><span>来自中国 某城</span>
  </p>
  <p class="fly-home-sign">（{{ user.sign }}）</p>
  <div class="fly-sns">
    <a href="javascript:;" class="layui-btn layui-btn-primary fly-imActive" data-type="addFriend">加为好友</a>
    <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>
  </div>
</div>
<div class="layui-container">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md6 fly-home-jie">
      <div class="fly-panel">
        <h3 class="fly-panel-title">{{ user.username }} 最近的提问</h3>
        <ul class="jie-row">
        {% for item in lay.jie.rows %}
          <li>
            <a href="/jie/{{item.id}}" class="jie-title">{{item.title}}</a>
            <i>{{ helper.FormatDateText(item.created_at.getTime()) }}</i>
            <em class="layui-hide-xs">{{item.look}}阅/{{item.repat}}答</em>
          </li>
        {% endfor %}
        {% if lay.jie.rows.length == 0 %}
        <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div>
        {% endif %}
        </ul>
      </div>
    </div>
    <div class="layui-col-md6 fly-home-da">
      <div class="fly-panel">
        <h3 class="fly-panel-title">{{user.username}} 最近的回答</h3>
        <ul class="home-jieda">
        {% for item in lay.reply.rows %}
        <li>
          <p>
          <span>{{ helper.FormatDateText(item.created_at.getTime()) }}</span>
          <a href="/jie/{{item.jieid}}/" target="_blank">{{item.username}}</a>回答：
          </p>
          <div class="home-dacontent"> {{ helper.ContenToHtml(item.replyconten) | safe }}</div>
        </li>
        {% endfor %}
        {% if lay.reply.rows.length == 0 %}
        <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div>
        {% endif %}
        </ul>
      </div>
    </div>
  </div>
</div>
{% include '../common/footer.tpl' %}
</body>
</html>
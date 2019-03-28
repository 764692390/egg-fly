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
{% include 'common/link.tpl' %}
</head>
<body>
{% include 'common/header.tpl' %}
{% include 'common/column.tpl' %}
<div class="layui-container">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      {% set jie = 'lizhi' %}
      {% if lay.base.clas != 1 %}
      <div class="fly-panel">
        <div class="fly-panel-title fly-filter">
          <a>置顶</a>
          <!--<a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>-->
        </div>
        <ul class="fly-list">
            {% for item in pages3.rows %}     
            <li>
              <a href="javascript:;" class="fly-avatar">
                {% if item.email %}
                  <img src="{{ BaseUrl.CDN }}{{ item.pic }}"> 
                {% else %}
                  <img src="{{ item.pic }}"> 
                {% endif %}
              </a> 
              <h2> 
                {% if item.clas == 0  %}
                <a class="layui-badge">提问</a>
                {% else %}
                <a class="layui-badge" style="color: #FF5722;border-color: #FF5722;">公告</a>
                {% endif %}
                <a href="/jie/{{ item.id }}/">{{ item.title }}</a>
              </h2> 
              <div class="fly-list-info"> 
                <a href="" link="">
                 <cite>{{ item.username }}</cite>
                 {% if item.vip > 0 %}
                   <i class="iconfont icon-renzheng layui-hide-xs"></i>
                   <i class="layui-badge fly-badge-vip layui-hide-xs">VIP{{item.vip}}</i>
                 {% endif %}
                </a> 
                <span>{{ helper.FormatDateText(item.created_at.getTime()) }}</span> 
                <span class="fly-list-nums"> <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.repat }}  <i class="iconfont" title="浏览量">&#xe60b;</i> {{ item.look }}</span> 
              </div> 
             <div class="fly-list-badge">
                {% if item.recommend == 1 %}
                  <span class="layui-badge layui-bg-red">精帖</span> 
                {% endif %}

                {% if item.stick == 1 %}
                   <span class="layui-badge layui-bg-black">置顶</span> 
                {% endif %}
              </div>
            </li>
          {% endfor %}   
        </ul>
      </div>
      {% endif %}
      <div class="fly-panel" style="margin-bottom: 0;">
        {# {{ include common/filter }} #}
        <ul class="fly-list">  
          {% for item in pages.rows %}     
            <li>
              <a href="javascript:;" class="fly-avatar">
                {% if item.email %}
                  <img src="{{ BaseUrl.CDN }}{{ item.pic }}"> 
                {% else %}
                  <img src="{{ item.pic }}"> 
                {% endif %}
              </a> 
              <h2> 
                {% if item.clas == 0  %}
                <a class="layui-badge">提问</a>
                {% else %}
                <a class="layui-badge" style="color: #FF5722;border-color: #FF5722;">公告</a>
                {% endif %}

                <a href="/jie/{{ item.id }}/">{{ item.title }}</a>
              </h2> 
              <div class="fly-list-info"> 
                <a href="" link="">
                 <cite>{{ item.username }}</cite>
                 {% if item.vip > 0 %}
                    <i class="iconfont icon-renzheng layui-hide-xs"></i>
                    <i class="layui-badge fly-badge-vip layui-hide-xs">VIP{{item.vip}}</i>
                 {% endif %}
                </a> 
                <span>{{ helper.FormatDateText(item.created_at.getTime()) }}</span> 
                <span class="fly-list-nums"> <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.repat }} <i class="iconfont" title="浏览量">&#xe60b;</i> {{ item.look }}</span> 
              </div> 
              <div class="fly-list-badge">
                {% if item.recommend == 1 %}
                  <span class="layui-badge layui-bg-red">精帖</span> 
                {% endif %}

                {% if item.stick == 1 %}
                   <span class="layui-badge layui-bg-black">置顶</span> 
                {% endif %}
              </div>
            </li>
          {% endfor %}   
          {# {{# jie.forEach(function(item, index){ 
            var jie_user = item.user || {};
            if(item.stick == 0){
          }}
            {{ include common/list }}
          {{# }; }); }} #}
        </ul>
        {% if pages.count > 20 %}     
        <div style="text-align: center">
          <div class="laypage-main">
          {% if lay.base.clas != 1 %}
            <a href="/column/all/page/2/" class="laypage-next">更多求解</a>
          {% else %}  
            <a href="/column/notice/page/2/" class="laypage-next">更多求解</a>
          {% endif %}
          </div>
        </div>
        {% endif %}

      </div>
    </div>
    <div class="layui-col-md4">
      {% include 'common/list-static.tpl' %}
      {# <div class="fly-panel fly-signin">
        <div class="fly-panel-title">
          签到
          <i class="fly-mid"></i> 
          <a href="javascript:;" class="fly-link" id="LAY_signinHelp">说明</a>
          <i class="fly-mid"></i> 
          <a href="javascript:;" class="fly-link" id="LAY_signinTop">活跃榜<span class="layui-badge-dot"></span></a>
          <span class="fly-signin-days"></span>
        </div>
        <div class="fly-panel-main fly-signin-main">
          {% if user.id %}
          <i class="layui-icon fly-loading">&#xe63d;</i>
          {% else %}
            <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
          {% endif%}
        </div>
      </div> #}
      {# {{ include ad/all }} #}
      <div class="fly-panel fly-rank fly-rank-reply" id="LAY_replyRank">
        <h3 class="fly-panel-title">回贴榜</h3>
        <dl>
          {% for item in hotReply.rows %}
          <dd>
            <a href="javascript:;">
              {% if item.type === '0' %}
                <img src="{{ BaseUrl.CDN }}{{item.pic}}">
              {% else %}
                <img src="{{item.pic}}">
              {%endif%}
              <cite>{{item.username}}</cite>
              <i>{{item.reply+'次回答'}}</i>
            </a>
          </dd>
          {% endfor %}
        </dl>
      </div>
      {% include "common/list-hot.tpl" %}
      {# {{ include ad/ours }} #}
      {# <div class="fly-panel" style="padding: 20px 0; text-align: center;">
        <img src="{{BaseUrl.CDN}}/images/weixin.jpg" style="max-width: 100%;" alt="layui">
        <p style="position: relative; color: #666;">微信扫码关注 layui 公众号</p>
      </div> #}
      <div class="fly-panel fly-link">
        <h3 class="fly-panel-title">友情链接</h3>
        <dl class="fly-panel-main">
          <dd><a href="http://layim.layui.com/" target="_blank">WebIM</a><dd>
          <dd><a href="mailto:Administrator@jczxw.cn?subject=申请Egg社区友链" class="fly-link">申请友链</a><dd>
        </dl>
      </div>
    </div>
  </div>
</div>
{% include 'common/footer.tpl' %}
</body>
</html>
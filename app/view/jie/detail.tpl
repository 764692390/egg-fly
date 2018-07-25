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
<body>
{% include '../common/header.tpl' %}
<div class="layui-hide-xs">
  {% include '../common/column.tpl' %}
</div>
<div class="layui-container">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md12 content detail">
      <div class="fly-panel detail-box">
        <h1>{{ rows.title }}</h1>
        <div class="fly-detail-info" style="height:20px;">
          {% if rows.clas == 1 %}
            <span class="layui-badge" style="background-color: #FF5722;color: #fff;">公告</span>
          {% else %}
            <span class="layui-badge" style="background-color: #5FB878;">提问</span>
          {% endif %}
          {% if rows.stick > 0 %}
            <span class="layui-badge layui-bg-black">置顶</span>
          {% endif %}
          {% if rows.recommend > 0 %}
            <span class="layui-badge layui-bg-black">精帖</span>
          {% endif %}
          <span class="fly-list-nums"> 
            <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{ rows.repat}}</a>
            <i class="iconfont" title="人气">&#xe60b;</i> {{ rows.look }}
          </span>
        </div>
        <div class="detail-about">
          <a class="fly-avatar" href="javascript:;">
            {% if rows.openid %}
              <img src="{{ rows.pic }}" alt="">
            {% else %}
              <img src="{{ BaseUrl.CDN }}{{ rows.pic }}" alt="">
            {% endif %}
          </a>
          <div class="fly-detail-user">
            <a href="javascript:;" class="fly-link">
              <cite>{{rows.username}}</cite>
              {% if rows.vip > 0 %}
                <i class="iconfont icon-renzheng layui-hide-xs"></i>
                <i class="layui-badge fly-badge-vip layui-hide-xs">VIP{{rows.vip}}</i>
              {% endif %}
            </a>
            <span>{{ helper.FormatDateText(rows.created_at.getTime()) }}</span>
          </div>
          <div class="detail-hits cl" id="LAY_jieAdmin" data-id="{{rows.id}}">
              <span style="padding-right: 10px; color: #FF7200">来自：{{rows.city}}</span>
              {% if rows.isUserJie == 1%}
              <span class="layui-btn layui-btn-xs jie-admin fr" type="edit"><a href="javascript:;">收藏</a></span>
              {% endif %}
              {% if rows.isUserJie == 2%}
              <span class="layui-btn layui-btn-xs jie-admin fr" type="edit"><a href="javascript:;">编辑此贴</a></span>
              {% endif %}
          </div>
        </div>
        <div class="detail-body photos">
          <div class="detail-body"  id="detail-body" style="margin:20px 0;">
             {{ helper.ContenToHtml(rows.content) | safe }} 
          </div>
        </div>
      </div>
      {# {{# var jieda = rows.jieda; }} #}
      <div class="fly-panel detail-box" id="flyReply">
        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
          <legend>回帖</legend>
        </fieldset>
        <ul class="jieda" id="jieda">
          {% for item in page.rows %}
          <li data-id="{{item.id}}">
            <a name="item-{{item.time}}"></a>
            <div class="detail-about detail-about-reply" style="padding-left: 66px;">
              <a class="fly-avatar" href="javascript:;">
                {%  if item.email %}
                    <img src="{{BaseUrl.CDN}}{{item.pic}}" alt="{{item.username}}">
                {%  endif %}
                {%  if item.openid  %}
                     <img src="{{item.pic}}" alt="{{item.username}}">
                {%  endif %}
              </a>
              <div class="fly-detail-user">
                <a href="javascript:;" class="fly-link">
                  <cite>{{item.username}}</cite>
                  {% if item.vip > 0 %}
                      <i class="iconfont icon-renzheng layui-hide-xs"></i>
                      <i class="layui-badge fly-badge-vip layui-hide-xs">VIP{{item.vip}}</i>
                  {% endif %}
                </a>
                <span>{{ helper.FormatDateText(item.created_at.getTime()) }}</span>
                <span class="fr">第{{ (lay.base.index-1)*20+loop.index}}楼</span>
              </div>
              <div class="detail-hits">
                <span style="padding-right: 10px; color: #FF7200">来自：{{ item.city}}</span>
              </div>
            </div>
            <div class="detail-body jieda-body photos">
               {{ helper.ContenToHtml(item.replyconten) | safe }} 
            </div>
            <div class="jieda-reply">
            <span class="jieda-zan" type="zan">
              <i class="iconfont icon-zan"></i>
              <em>0</em>
            </span>
            <span type="reply">
              <i class="iconfont icon-svgmoban53"></i>
              回复
            </span>
            </div>
          </li>
        {% else %}  
          <li class="fly-none">消灭零回复</li>
        {% endfor %}
        </ul>
        {% if lay.base.isPage %}
        <div style="text-align: center">
           <div id="page-box" data-url="/jie/{{ lay.base.jieid }}/page/" style="border-top: 1px dotted #e2e2e2; text-align: center;padding: 10px 0;"></div>
        </div>
        {% else %}
          <div style="text-align: center">
          {% if  page.count>20 %}
            <div class="laypage-main">
              <a href="/jie/{{ lay.base.jieid }}/page/2/" class="laypage-next">更多求解</a>
            </div>
          {% endif %}  
          </div>
        {% endif %}
        <div class="layui-form layui-form-pane">
          <form action="/jie/reply/" method="post">
            <div class="layui-form-item layui-form-text">
              <a name="comment"></a>
              <div class="layui-input-block">
                <input name="jieid" type="hidden" value="{{ lay.base.jieid }}">
                <textarea id="L_content" name="replyconten" required lay-verify="required" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
              </div>
            </div>
            <div class="layui-form-item">
              <input type="hidden" name="jid" value="{{rows.id}}">
              <input type="hidden" name="daPages" value="{{rows.jieda.pages}}">
              <button class="layui-btn" lay-filter="*" lay-submit>提交回复</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  if({{page.count}} > 0 && {{lay.base.isPage}} ){
    window.PageCount = '{{ page.count }}' ; //总共数量
    window.PageIndes = '{{ lay.base.index }}' ;//当前页
    window.PageLength = Math.ceil(window.PageCount/20) ; //一共多少页
  }
</script>
{% include '../common/footer.tpl' %}
</body>
</html>
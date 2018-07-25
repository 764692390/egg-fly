<div class="fly-panel fly-column">
  <div class="layui-container">
    <ul class="layui-clear">
      <li class="layui-hide-xs  {% if lay.base.clas == 0 %}layui-this{% endif %}"><a href="/">提问</a></li>
      <li class="layui-hide-xs {% if lay.base.clas == 1 %}layui-this{% endif %}"><a href="/column/notice/">公告</a></li>
      {% if user.id %}
      <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
      <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="/user/">我发表的贴</a></li>
      <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="/user/#collection">我收藏的贴</a></li>
      {% endif %}
    </ul>

    <div class="fly-column-right layui-hide-xs">
    	<span class="fly-search"><i class="layui-icon">&#xe615;</i></span>
    	<a href="/jie/add/page" class="layui-btn">发表新帖</a>
    </div>

    <div class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
    	<a href="/jie/add/page" class="layui-btn">发表新帖</a>
    </div>

  </div>
</div>
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
{% include '../common/column.tpl' %}

<div class="layui-container">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md12">
      <div class="fly-panel" style="margin-bottom: 0;">
       
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
          {% else %} 
           <div class="fly-none">没有相关数据</div>
          {% endfor %}   
        </ul>

        {# {{# if(jie.length === 0){ }}
          <div class="fly-none">没有相关数据</div>
        {{# } else { }}
          <div style="border-top: 1px dotted #e2e2e2; text-align: center;">
            {{ d.laypage }}
          </div>
        {{# } }} #}
        {# {{ lay.base.index page.count }} #}

        
        <div id="page-box" data-url="/column/all/page/" style="border-top: 1px dotted #e2e2e2; text-align: center;padding: 10px 0;">
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  if({{pages.count}} > 0 ){
    window.PageCount = {{ pages.count }}; //总共数量
    window.PageIndes = {{ lay.base.index }};//当前页
    window.PageLength = Math.ceil(window.PageCount/20); //一共多少页
  }
</script>
{% include '../common/footer.tpl' %}

</body>
</html>
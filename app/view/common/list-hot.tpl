<dl class="fly-panel fly-list-one">
  <dt class="fly-panel-title">本周热议</dt>
  {% if hotPage.count > 0 %}
    {% for item in  hotPage.rows %}
    <dd>
      <a href="/jie/{{item.id}}/">{{ item.title }}</a>
      <span><i class="iconfont icon-pinglun1"></i> {{item.repat}}</span>
    </dd>
    {% endfor %}
  {% else %}
    <div class="fly-none">没有相关数据</div>
  {% endif %}
</dl>
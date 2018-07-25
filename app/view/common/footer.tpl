
<div class="fly-footer">
  <p><a href="https://bbs.jczxw.cn/">Egg社区</a> 2018 &copy; <a href="https://bbs.jczxw.cn/">bbs.jczxw.cn</a></p>
  <p class="fly-union"> 
    <a href="https://www.upyun.com?from=jczxw" target="_blank" rel="nofollow" upyun=""><img src="{{ BaseUrl.CDN }}/images/other/upyun.png?t=1"></a>
    <span>提供 CDN 赞助</span> 
  </p>
</div>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d14392f476809ccfde754846c33eb6b9";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>


<script src="{{ BaseUrl.CDN }}/layui/layui.js?t={{lay.version}}"></script>

<script>
{% if lay.base.page %}
layui.cache.page = '{{ lay.base.page}}';
{% else %}
layui.cache.page = '';
{% endif %}

{# layui.cache.user = {
  username: '游客'
  ,uid: -1
  ,avatar: '{{ BaseUrl.CDN }}/images/avatar/00.jpg'
  ,experience: 83
  ,sex: '男'
}; #}

layui.config({
  version: "{{lay.version}}",
  base: '/public/mods/',
}).extend({
  'fly': 'index'
}).use('fly'); 
</script>

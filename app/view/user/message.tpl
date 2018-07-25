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

<div class="layui-container fly-marginTop fly-user-main">

  {% include '../common/user-nav.tpl' %}

  <div class="fly-panel fly-panel-user" pad20>
	  <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
	    <button class="layui-btn layui-btn-danger layui-hide" id="LAY_delallmsg">清空全部消息</button>
	    <div id="LAY_minemsg" style="margin-top: 10px;"></div>
	  </div>
	</div>

</div>

{% include '../common/footer.tpl' %}

</body>
</html>
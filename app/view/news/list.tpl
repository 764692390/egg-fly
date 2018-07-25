<html>
  <head>
    <title></title>
  </head>
  <body>
    <div>{{ BaseUrl.HOST }}</div>
    <div>{{ user }}</div>
    <div class="news-view view">
      {% for item in list %}
        <div class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
          <span>{{ helper.FormatDate(item.addtime)}}</span>
          <div>
            {{ item.content | safe }}
          </div>
        </div>
      {% endfor %}
    </div>
    
  </body>
</html>
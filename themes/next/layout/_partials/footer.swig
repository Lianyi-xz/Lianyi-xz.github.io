<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
     <div id="bottomheart" style="cursor:pointer;"><i class="fa fa-{{ theme.authoricon }}"></i></div>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
</div>

{% if theme.copyright %}
<div class="powered-by">
  <a class="theme-link" rel="external nofollow" target="_blank" href="https://beian.miit.gov.cn">苏ICP备18010133号-1</a>
</div>
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" rel="external nofollow" href="https://hexo.io">Hexo</a>') }}
</div>

<div class="theme-info">
  本网站支持IPv6网络
</div>
{% endif %}

<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>

// build time:Thu Jan 07 2021 09:43:53 GMT+0800 (GMT+08:00)
NexT.utils=NexT.$u={wrapImageWithFancyBox:function(){$(".content img").not("[hidden]").not(".group-picture img, .post-gallery img").each(function(){var i=$(this);var e=i.attr("title");var t=i.parent("a");if(t.size()<1){var a=i.attr("data-original")?this.getAttribute("data-original"):this.getAttribute("src");t=i.wrap('<a href="'+a+'"></a>').parent("a")}t.addClass("fancybox fancybox.image");t.attr("rel","group");if(e){t.append('<p class="image-caption">'+e+"</p>");t.attr("title",e)}});$(".fancybox").fancybox({helpers:{overlay:{locked:false}}})},lazyLoadPostsImages:function(){$("#posts").find("img").lazyload({effect:"fadeIn",threshold:0})},registerTabsTag:function(){var i=".tabs ul.nav-tabs ";$(function(){$(window).bind("hashchange",function(){var e=location.hash;if(e!==""){$(i+'li:has(a[href="'+e+'"])').addClass("active").siblings().removeClass("active");$(e).addClass("active").siblings().removeClass("active")}}).trigger("hashchange")});$(i+".tab").on("click",function(i){i.preventDefault();if(!$(this).hasClass("active")){$(this).addClass("active").siblings().removeClass("active");var e=$(this).find("a").attr("href");$(e).addClass("active").siblings().removeClass("active");if(location.hash!==""){history.pushState("",document.title,window.location.pathname+window.location.search)}}})},registerESCKeyEvent:function(){$(document).on("keyup",function(i){var e=i.which===27&&$(".search-popup").is(":visible");if(e){$(".search-popup").hide();$(".search-popup-overlay").remove();$("body").css("overflow","")}})},registerBackToTop:function(){var i=50;var e=$(".back-to-top");$(window).on("scroll",function(){e.toggleClass("back-to-top-on",window.pageYOffset>i);var t=$(window).scrollTop();var a=$("#content").height();var n=$(window).height();var s=a>n?a-n:$(document).height()-n;var o=t/s;var r=Math.round(o*100);var c=r>100?100:r;$("#scrollpercent>span").html(c)});e.on("click",function(){$("body").velocity("scroll")})},embeddedVideoTransformer:function(){var i=$("iframe");var e=["www.youtube.com","player.vimeo.com","player.youku.com","music.163.com","www.tudou.com"];var t=new RegExp(e.join("|"));i.each(function(){var i=this;var e=$(this);var s=a(e);var o;if(this.src.search(t)>0){var r=n(s.width,s.height);e.width("100%").height("100%").css({position:"absolute",top:"0",left:"0"});var c=document.createElement("div");c.className="fluid-vids";c.style.position="relative";c.style.marginBottom="20px";c.style.width="100%";c.style.paddingTop=r+"%";c.style.paddingTop===""&&(c.style.paddingTop="50%");var h=i.parentNode;h.insertBefore(c,i);c.appendChild(i);if(this.src.search("music.163.com")>0){o=a(e);var l=o.width>s.width||o.height<s.height;if(l){c.style.paddingTop=n(o.width,s.height)+"%"}}}});function a(i){return{width:i.width(),height:i.height()}}function n(i,e){return e/i*100}},addActiveClassToMenuItem:function(){var i=window.location.pathname;i=i==="/"?i:i.substring(0,i.length-1);$('.menu-item a[href^="'+i+'"]:first').parent().addClass("menu-item-active")},hasMobileUA:function(){var i=window.navigator;var e=i.userAgent;var t=/iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;return t.test(e)},isTablet:function(){return window.screen.width<992&&window.screen.width>767&&this.hasMobileUA()},isMobile:function(){return window.screen.width<767&&this.hasMobileUA()},isDesktop:function(){return!this.isTablet()&&!this.isMobile()},escapeSelector:function(i){return i.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,"\\$&")},displaySidebar:function(){if(!this.isDesktop()||this.isPisces()||this.isGemini()){return}$(".sidebar-toggle").trigger("click")},isMist:function(){return CONFIG.scheme==="Mist"},isPisces:function(){return CONFIG.scheme==="Pisces"},isGemini:function(){return CONFIG.scheme==="Gemini"},getScrollbarWidth:function(){var i=$("<div />").addClass("scrollbar-measure").prependTo("body");var e=i[0];var t=e.offsetWidth-e.clientWidth;i.remove();return t},needAffix:function(){return this.isPisces()||this.isGemini()}};
//rebuild by neat 
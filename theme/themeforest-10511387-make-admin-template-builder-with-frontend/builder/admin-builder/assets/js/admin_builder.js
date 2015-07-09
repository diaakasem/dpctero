var adminBuilder = true;
var doc = document;
var docEl = document.documentElement;
var $body = $('body');
var $sidebar = $('.sidebar');
var $sidebarTop = $('.sidebar .sidebar-inner .sidebar-top');
var $sidebarWidget = $('.sidebar .sidebar-inner .sidebar-widgets');
var $sidebarFooter = $('.sidebar .sidebar-footer');
var $mainContent = $('.main-content');
var $pageContent = $('.page-content');
var $topbar = $('.topbar');
var $logopanel = $('.logopanel');
var $adminBuilder = $('.admin-builder');
var $sidebarWidth = $(".sidebar").width();
var is_RTL = false; 
$loader = $('#preloader');
var docHeight = $(document).height();
var windowHeight = $(window).height();
var sidebarLayout = null;
var topbarLayout = null;
var sidebarIsFixed = false;

$(function() {

  /* Reset All Style */
  resetStyle();
  $.removeCookie('submenu-hover', { path: '/' });
  $.removeCookie('submenu-hover');
  $('body').removeClass('submenu-hover');
  disableRTL();


  destroySideScroll();
  $('body').removeClass (function (index, css) {
      return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
  });
  $('body').removeClass (function (index, css) {
      return (css.match (/(^|\s)theme-\S+/g) || []).join(' ');
  });
  $('body').removeClass (function (index, css) {
      return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
  });
  $('body').addClass('theme-sdtl').addClass('color-default');


  var tl = new TimelineLite();
  $topbar.css('margin-top' , '-50px');
  $sidebar.css('margin-left' , '-240px');
  $sidebarFooter.css('left' , '-240px');
  $logopanel.css('left' , '-240px');
  $mainContent.css('margin-left' , 0);
  $('.page-content, .topbar').css('opacity' , 0);
  tl.to($('.step-sidebar'), 0.4, {css: {scaleX:1,scaleY:1, height:'auto',autoAlpha:1},ease: Sine.easeInOut}, "step1+=0.5");

  /**** SIDEBAR SIDE: LEFT ****/
  $('.sidebar-side .left').on('click', function(){
      tl.to($('.sidebar-side .left'), 0.4, {css: {background:  '#D7DCDF'},ease: Circ.easeInOut}, "sidebar+=0")
      .to($('.sidebar-side .right'), 0, {css: {opacity: 0,display:'none'},ease: Circ.easeInOut}, "sidebar+=0")
      .to($('.sidebar-side .left p'), 0.4, {css: {opacity: 0},ease: Circ.easeInOut}, "sidebar+=0.2")
      .to($('.sidebar-side .right p'), 0.4, {css: {opacity: 0},ease: Circ.easeInOut}, "sidebar+=0.2")
      .to($('.sidebar-side .left'), 0.4, {css: {width:  240},ease: Circ.easeInOut}, "sidebar+=0.4")
      .to($('.step-sidebar-side'), 0.3, {css: {autoAlpha:  0},ease: Circ.easeInOut}, "sidebar+=0.6")
      .to($('.sidebar-builder'), 0, {css: {display: 'block'},ease: Circ.easeInOut}, "sidebar+=0.8")
      .to($('.sidebar-side'), 0.4, {css: {display: 'none'},ease: Circ.easeInOut}, "sidebar+=1.0")
      .to($('.step-sidebar-side'), 0, {css: {display:  "none"},ease: Circ.easeInOut}, "sidebar+=1")
      .to($('.step-sidebar-style'), 0.4, {css: {autoAlpha:  1,display:"block", scaleX:1,scaleY:1},ease: Circ.easeInOut}, "sidebar+=1.2")
      .to($('.s1'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.ip-header .ip-logo svg'), 0.4, {css: {left:  190},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.admin-builder > div, .admin-builder h1'), 0.4, {css: {marginLeft:  240},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.s2'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=1.8")
      .to($('.s3'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=2.1");
  });

/**** SIDEBAR SIDE: IGHT ****/
  $('.sidebar-side .right').on('click', function(){
    is_RTL = true;
    $body.addClass('rtl');
    $('html').addClass('rtl');
    $sidebar.css('margin-left' , '').css('margin-right', -240);
    $sidebarFooter.css('left' , '').css('right', -240);
    $logopanel.css('left' , '').css('right', -240);
    $mainContent.css('margin-left' , '').css('margin-right' , 0);
    $('.sidebar-side .left').css('border-right', 'none');
    $('.sidebar-side .right').css('border-left', '2px dashed #fff');
      tl.to($('.sidebar-side .right'), 0.4, {css: {background:  '#D7DCDF'},ease: Circ.easeInOut}, "sidebar+=0")
      .to($('.sidebar-side .left'), 0, {css: {opacity: 0,display:'none'},ease: Circ.easeInOut}, "sidebar+=0")
      .to($('.sidebar-side .right p'), 0.4, {css: {opacity: 0},ease: Circ.easeInOut}, "sidebar+=0.2")
      .to($('.sidebar-side .left p'), 0.4, {css: {opacity: 0},ease: Circ.easeInOut}, "sidebar+=0.2")
      .to($('.sidebar-side .right'), 0.4, {css: {width:  240},ease: Circ.easeInOut}, "sidebar+=0.4")
      .to($('.step-sidebar-side'), 0.3, {css: {autoAlpha:  0},ease: Circ.easeInOut}, "sidebar+=0.6")
      .to($('.sidebar-builder'), 0, {css: {display: 'block'},ease: Circ.easeInOut}, "sidebar+=0.8")
      .to($('.sidebar-side'), 0.4, {css: {display: 'none'},ease: Circ.easeInOut}, "sidebar+=1.0")
      .to($('.step-sidebar-side'), 0, {css: {display:  "none"},ease: Circ.easeInOut}, "sidebar+=1")
      .to($('.step-sidebar-style'), 0.4, {css: {autoAlpha:  1,display:"block", scaleX:1,scaleY:1},ease: Circ.easeInOut}, "sidebar+=1.2")
      .to($('.s1'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.ip-header .ip-logo svg'), 0.4, {css: {right:  190},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.admin-builder > div, .admin-builder h1'), 0.4, {css: {marginRight:  240},ease: Circ.easeInOut}, "sidebar+=1.5")
      .to($('.s2'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=1.8")
      .to($('.s3'), 0.4, {css: {autoAlpha:  0.7},ease: Circ.easeInOut}, "sidebar+=2.1");
  });

  /**** SIDEBAR STYLE: DEFAULT, CONDENSED OR LIGHT ****/
  $('.sidebar-layout ').on('click', '.sidebar-style', function(){

      $('.sidebar-style').removeClass('active');
      $(this).addClass('active');
      docHeight = $(document).height();
      windowHeight = $(window).height();
      sidebarLayout = $(this).data('sidebar');
      /* If NOT RTL */
      if(is_RTL == false) {

          if(sidebarLayout == 'light') {
              TweenLite.killTweensOf(tlDefault);
              TweenLite.killTweensOf(tlCondensed);
              var tlLight = new TimelineLite();
              if($topbar.css('opacity') == 0) {
                  tlLight.to($sidebar, 0.4, {css: {marginLeft: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebarFooter, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($logopanel, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'-=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0, {css: {height:'auto'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0.4, {css: {marginLeft: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.sidebar .sidebar-footer'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7");
              }
              else{
                  tlLight.to($sidebar, 0.4, {css: {marginLeft: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebarFooter, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'-=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0, {css: {height:'auto'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0.4, {css: {marginLeft: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.sidebar .sidebar-footer'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7");
              }  
          }
          else if(sidebarLayout == 'condensed') {
            TweenLite.killTweensOf(tlDefault);
            TweenLite.killTweensOf(tlLight);
            var tlCondensed = new TimelineLite();
            tlCondensed.to($sidebar, 0.4, {css: {marginLeft: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($sidebarFooter, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($logopanel, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($body, 0, {css: {className:'-=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0, {css: {height:docHeight - 90},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0.4, {css: {marginLeft: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .sidebar-footer'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .logopanel'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7");   
          }
          else {
            TweenLite.killTweensOf(tlCondensed);
            TweenLite.killTweensOf(tlLight);
            var tlDefault = new TimelineLite();
            tlDefault.to($sidebar, 0.4, {css: {marginLeft: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($sidebarFooter, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($logopanel, 0.4, {css: {left:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($body, 0, {css: {className:'-=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0, {css: {height:docHeight - 90},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0.4, {css: {marginLeft: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .sidebar-footer'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .logopanel'), 0.4, {css: {left:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7");   
          }
      }

      /* If RTL */
      else {
          if(sidebarLayout == 'light') {
              TweenLite.killTweensOf(tlDefault);
              TweenLite.killTweensOf(tlCondensed);
              var tlLight = new TimelineLite();
              if($topbar.css('opacity') == 0) {
                  tlLight.to($sidebar, 0.4, {css: {marginRight: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebarFooter, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($logopanel, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'-=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0, {css: {height:'auto'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0.4, {css: {marginRight: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.sidebar .sidebar-footer'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7");
              }
              else{
                  tlLight.to($sidebar, 0.4, {css: {marginRight: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebarFooter, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
                  .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'-=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($body, 0, {css: {className:'+=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0, {css: {height:'auto'},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($sidebar, 0.4, {css: {marginRight: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.sidebar .sidebar-footer'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
                  .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7");
              }  
          }
          else if(sidebarLayout == 'condensed') {
            TweenLite.killTweensOf(tlDefault);
            TweenLite.killTweensOf(tlLight);
            var tlCondensed = new TimelineLite();
            tlCondensed.to($sidebar, 0.4, {css: {marginRight: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($sidebarFooter, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($logopanel, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($body, 0, {css: {className:'-=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0, {css: {height:docHeight - 90},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0.4, {css: {marginRight: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .sidebar-footer'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .logopanel'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7");   
          }
          else {
            TweenLite.killTweensOf(tlCondensed);
            TweenLite.killTweensOf(tlLight);
            var tlDefault = new TimelineLite();
            tlDefault.to($sidebar, 0.4, {css: {marginRight: -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($sidebarFooter, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($logopanel, 0.4, {css: {right:  -240},ease: Circ.easeInOut}, "sidebar+=0.2")
            .to($body, 0, {css: {className:'-=sidebar-light'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=sidebar-condensed'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'-=theme-sltl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($body, 0, {css: {className:'+=theme-sdtl'},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0, {css: {height:docHeight - 90},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($sidebar, 0.4, {css: {marginRight: 0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .sidebar-footer'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar .logopanel'), 0.4, {css: {right:  0},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.next-sidebar'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "sidebar+=0.7")
            .to($('.sidebar-builder'), 0.4, {css: {width:0},ease: Circ.easeInOut}, "sidebar+=0.7");   
          }

      }
  });

  $('.next-sidebar').on('click', function(e){
      e.preventDefault();
      if(sidebarLayout == null) return;
      var tl = new TimelineLite();
      tl.to($('.step-sidebar-style'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-sidebar-customize'), 0.4, {css: {scaleX:1,scaleY:1,autoAlpha:1,display:"block"},ease: Circ.easeInOut,
        onComplete: function(){ 
          docHeight = $(document).height();
          if(!$('body').hasClass('sidebar-light')) $sidebar.height(docHeight); 
        }}, "step+=0.8");
  });


  /**** SIDEBAR TOP ****/
  var sidebarTop1 = '\n'+
                    '            <div class="user-image">\n'+
                    '              <img src="assets/images/profil_page/friend8.jpg" class="img-responsive img-circle">\n'+
                    '            </div>\n'+
                    '            <h4>Bryan Raynolds</h4>\n'+
                    '            <div class="dropdown user-login">\n'+
                    '              <button class="btn btn-xs dropdown-toggle btn-rounded" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="300">\n'+
                    '                <i class="online"></i><span>Available</span> <i class="fa fa-angle-down"></i>\n'+
                    '              </button>\n'+
                    '              <ul class="dropdown-menu">\n'+
                    '                <li><a href="#"><i class="busy"></i><span>Busy</span></a></li>\n'+
                    '                <li><a href="#"><i class="turquoise"></i><span>Invisible</span></a></li>\n'+
                    '                <li><a href="#"><i class="away"></i><span>Away</span></a></li>\n'+
                    '              </ul>\n'+
                    '            </div>\n';
  var sidebarTop2 = '\n'+
                    '            <form action="#" method="post" class="searchform" id="search-results">\n'+
                    '              <input type="text" class="form-control" name="keyword" placeholder="Search here...">\n'+
                    '            </form>\n'+
                    '            <div class="userlogged clearfix">\n'+
                    '              <i class="icon icons-faces-users-01"></i>\n'+
                    '              <div class="user-details">\n'+
                    '                <h4>Mike Mayers</h4>\n'+
                    '                <div class="dropdown user-login">\n'+
                    '                  <button class="btn btn-xs dropdown-toggle btn-rounded" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="300">\n'+
                    '                    <i class="online"></i><span>Available</span><i class="fa fa-angle-down"></i>\n'+
                    '                  </button>\n'+
                    '                  <ul class="dropdown-menu">\n'+
                    '                    <li><a href="#"><i class="busy"></i><span>Busy</span></a></li>\n'+
                    '                    <li><a href="#"><i class="turquoise"></i><span>Invisible</span></a></li>\n'+
                    '                    <li><a href="#"><i class="away"></i><span>Away</span></a></li>\n'+
                    '                  </ul>\n'+
                    '                </div>\n'+
                    '              </div>\n'+
                    '            </div>\n';
  var sidebarTop3 = '\n'+
                    '            <div class="user-image">\n'+
                    '              <img src="assets/images/profil_page/friend8.jpg" class="img-responsive img-circle">\n'+
                    '            </div>\n'+
                    '            <div class="user-details">\n'+
                    '              <h4>Mike Mayers</h4>\n'+
                    '              <div class="dropdown user-login">\n'+
                    '                <button class="btn btn-xs dropdown-toggle btn-rounded" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="300">\n'+
                    '                  <i class="online"></i> Available <i class="fa fa-angle-down"></i>\n'+
                    '                </button>\n'+
                    '                <ul class="dropdown-menu">\n'+
                    '                  <li><a href="#"><i class="busy"></i> Busy</a></li>\n'+
                    '                  <li><a href="#"><i class="turquoise"></i> Invisible</a></li>\n'+
                    '                  <li><a href="#"><i class="away"></i> Away</a></li>\n'+
                    '                </ul>\n'+
                    '              </div>\n'+
                    '            </div>\n';

  $('.step-sidebar-customize .sidebar-top').on('click', '.top-img', function(){
      sidebarTop= $(this).data('sidebar-top');
      $('.step-sidebar-customize .sidebar-top .top-img').removeClass('active');
      $(this).addClass('active');
      if(sidebarTop == 'style1'){
        $sidebarTop.slideUp(350, function(){
          $sidebarTop.html('').removeClass('small-img clearfix').addClass('big-img').html(sidebarTop1);
          $sidebarTop.slideDown(350);
        });
      } 
      if(sidebarTop == 'style2'){
        $sidebarTop.slideUp(350, function(){
          $sidebarTop.html('').removeClass('small-img big-img clearfix').html(sidebarTop2);
          $sidebarTop.slideDown(350);
        });
      } 
      if(sidebarTop == 'style3'){
        $sidebarTop.slideUp(350, function(){
          $sidebarTop.html('').removeClass('big-img').addClass('small-img clearfix').html(sidebarTop3);
          $sidebarTop.slideDown(350);
        });
      } 
      if(sidebarTop == 'notop'){
        $sidebarTop.slideUp(350, function(){
          $sidebarTop.html('').removeClass('big-img small-img clearfix');
        });
      }        
  });


  /**** SIDEBAR WIDGET ****/
  var sidebarWidget1 =  '\n'+
                        '          <p class="menu-title widget-title">Folders <span class="pull-right"><a href="#" class="new-folder"> <i class="icon-plus"></i></a></span></p>\n'+
                        '          <ul class="folders">\n'+
                        '            <li>\n'+
                        '              <a href="#"><i class="icon-doc c-primary"></i>My documents</a>\n'+
                        '            </li>\n'+
                        '            <li>\n'+
                        '            <a href="#"><i class="icon-picture"></i>My images</a>\n'+
                        '            </li>\n'+
                        '            <li>\n'+
                        '              <a href="#"><i class="icon-lock"></i>Secure data</a>\n'+
                        '            </li>\n'+
                        '            <li class="add-folder">\n'+
                        '              <input type="text" placeholder="Folder\'s name..." class="form-control input-sm">\n'+
                        '            </li>\n'+
                        '          </ul>\n';

  var sidebarWidget2 =  '\n'+
                        '          <p class="menu-title widget-title">Statistics\n'+
                        '            <span class="pull-right">\n'+
                        '              <a href="#" class="hide-widget"> <i class="icons-office-52"></i></a>\n'+
                        '            </span>\n'+
                        '          </p>\n'+
                        '          <div class="charts-sidebar">\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="sidebar-charts-left">\n'+
                        '                <div class="sidebar-chart-title">Orders</div>\n'+
                        '                <div class="sidebar-chart-number">1,256</div>\n'+
                        '              </div>\n'+
                        '              <div class="sidebar-charts-right" data-type="bar">\n'+
                        '                <span class="dynamicbar1"></span>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '            <hr class="divider">\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="sidebar-charts-left">\n'+
                        '                <div class="sidebar-chart-title">Income</div>\n'+
                        '                <div class="sidebar-chart-number">$47,564</div>\n'+
                        '              </div>\n'+
                        '              <div class="sidebar-charts-right" data-type="bar">\n'+
                        '                <span class="dynamicbar2"></span>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '            <hr class="divider">\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="sidebar-charts-left">\n'+
                        '                <div class="sidebar-chart-title">Visits</div>\n'+
                        '                <div class="sidebar-chart-number" id="number-visits">147,687</div>\n'+
                        '              </div>\n'+
                        '              <div class="sidebar-charts-right" data-type="bar">\n'+
                        '                <span class="dynamicbar3"></span>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '          </div>\n';
                          
  var sidebarWidget3 =  '\n'+
                        '          <p class="menu-title widget-title">Statistics <span class="pull-right"><a href="#" class="hide-widget"> <i class="icons-office-52"></i></a></span></p>\n'+
                        '          <div class="charts-sidebar progress-chart">\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="clearfix">\n'+
                        '                <div class="sidebar-chart-title">Stat 1</div>\n'+
                        '                <div class="sidebar-chart-number">82%</div>\n'+
                        '              </div>\n'+
                        '              <div class="progress">\n'+
                        '                <div class="progress-bar progress-bar-primary stat1" data-transitiongoal="82"></div>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="clearfix">\n'+
                        '                <div class="sidebar-chart-title">Stat 2</div>\n'+
                        '                <div class="sidebar-chart-number">43%</div>\n'+
                        '              </div>\n'+
                        '              <div class="progress">\n'+
                        '                <div class="progress-bar progress-bar-primary stat2" data-transitiongoal="43"></div>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '            <div class="sidebar-charts-inner">\n'+
                        '              <div class="clearfix">\n'+
                        '                <div class="sidebar-chart-title">Stat 3</div>\n'+
                        '                <div class="sidebar-chart-number" id="number-visits">93%</div>\n'+
                        '              </div>\n'+
                        '              <div class="progress">\n'+
                        '                <div class="progress-bar progress-bar-primary stat3" data-transitiongoal="93"></div>\n'+
                        '              </div>\n'+
                        '            </div>\n'+
                        '          </div>\n';

  $('.step-sidebar-customize .sidebar-widget').on('click', '.widget-img', function(){
      sidebarWidget= $(this).data('sidebar-widget');
      $('.step-sidebar-customize .sidebar-widget .widget-img').removeClass('active');
      $(this).addClass('active');
      if(sidebarWidget == 'style1'){
        $sidebarWidget.slideUp(350, function(){
          $sidebarWidget.html('').html(sidebarWidget1);
          sidebarWidgets();
          $sidebarWidget.slideDown(350);
        });
      } 
      if(sidebarWidget == 'style2'){
        $sidebarWidget.slideUp(350, function(){
          $sidebarWidget.html('').html(sidebarWidget2);
          sidebarWidgets();
          $sidebarWidget.slideDown(350);
          
        });
      } 
      if(sidebarWidget == 'style3'){
        $sidebarWidget.slideUp(350, function(){
          $sidebarWidget.html('').html(sidebarWidget3);
          $sidebarWidget.slideDown(350);
          setTimeout(function () {
            $('.stat1').progressbar();
          }, 0);
          setTimeout(function () {
            $('.stat2').progressbar();
          }, 300);
          setTimeout(function () {
            $('.stat3').progressbar();
          }, 600);
          
        });
      } 
      if(sidebarWidget == 'nowidget'){
        $sidebarWidget.slideUp(350, function(){
          $sidebarWidget.html('');
        });
      }        
  });
  $('.back-sidebar-style').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-sidebar-customize'), 0.4, {css: {scaleX:0.8,scaleY:0.8,autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "back+=0.2")
      .to($('.step-sidebar-style'), 0.4, {css: {scaleX:1,scaleY:1,autoAlpha:1,display:"block" },ease: Circ.easeInOut}, "back+=0.6");
  });
  $('.next-sidebar-behaviour').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-sidebar-customize'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-sidebar-behaviour'), 0.4, {css: {scaleX:1,scaleY:1,autoAlpha:1,display:"block"},ease: Circ.easeInOut,
        onComplete: function(){ 
          docHeight = $(document).height();
          if(!$('body').hasClass('sidebar-light')) $sidebar.height(docHeight); 
        }}, "step+=0.8");
      $('.sidebar-widgets').css('display','');
      $('.sidebar-top').css('display','');

  });


  /**** SIDEBAR BEHAVIOUR ****/
  $('.step-sidebar-behaviour .behaviour-container.fixed-fluid > div').on('click', function(){
      $('.step-sidebar-behaviour .behaviour-container.fixed-fluid > div').removeClass('active');
      $(this).addClass('active');
      sidebarBehaviour = $(this).data('sidebar-behaviour');
      $(this).addClass('active');
      if(sidebarBehaviour == 'fixed') {
        handleSidebarFixed();
      } 
      if(sidebarBehaviour == 'fluid') {
        handleSidebarFluid();  
        if($('body').hasClass('sidebar-light')) $sidebar.css('height', '');
      } 
      if($(this).hasClass('active') && sidebarBehaviour == 'fluid') {
        $mainContent.css('margin-left' , 0);
        $('.step-sidebar-behaviour .behaviour-container.hover-submenu .left').removeClass('active');
      }
  });

  /**** SIDEBAR BEHAVIOUR ****/
  $('.step-sidebar-behaviour .behaviour-container.hover-submenu > div').on('click', function(){
      $(this).toggleClass('active');
      sidebarBehaviour = $(this).data('sidebar-behaviour');
      if($(this).hasClass('active') && sidebarBehaviour == 'hover'){
          $('.step-sidebar-behaviour .behaviour-container.hover-submenu .right').removeClass('active');
          $('.step-sidebar-behaviour .behaviour-container.fixed-fluid .right').removeClass('active');
          $('.step-sidebar-behaviour .behaviour-container.fixed-fluid .left').addClass('active');
          createSidebarHover();
      } 
      if(!$(this).hasClass('active') && sidebarBehaviour == 'hover'){
          $mainContent.css('margin-left' , 0);
          removeSidebarHover();
      } 
      if($(this).hasClass('active') && sidebarBehaviour == 'submenu-hover') {
          $mainContent.css('margin-left' , 0);
          $('.children').css('display' , '');
          $('.step-sidebar-behaviour .behaviour-container.hover-submenu .left').removeClass('active');
          createSubmenuHover();    
      } 
      if(!$(this).hasClass('active') && sidebarBehaviour == 'submenu-hover'){
          removeSubmenuHover();
          $sidebar.height(docHeight); 
      } 
  });
  $('.back-sidebar-customize').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-sidebar-behaviour'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-sidebar-customize'), 0.4, {css: {scaleX:1,scaleY:1,autoAlpha:1,display:"block"},ease: Circ.easeInOut,
        onComplete: function(){ 
          docHeight = $(document).height();
          if(!$('body').hasClass('sidebar-light')) $sidebar.height(docHeight); 
        }}, "step+=0.8");
  });
  $('.next-topbar').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-sidebar-behaviour'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-topbar-style'), 0.4, {css: {scaleX:1,scaleY:1, autoAlpha:1,display:"block"},ease: Circ.easeInOut}, "step+=0.6");
  });


  /**** TOPBAR ****/
  var topbar1 = '       <div class="topnav">\n'+
                '         <a class="menutoggle" href="#" data-toggle="sidebar-collapsed"><span class="menu__handle"><span>Menu</span></span></a>\n'+
                '         <ul class="nav nav-icons">\n'+
                '           <li><span class="octicon octicon-cloud-upload"></span></li>\n'+
                '           <li><span class="octicon octicon-link"></span></li>\n'+
                '           <li><span class="octicon octicon-device-camera"></span></li>\n'+
                '           <li><span class="octicon octicon-comment-discussion"></span></li>\n'+
                '         </ul>\n'+
                '       </div>\n';
  var topbar2 = '       <div class="topnav">\n'+
                '         <a class="menutoggle" href="#" data-toggle="sidebar-collapsed"><span class="menu__handle"><span>Menu</span></span></a>\n'+
                '         <ul class="nav nav-horizontal">\n'+
                '           <li class="active"><a href="mailbox.html"><span class="pull-right badge badge-primary">8</span><i class="icon-envelope"></i><span>Mailbox</span></a></li>\n'+
                '           <li><a href="email.html"><i class="icon-bar-chart"></i><span>Sales</span></a></li>\n'+
                '           <li class="nav-parent">\n'+
                '             <a href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="30">\n'+
                '               <i class="fa fa-list"></i><span>Invoicing</span><i class="icons-arrows-06"></i>\n'+
                '             </a>\n'+
                '             <ul class="dropdown-menu children">\n'+
                '               <li><a href="#">All Invoices</a></li>\n'+
                '               <li><a href="#"> Create New</a></li>\n'+
                '               <li><a href="#"> Clients</a></li>\n'+
                '               <li><a href="#"> Templates</a></li>\n'+
                '               <li><a href="#"> Parameters</a></li>\n'+
                '             </ul>\n'+
                '           </li>\n'+
                '           <li><a href="email.html"><span class="pull-right badge badge-primary">2</span><i class="icon-notebook"></i><span>Reporting</span></a></li>\n'+
                '           <li><a href="email.html"><i class="icon-settings"></i><span>Settings</span></a></li>\n'+
                '         </ul>\n'+
                '       </div>\n';

  $('.step-topbar-style .topbar-style').on('click', function(){
      topbarStyle = $(this).data('topbar');
      $('.topbar-style').removeClass('active');
      $(this).addClass('active');
      var tl = new TimelineLite();
      if(topbarStyle == 'icons') {
          if($topbar.css('opacity') == 0) {
              if($body.hasClass('sidebar-light')) {
                  $logopanel.css('top', -50).css('left', 0);
              } 
              $('.topbar .header-left').html('').html(topbar1);
              tl.to($topbar, 0.4, {css: {marginTop:0, autoAlpha:1},ease: Circ.easeInOut}, "topbar+=0")
                .to($('.ip-logo'), 0.4, {css: {top:10, },ease: Circ.easeInOut}, "topbar+=0")
                .to($('.admin-builder h1'), 0.4, {css: {marginTop:20, },ease: Circ.easeInOut}, "topbar+=0")
                .to($('.builder-container'), 0.4, {css: {marginTop:30, },ease: Circ.easeInOut}, "topbar+=0")
                .to($logopanel, 0.4, {css: {top:  0},ease: Circ.easeInOut}, "topbar+=0")
                .to($('.next-theme'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "topbar+=0.3");
          }
          else {
              $('.topbar .header-left').fadeOut(300, function(){
                  $('.topbar .header-left').html('').html(topbar1).fadeIn(300);
              });
          }   
      } 
      if(topbarStyle == 'menu') {
          if($topbar.css('opacity') == 0) {
              if($body.hasClass('sidebar-light')) {
                  $logopanel.css('top', -50).css('left', '');
              } 
              $('.topbar .header-left').html('').html(topbar2);
              tl.to($topbar, 0.4, {css: {marginTop:0, autoAlpha:1},ease: Circ.easeInOut}, "topbar+=0")
                .to($('.ip-logo'), 0.4, {css: {top:10, },ease: Circ.easeInOut}, "topbar+=0")
                .to($('.admin-builder h1'), 0.4, {css: {marginTop:20, },ease: Circ.easeInOut}, "topbar+=0")
                .to($('.builder-container'), 0.4, {css: {marginTop:30, },ease: Circ.easeInOut}, "topbar+=0")
                .to($logopanel, 0.4, {css: {top:  0},ease: Circ.easeInOut}, "topbar+=0")
                .to($('.next-theme'), 0.4, {css: {autoAlpha:1},ease: Circ.easeInOut}, "topbar+=0.3");
                setTimeout(function(){
                    reposition_topnav();
                },100);
          }
          else {
              $('.topbar .header-left').fadeOut(300, function(){
                  $('.topbar .header-left').html('').html(topbar2).fadeIn(300);
              });
              setTimeout(function(){
                  reposition_topnav();
              },100);
          }  
      } 

  });

  $('.back-sidebar-behaviour').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-topbar-style'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-sidebar-behaviour'), 0.4, {css: {scaleX:1,scaleY:1, autoAlpha:1,display:"block"},ease: Circ.easeInOut}, "step+=0.6");
  });
  $('.next-theme').on('click', function(e){
      e.preventDefault();
      if(topbarStyle == null) return;
      var tl = new TimelineLite();
      tl.to($('.step-topbar-style'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-theme'), 0.4, {css: {scaleX:1,scaleY:1, autoAlpha:1,display:"block"},ease: Circ.easeInOut}, "step+=0.6");
  });


  /**** THEME ****/
  $('.back-topbar-style').on('click', function(e){
      e.preventDefault();
      var tl = new TimelineLite();
      tl.to($('.step-theme'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-topbar-style'), 0.4, {css: {scaleX:1,scaleY:1, autoAlpha:1,display:"block"},ease: Circ.easeInOut}, "step+=0.6");
  });
  $('#export-admin').on('click', function(e){
      e.preventDefault();
      $('#modal-export-template').modal('show');
  });





  /***** EDIT TEXT, LINKS AND ICONS ****/

  /* Context Menu */
  var menuContext = '<div id="context-menu" class="context-menu dropdown clearfix">'+
                      '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">'+
                       '<li class="dropdown-title">Sidebar</li>'+
                        '<li class="edit-text"><a href="#" data-action="text"><i class="icon-pencil c-gray"></i> Edit Text</a></li>'+
                        '<li class="edit-menu"><a href="#" data-action="menu"><i class="icon-pencil c-gray"></i> Edit Menu</a></li>'+
                        '<li class="edit-icon"><a href="#" data-action="icons"><i class="icon-star c-gray"></i> Choose Icon</a></li>'+
                        '<li class="add-menu"><a href="#" data-action="add-menu"><i class="icon-plus c-gray"></i> Add Menu</a></li>'+
                        '<li class="add-submenu"><a href="#" data-action="add-submenu"><i class="icon-plus c-gray"></i> Add Submenu</a></li>'+
                        '<li class="remove"><a href="#" data-action="remove"><i class="icon-ban c-gray"></i> Remove</a></li>'+
                      '</ul>'+
                    '</div>';

  $('.main-content').append(menuContext);

  /* Edit Sidebar */
  $('.sidebar').on('mousedown', 'h4, .nav-sidebar li, .sidebar-widgets li, .menu-title span:not(.pull-right)', function(){
      $('#context-menu .edit-txt, #context-menu .edit-menu, #context-menu .edit-menu, #context-menu .add-menu, #context-menu .add-submenu, #context-menu .edit-icon, #context-menu .remove').show();
      if($(this).hasClass('tm')) {
          $('#context-menu .edit-text').hide();
      }
      if($(this).parent().hasClass('menu-title')){
          $('#context-menu .edit-menu, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .remove,#context-menu .add-menu').hide();
          $('#context-menu .edit-text').show();
      } 
      if($(this).parent().hasClass('folders')) {
          $('#context-menu .edit-menu, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .remove,#context-menu .add-menu').hide();
          $('#context-menu .edit-text, #context-menu .edit-icon ').show();
      }
      if($(this).parent().hasClass('children')) {
          setTimeout(function(){
              $('#context-menu .edit-menu').show();
              $('#context-menu .edit-text, #context-menu .edit-icon, #context-menu .add-menu, #context-menu .add-submenu').hide();
          }, 10);
      }
      if($(this).is('h4')) {
          $('#context-menu .edit-menu, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .add-menu, #context-menu .remove').hide();
          $('#context-menu .edit-text').show();
      }
      $('.context-menu .dropdown-title').text('Sidebar');
      $(this).contextmenu({
          target: '#context-menu',
          onItem: function (context, e) {
              var action = $(e.target).data("action");
              $('#modal-'+action).modal('show');
              context.addClass('current-context');
              if(action == 'text'){
                  if(context.is('h4') || context.is('span')) {
                      $('#modal-text .text').val($.trim(context.text()));
                  }
                  if(context.parent().hasClass('folders') || context.hasClass('menu-title')) {
                    $('#modal-text .text').val($.trim(context.find('a > span').text())); 
                      $('#modal-text .text').val($.trim(context.find('span').text()));
                  }
              } 
              if(action == 'menu'){
                  if(context.hasClass('nav-parent')) {
                      $('#modal-menu .form-link').hide();
                      $('#modal-menu .menu-text').val($.trim(context.find('span').text()));
                  }  
                  else {
                    $('#modal-menu .form-link').show();
                    if(context.hasClass('tm')) $('#modal-menu .menu-text').val($.trim(context.find('span').text()));
                    else $('#modal-menu .menu-text').val($.trim(context.text()));
                    $('#modal-menu .menu-link').val(context.find('a').attr('href')); 
                  }
              } 
              if(action == 'add-menu'){
                  $('#modal-menu .modal-title').text('Add menu');
                  if(context.hasClass('nav-parent')) {
                      $('#modal-menu .link-text').val($.trim(context.find('a > span').text())); 
                      $('#modal-menu .form-link').hide();
                  }
                  else{
                    $('#modal-menu .link-text').val($.trim(context.text()));
                    $('#modal-menu .link-href').val(context.find('a').attr('href'));  
                    $('#modal-menu .form-link').show();
                  }
              } 
              if(action == 'remove'){
                  $menu = context;
                  if(context.hasClass('nav-parent')) $remove_txt = "Are you sure to remove this menu?<br><small>all submenus will be deleted too.</small>";
                  else if(context.parent().hasClass('folders')) $remove_txt = "Are you sure this folder?";
                  else $remove_txt = "Are you sure to remove this menu?";
                  bootbox.confirm($remove_txt, function(result) {
                      if(result === true){
                        $menu.addClass("animated bounceOutLeft");
                        window.setTimeout(function () {
                          $menu.remove();
                        }, 300);
                      }
                  }); 
              }     
          }
      });
  });


  /* Edit Topbar */
  $('.topbar').on('mousedown','.nav-icons li span, .nav-horizontal li a, #language-header, #notifications-header, #messages-header', function(){

      $('#context-menu .edit-text, #context-menu .edit-menu, #context-menu .edit-menu, #context-menu .add-menu, #context-menu .add-submenu, #context-menu .edit-icon, #context-menu .remove').show();
      if($(this).parent().parent().hasClass('nav-horizontal')){
          $('#context-menu .edit-text').hide();
      }
      if($(this).parent().parent().hasClass('dropdown-menu')){
          $('#context-menu .edit-menu, #context-menu .edit-text, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .remove,#context-menu .add-menu').hide();
         $('#context-menu .edit-menu, #context-menu .remove').show();
      }
      if($(this).hasClass('dropdown')){
        $('#context-menu .edit-menu, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .remove,#context-menu .add-menu').hide();
        $('#context-menu .edit-icon').show();
      }
      if($(this).parent().parent().hasClass('nav-icons')){
        $('#context-menu .edit-text, #context-menu .edit-menu, #context-menu .edit-icon, #context-menu .remove, #context-menu .add-submenu, #context-menu .remove,#context-menu .add-menu').hide();
        $('#context-menu .edit-icon, #context-menu .remove').show();
      }
      $('.context-menu .dropdown-title').text('Topbar');
      $(this).contextmenu({
          target: '#context-menu',
          onItem: function (context, e) {
              var action = $(e.target).data("action");
              $('#modal-'+action).modal('show');
              context.addClass('current-context');
              if(action == 'text'){
                  if(context.is('h4') || context.is('span')) {
                      $('#modal-text .text').val($.trim(context.text()));
                  }
                  if(context.hasClass('dropdown')) {
                      $('#modal-text .text').val($.trim(context.children('a').find('span').text()));
                  }
              } 
              if(action == 'menu'){
                  if(context.parent().hasClass('nav-parent')) {
                      $('#modal-menu .form-link').hide();
                      $('#modal-menu .menu-text').val($.trim(context.find('span').text()));
                  } 
                  else if(context.parent().parent().hasClass('nav-horizontal')) {
                      
                      $('#modal-menu .menu-text').val($.trim(context.find('span:not(.badge)').text()));
                      if(!context.parent().hasClass('nav-parent')){
                          $('#modal-menu .menu-link').val($.trim(context.attr('href')));
                      }
                  } 
                  else {
                    $('#modal-menu .form-link').show();
                    if(context.hasClass('tm')) $('#modal-menu .menu-text').val($.trim(context.find('span').text()));
                    else $('#modal-menu .menu-text').val($.trim(context.text()));
                    $('#modal-menu .menu-link').val(context.find('a').attr('href')); 
                  }
              } 
              if(action == 'add-menu'){
                  $('#modal-menu .modal-title').text('Add menu');
                  if(context.hasClass('nav-parent')) {
                      $('#modal-menu .link-text').val($.trim(context.find('a > span').text())); 
                      $('#modal-menu .form-link').hide();
                  }
                  else{
                    $('#modal-menu .link-text').val($.trim(context.text()));
                    $('#modal-menu .link-href').val(context.find('a').attr('href'));  
                    $('#modal-menu .form-link').show();
                  }
              } 
              if(action == 'remove'){
                  var currentMenu = context;
                  if(context.hasClass('nav-parent')) $remove_txt = "Are you sure to remove this menu?<br><small>all submenus will be deleted too.</small>";
                  else if(context.parent().hasClass('nav-parent')) $remove_txt = "Are you sure to remove this menu?<br><small>all submenus will be deleted too.</small>";
                  else if(context.parent().hasClass('folders')) $remove_txt = "Are you sure this folder?";
                  else $remove_txt = "Are you sure to remove this menu?";

                  if(currentMenu.parent().parent().hasClass('dropdown-menu')) {
                      bootbox.confirm($remove_txt, function(result) {
                        if(result === true){
                          currentMenu.parent().addClass("animated bounceOutLeft");
                          setTimeout(function() {
                            currentMenu.parent().addClass('hidden');
                            var numberSubmenu = currentMenu.parent().parent().find('li:not(.hidden)').length;
                            if (numberSubmenu == 0) {
                              currentMenu.parent().parent().prev().find('.icons-arrows-06').remove();
                              currentMenu.parent().parent().prev().removeAttr('data-toggle').removeAttr('data-hover').removeAttr('data-close-others').removeAttr('data-delay').removeAttr('aria-expanded');
                              currentMenu.parent().parent().parent().removeAttr('class').removeClass('open');
                              currentMenu.parent().parent().addClass('hidden');
                            }
                          }, 300);
                        }
                      });
                  }
                  if(currentMenu.parent().parent().hasClass('nav-horizontal')) {
                      $menu = context;
                      bootbox.confirm($remove_txt, function(result) {
                          if(result === true){
                            $menu.parent().addClass("animated bounceOutLeft");
                            window.setTimeout(function () {
                              $menu.parent().remove();
                            }, 300);
                          }
                      }); 
                  }

                   
              }     
          }
      });
  });


        


  /* Edit Menu */
  $('#modal-menu').on('click', '.save', function(){
      var linkText = $('.menu-text').val();
      var linkHref = $('.menu-link').val();
      if(linkText != ''){
          
          if($('.current-context').parent().parent().hasClass('dropdown-menu')){
            $('.current-context').attr("href", linkHref);
            $('.current-context').text(linkText);
          }
          else{
              if($('.current-context').parent().hasClass('children')) $('.current-context').find('a').text(linkText);
              else if($('.current-context').parent().parent().hasClass('nav-horizontal') && $('.current-context').parent().hasClass('nav-parent')){
                $('.current-context').find('span:not(.badge)').text(linkText);
              } 
              else if($('.current-context').parent().parent().hasClass('nav-horizontal') && !$('.current-context').parent().hasClass('nav-parent')){
                $('.current-context').find('span:not(.badge)').text(linkText);
                $('.current-context').attr("href", linkHref);

              } 
              else if($('.current-context').parent().hasClass('nav-parent')) $('.current-context').find('span').text(linkText);
              else $('.current-context').find('span:not(.fa)').text(linkText);
              $('.current-context').find('a').attr("href", linkHref);
          }
          $('#modal-menu').modal('hide');
          $('.current-context').removeClass('current-context');
          $('#modal-menu .menu-text').val('');
          $('#modal-menu .menu-link').val('');
      }
  });

  /* Edit Text */
  $('#modal-text').on('click', '.save', function(){
      var linkText = $('#modal-text .text').val();
      if(linkText != ''){
          if($('.current-context').is('h4') || $('.current-context').is('span')) {
              $('.current-context').text(linkText);
          }
          if($('.current-context').hasClass('menu-title')) {
              $('.current-context span:first-child').text(linkText);
          }
          else {
              $('.current-context').find('span:not(.fa)').text(linkText);
          }
          $('#modal-text').modal('hide');
          $('.current-context').removeClass('current-context');
          $('#modal-text .text').val('');
      }
  });

  /* Add Menu */
  $('#modal-add-menu').on('click', '.save', function(){
      var menuText = $('#modal-add-menu .menu-text').val();
      var menuLink = $('#modal-add-menu .menu-link').val();
      if(menuLink != ''){
          if($('.current-context').hasClass('tm')) {
            $('.current-context').after('<li class="tm"><a href="'+ menuLink +'"><i class="icon-fire"></i><span>'+ menuText +'</span></a></li>');
          }
          else if($('.current-context').parent().parent().hasClass('nav-horizontal')){
            $('.current-context').parent().after('<li><a href="' + menuLink + '"><i class="icon-bar-chart"></i><span>'+ menuText +'</span></a></li>');
            reposition_topnav();
          }
          else {
            $('.current-context').after('<li><a href="'+ menuLink +'">'+ menuText +'</a></li>');
          }
          $('#modal-add-menu').modal('hide');
          $('.current-context').removeClass('current-context');
          $('#modal-add-menu .menu-text').val('');
          $('#modal-add-menu .menu-link').val('');
          createSideScroll();

      }
  });

  /* Add Submenu */
  $('#modal-add-submenu').on('click', '.save', function(){
      var menuText = $('#modal-add-submenu .menu-text').val();
      var menuLink = $('#modal-add-submenu .menu-link').val();
      if(menuLink != ''){
          if($('.current-context').parent().hasClass('nav-sidebar')){
              if($('.current-context').hasClass('nav-parent')){
                  $('.current-context .children').append('<li><a href="'+ menuLink +'">'+ menuText +'</a></li>');
              }
              else {
                  $('.current-context').find('a').append('<span class="fa arrow"></span>');
                  $('.current-context').find('a').attr('href', '#');
                  if($('body').hasClass('submenu-hover')){
                    $('.current-context').addClass('nav-parent').append('<ul class="children collapse"><li><a href="'+ menuLink +'">'+ menuText +'</a></li></ul>');
                  }
                  else{
                    $('.current-context').addClass('nav-parent').append('<ul class="children collapse" style="display:none"><li><a href="'+ menuLink +'">'+ menuText +'</a></li></ul>');
                  }
                  
              }
          }
          if($('.current-context').parent().parent().hasClass('nav-horizontal')){
              if($('.current-context').parent().hasClass('nav-parent')){
                  $('.current-context ').next().append('<li><a href="'+ menuLink +'">'+ menuText +'</a></li>');
              }
              else {
                  $('.current-context').append('<i class="icons-arrows-06"></i>');
                  $('.current-context').attr('href', '#').attr('data-toggle', 'dropdown').attr('data-hover', 'dropdown').attr('data-close-others', 'true').attr('data-delay', '30');
                  $('.current-context').parent().addClass('nav-parent').append('<ul class="dropdown-menu children"><li><a href="'+ menuLink +'">'+ menuText +'</a></li></ul>');
              }



          }
          $('#modal-add-submenu').modal('hide');
          $('.current-context').removeClass('current-context');
          $('#modal-add-submenu .menu-text').val('');
          $('#modal-add-submenu .menu-link').val('');

      }
  });

  /* Edit Icon */
  $('#modal-icons .modal-body').on('click', 'i', function(){
      $('#modal-icons .modal-body i').removeClass('active');
      var selectedIconClass = $(this).attr('class');
      if(selectedIconClass != ''){
          $(this).addClass('active');
      }
  });

  $('#modal-icons').on('click', '.save', function(){
      var selectedIconClass = $('#modal-icons .modal-body i.active').attr('class');
      if(selectedIconClass != ''){
          $('.current-context').find('i:not(.icons-arrows-06)').removeClass().addClass(selectedIconClass).removeClass('active');
          if($('.current-context ').parent().parent().hasClass('nav-icons')){
              $('.current-context').removeClass().addClass(selectedIconClass).removeClass('active');
          }
          if($('.current-context ').parent().hasClass('folders')){
              $('.current-context').find('i').addClass('c-primary');
          }
          $('#modal-icons').modal('hide');
          $('.current-context').removeClass('current-context');
          $('#modal-icons .modal-body i').removeClass('active');
      }

  });

  /* Disabled Links for builder purpose */
  $('.sidebar').on('click', '.nav-sidebar li:not(.nav-parent) a', function(e){
      e.preventDefault();
      $('#modal-disable-link').modal('show');
  });

  /* Disabled Links for builder purpose */
  $('.topbar').on('click', 'li:not(.nav-parent) a', function(e){
      e.preventDefault();
      $('#modal-disable-link').modal('show');
  });



  /* Export Admin in HTML */
  $('#modal-export-template').on('click', '.export', function(e){
      e.preventDefault();
      var cloneQuickview  = $('#quickview-sidebar').clone();
      var cloneSearch  = $('#morphsearch').clone();
      var fileName = $('.html-file-name').val();
      $('body').removeClass('modal-open').removeClass('layout-switch').removeClass('builder-admin');
      var bodyClass = $('body').attr('class');
      if(fileName == '') fileName = 'my-custom-admin';
      var rtlClass = '';
      if($('body').hasClass('rtl')) {
          rtlClass = 'rtl';
      }
      var adminHeader =   '<!DOCTYPE html>\n'+
                          '<html class="'+ rtlClass +'" lang="en">\n'+
                          '<head>\n'+
                          '  <meta charset="utf-8">\n'+
                          '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">\n'+
                          '  <meta name="description" content="admin-themes-lab">\n'+
                          '  <meta name="author" content="themes-lab">\n'+
                          '  <link rel="shortcut icon" href="assets/images/favicon.png" type="image/png">\n'+
                          '  <title>Make Admin Template - Themes Lab</title>\n'+
                          '  <link href="http://fonts.googleapis.com/css?family=Nothing+You+Could+Do" rel="stylesheet" type="text/css">\n'+
                          '  <link href="assets/css/style.css" rel="stylesheet"> <!-- MANDATORY -->\n'+
                          '  <link href="assets/css/theme.css" rel="stylesheet"> <!-- MANDATORY -->\n'+
                          '  <link href="assets/css/ui.css" rel="stylesheet"> <!-- MANDATORY -->\n'+
                          '  <link href="assets/plugins/datatables/dataTables.min.css" rel="stylesheet">\n'+
                          '<link href="../builder/page-builder/plugins/slider-pips/jquery-ui-slider-pips.css" rel="stylesheet">\n'+
                          '  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->\n'+
                          '  <!--[if lt IE 9]>\n'+
                          '  <script src="assets/plugins/modernizr/modernizr-2.6.2-respond-1.1.0.min.js"></script>\n'+
                          '  <![endif]-->\n'+
                          '</head>\n'+
                          '<!-- LAYOUT: Apply "submenu-hover" class to body element to have sidebar submenu show on mouse hover -->\n'+
                          '<!-- LAYOUT: Apply "sidebar-collapsed" class to body element to have collapsed sidebar -->\n'+
                          '<!-- LAYOUT: Apply "sidebar-top" class to body element to have sidebar on top of the page -->\n'+
                          '<!-- LAYOUT: Apply "sidebar-hover" class to body element to show sidebar only when your mouse is on left / right corner -->\n'+
                          '<!-- LAYOUT: Apply "submenu-hover" class to body element to show sidebar submenu on mouse hover -->\n'+
                          '<!-- LAYOUT: Apply "fixed-sidebar" class to body to have fixed sidebar -->\n'+
                          '<!-- LAYOUT: Apply "fixed-topbar" class to body to have fixed topbar -->\n'+
                          '<!-- LAYOUT: Apply "rtl" class to body to put the sidebar on the right side -->\n'+
                          '<!-- LAYOUT: Apply "boxed" class to body to have your page with 1200px max width -->\n'+
                          '<!-- THEME STYLE: Apply "theme-sdtl" for Sidebar Dark / Topbar Light -->\n'+
                          '<!-- THEME STYLE: Apply  "theme sdtd" for Sidebar Dark / Topbar Dark -->\n'+
                          '<!-- THEME STYLE: Apply "theme sltd" for Sidebar Light / Topbar Dark -->\n'+
                          '<!-- THEME STYLE: Apply "theme sltl" for Sidebar Light / Topbar Light -->\n'+
                          '<!-- THEME COLOR: Apply "color-default" for dark color: #2B2E33 -->\n'+
                          '<!-- THEME COLOR: Apply "color-primary" for primary color: #319DB5 -->\n'+
                          '<!-- THEME COLOR: Apply "color-red" for red color: #C9625F -->\n'+
                          '<!-- THEME COLOR: Apply "color-default" for green color: #18A689 -->\n'+
                          '<!-- THEME COLOR: Apply "color-default" for orange color: #B66D39 -->\n'+
                          '<!-- THEME COLOR: Apply "color-default" for purple color: #6E62B5 -->\n'+
                          '<!-- THEME COLOR: Apply "color-default" for blue color: #4A89DC -->\n'+
                          '<!-- BEGIN BODY -->\n'+
                          '<body class="' + bodyClass + '">\n'+
                          '  <section>';

      var copyright =   '      <div class="footer">\n'+
                        '        <div class="copyright">\n'+
                        '          <p class="pull-left sm-pull-reset"> <span>Copyright <span class="copyright">©</span> 2014 </span> <span>THEMES LAB</span>. <span>All rights reserved. </span> </p>\n'+
                        '          <p class="pull-right sm-pull-reset"> <span><a href="#" class="m-r-10">Support</a> | <a href="#" class="m-l-10 m-r-10">Terms of use</a> | <a href="#" class="m-l-10">Privacy Policy</a></span> </p>\n'+
                        '        </div>\n'+
                        '      </div>\n';

      var adminFooter = '</section>\n'+
                        '<div id="quickview-sidebar" class="">\n'+
                        cloneQuickview.html() +
                        '</div>\n'+
                        '<div id="morphsearch" class="morphsearch">\n'+
                        cloneSearch.html() +
                        '</div>\n'+
                        '<!-- Preloader -->\n'+
                        '<div class="loader-overlay">\n'+
                        '  <div class="spinner">\n'+
                        '    <div class="bounce1"></div>\n'+
                        '    <div class="bounce2"></div>\n'+
                        '    <div class="bounce3"></div>\n'+
                        '  </div>\n'+
                        '</div>\n'+
                        '<a href="#" class="scrollup"><i class="fa fa-angle-up"></i></a>\n'+
                        '<script src="assets/plugins/jquery/jquery-1.11.1.min.js"></script>\n'+
                        '<script src="assets/plugins/jquery/jquery-migrate-1.2.1.min.js"></script>\n'+
                        '<script src="assets/plugins/gsap/main-gsap.min.js"></script> <!-- HTML Animations -->\n'+
                        '<script src="assets/plugins/jquery-ui/jquery-ui-1.11.2.min.js"></script>\n'+
                        '<script src="assets/plugins/jquery-block-ui/jquery.blockUI.min.js"></script> <!-- simulate synchronous behavior when using AJAX -->\n'+
                        '<script src="assets/plugins/translate/jqueryTranslator.min.js"></script> <!-- Translate Plugin with JSON data -->\n'+
                        '<script src="assets/plugins/bootbox/bootbox.min.js"></script>\n'+
                        '<script src="assets/plugins/mcustom-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script> <!-- Custom Scrollbar sidebar -->\n'+
                        '<script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>\n'+
                        '<script src="assets/plugins/bootstrap-dropdown/bootstrap-hover-dropdown.min.js"></script> <!-- Show Dropdown on Mouseover -->\n'+
                        '<script src="assets/plugins/bootstrap-progressbar/bootstrap-progressbar.min.js"></script> <!-- Animated Progress Bar -->\n'+
                        '<script src="assets/plugins/switchery/switchery.min.js"></script> <!-- IOS Switch -->\n'+
                        '<script src="assets/plugins/charts-sparkline/sparkline.min.js"></script> <!-- Charts Sparkline -->\n'+
                        '<script src="assets/plugins/retina/retina.min.js"></script>  <!-- Retina Display -->\n'+
                        '<script src="assets/plugins/jquery-cookies/jquery.cookies.js"></script> <!-- Jquery Cookies, for theme -->\n'+
                        '<script src="assets/plugins/bootstrap/js/jasny-bootstrap.min.js"></script> <!-- File Upload and Input Masks -->\n'+
                        '<script src="assets/plugins/select2/select2.min.js"></script> <!-- Select Inputs -->\n'+
                        '<script src="assets/plugins/bootstrap-tags-input/bootstrap-tagsinput.min.js"></script> <!-- Select Inputs -->\n'+
                        '<script src="assets/plugins/bootstrap-loading/lada.min.js"></script> <!-- Buttons Loading State -->\n'+
                        '<script src="assets/plugins/timepicker/jquery-ui-timepicker-addon.min.js"></script> <!-- Time Picker -->\n'+
                        '<script src="assets/plugins/multidatepicker/multidatespicker.min.js"></script> <!-- Multi dates Picker -->\n'+
                        '<script src="assets/plugins/colorpicker/spectrum.min.js"></script> <!-- Color Picker -->\n'+
                        '<script src="assets/plugins/touchspin/jquery.bootstrap-touchspin.min.js"></script> <!-- A mobile and touch friendly input spinner component for Bootstrap -->\n'+
                        '<script src="assets/plugins/autosize/autosize.min.js"></script> <!-- Textarea autoresize -->\n'+
                        '<script src="assets/plugins/icheck/icheck.min.js"></script> <!-- Icheck -->\n'+
                        '<script src="assets/plugins/bootstrap-editable/js/bootstrap-editable.min.js"></script> <!-- Inline Edition X-editable -->\n'+
                        '<script src="assets/plugins/bootstrap-context-menu/bootstrap-contextmenu.min.js"></script> <!-- File Upload and Input Masks -->\n'+
                        '<script src="assets/plugins/prettify/prettify.min.js"></script> <!-- Show html code -->\n'+
                        '<script src="assets/plugins/slick/slick.min.js"></script> <!-- Slider -->\n'+
                        '<script src="assets/plugins/countup/countUp.min.js"></script> <!-- Animated Counter Number -->\n'+
                        '<script src="assets/plugins/noty/jquery.noty.packaged.min.js"></script>  <!-- Notifications -->\n'+
                        '<script src="assets/plugins/backstretch/backstretch.min.js"></script> <!-- Background Image -->\n'+
                        '<script src="assets/plugins/charts-chartjs/Chart.min.js"></script>  <!-- ChartJS Chart -->\n'+
                        '<script src="assets/plugins/bootstrap-slider/bootstrap-slider.js"></script> <!-- Bootstrap Input Slider -->\n'+
                        '<script src="assets/plugins/visible/jquery.visible.min.js"></script> <!-- Visible in Viewport -->\n'+
                        '<script src="assets/js/builder.js"></script>\n'+
                        '<script src="assets/js/sidebar_hover.js"></script>\n'+
                        '<script src="assets/js/application.js"></script> <!-- Main Application Script -->\n'+
                        '<script src="assets/js/plugins.js"></script> <!-- Main Plugin Initialization Script -->\n'+
                        '<script src="assets/js/widgets/notes.js"></script>\n'+
                        '<script src="assets/js/quickview.js"></script> <!-- Quickview Script -->\n'+
                        '<script src="assets/js/pages/search.js"></script> <!-- Search Script -->\n'+
                        '<!-- BEGIN PAGE SCRIPTS -->\n'+
                        '<script src="assets/plugins/datatables/jquery.dataTables.min.js"></script> <!-- Tables Filtering, Sorting & Editing -->\n'+
                        '<script src="assets/plugins/summernote/summernote.js"></script>\n'+
                        '<script src="assets/plugins/skycons/skycons.js"></script>\n'+
                        '<script src="assets/plugins/simple-weather/jquery.simpleWeather.min.js"></script>\n'+
                        '<script src="assets/js/widgets/widget_weather.js"></script>\n'+
                        '<script src="assets/js/widgets/todo_list.js"></script>\n'+
                        '<script src="../builder/page-builder/plugins/slider-pips/jquery-ui-slider-pips.min.js"></script>\n'+
                        '<script src="../builder/page-builder/plugins/saveas/saveAs.js"></script>\n'+
                        '<script src="../builder/page-builder/js/builder_page.js"></script>\n'+
                        '<!-- END PAGE SCRIPTS -->\n'+
                        '</body>\n'+
                        '</html>';
                        
      
      if($('body').hasClass('fixed-sidebar')) {
          var sidebarIsFixed = true;
          handleSidebarFluid();  
          $('body').addClass('fixed-sidebar');
      }
      var allContent   = $('body > section').clone();
      allContent.find('#ip-container').remove();
      allContent.find('#context-menu').remove();
      allContent.find('.sidebar').removeAttr('style');
      allContent.find('.sidebar-inner').removeClass('mCS_destroyed').removeClass('');
      allContent.find('.logopanel').removeAttr('style');
      allContent.find('.sidebar-top').removeAttr('style');
      allContent.find('.topbar').removeAttr('style');
      allContent.find('.main-content').removeAttr('style');
      allContent.find('.page-content').removeAttr('style');
      allContent.find('.page-content').append(copyright);
      allContent.find('.page-content').prepend('<div class="custom-page m-t-60 text-center"><h2 class="m-b-20">Do you want to create your page with Page <strong>Builder</strong>?</h2><a href="#" id="no-page-builder" class="btn btn-dark btn-lg btn-square">No, thanks</a><a href="#" id="import-page-builder" class="btn btn-primary btn-lg btn-square">Import Page Builder</a></div>');
      customPageContent = allContent.html();
      $.cookie('custom-admin', 'machin');

      var blob = new Blob([adminHeader + customPageContent + adminFooter], {type: "application/xhtml+xml;charset=charset=utf-8"});
      saveAs(blob, fileName+".html");
      fileName = '';

      if(sidebarIsFixed == true) handleSidebarFixed(); 

      
      $('#modal-export-template').modal('hide');

      var tl = new TimelineLite();
      tl.to($('.step-theme'), 0.4, {css: {scaleX:0.8,scaleY:0.8, autoAlpha:0,display:"none"},ease: Circ.easeInOut}, "step+=0.2")
      .to($('.step-final'), 0.4, {css: {scaleX:1,scaleY:1,autoAlpha:1,display:"block"},ease: Circ.easeInOut,
        onComplete: function(){ 
          docHeight = $(document).height();
          if(!$('body').hasClass('sidebar-light')) $sidebar.height(docHeight); 
        }}, "step+=0.8");



  });


  $('#go-page-builder').on('click', function(e){
      e.preventDefault();
      var pageTemplate = $.cookie('custom-admin');
      console.log($.cookie('custom-admin'));

  });










});     
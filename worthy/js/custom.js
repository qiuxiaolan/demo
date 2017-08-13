
(function($){
    $(document).ready(function(){
    
        $(".banner-image").backstretch(WorthyData.site.imgs,{duration:5000,fade: 1500});
        
        // Fixed header
        //-----------------------------------------------
        $(window).scroll(function() {
            if (($(".header.fixed").length > 0)) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

        $(window).load(function() {
            if (($(".header.fixed").length > 0)) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

        //Scroll Spy
        //-----------------------------------------------
        if($(".scrollspy").length>0) {
            $("body").addClass("scroll-spy");
            $('body').scrollspy({ 
                target: '.scrollspy',
                offset: 152
            });
        }

        //Smooth Scroll
        //-----------------------------------------------
        if ($(".smooth-scroll").length>0) {
            $('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top-151
                        }, 1000);
                        return false;
                    }
                }
            });
        }

        // Animations
        //-----------------------------------------------
        if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
            $("[data-animation-effect]").each(function() {
                var $this = $(this),
                animationEffect = $this.attr("data-animation-effect");
                if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
                    $this.appear(function() {
                        setTimeout(function() {
                            $this.addClass('animated object-visible ' + animationEffect);
                        }, 400);
                    }, {accX: 0, accY: -130});
                } else {
                    $this.addClass('object-visible');
                }
            });
        };

        // Isotope filters
        //-----------------------------------------------
        if ($('.isotope-container').length>0) {
            $(window).load(function() {
                $('.isotope-container').fadeIn();
                var $container = $('.isotope-container').isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: 'masonry',
                    transitionDuration: '0.6s',
                    filter: "*"
                });
                // filter items on button click
                $('.filters').on( 'click', 'ul.nav li a', function() {
                    var filterValue = $(this).attr('data-filter');
                    $(".filters").find("li.active").removeClass("active");
                    $(this).parent().addClass("active");
                    $container.isotope({ filter: filterValue });
                    return false;
                });
            });
        };

        //Modal
        //-----------------------------------------------
        if($(".modal").length>0) {
            $(".modal").each(function() {
                $(".modal").prependTo( "body" );
            });
        }

    }); // End document ready
})(this.jQuery);
var CustomJs = function () {
 // handle go to top button
    var handleGo2Top = function () {       
        var Go2TopOperation = function(){
            var CurrentWindowPosition = $(window).scrollTop();// current vertical position
            if (CurrentWindowPosition > 300) {
                $(".go2top").show();
            } else {
                $(".go2top").hide();
            }
        };

        Go2TopOperation();// call headerFix() when the page was loaded
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            $(window).bind("touchend touchcancel touchleave", function(e){
                Go2TopOperation();
            });
        } else {
            $(window).scroll(function() {
                Go2TopOperation();
            });
        }

        $(".go2top").click(function(e) {
            e.preventDefault();
             $("html, body").animate({ scrollTop: 0 }, 600);
        });
    }
    return {
        init: function () {
            handleGo2Top();
        }
    };
}();

var WorthyPage=function(){
    var initSite=function(){
        $("#logo").attr("src",WorthyData.site.logo);
        $("#favicon").attr("href",WorthyData.site.logo);
        $("div.site-name>a").html(WorthyData.site.title);
        $("div.site-slogan").html(WorthyData.site.subTitle);
    };
    var initMenu=function(){
        $("ul>li>a[href=#banner]").html(WorthyData.home.name);
        $("ul>li>a[href=#about]").html(WorthyData.about.name);
        $("ul>li>a[href=#services]").html(WorthyData.services.name);
        $("ul>li>a[href=#portfolio]").html(WorthyData.portfolio.name);
        $("ul>li>a[href=#clients]").html(WorthyData.clients.name);
        $("ul>li>a[href=#contact]").html(WorthyData.contact.name);
    };
    var initBanner=function(){
        $("#banner_content>h1").html(WorthyData.banner.head);
        $("#banner_content>p").html(WorthyData.banner.introduction);
    };
    var initAbout=function(){
        $("#about").html(WorthyData.about.title);
        $("#aboutSubTitle").html(WorthyData.about.subTitle);
        if(WorthyData.about.img1Url){
            $("#aboutImg1").attr("src",WorthyData.about.img1Url);
        }
        $("#aboutDesc").html(WorthyData.about.desc);
        $.each(WorthyData.about.descList,function(i,e){
            $("#aboutDescList").append("<li><i class='fa fa-caret-right pr-10 text-colored'></i>"+e+"</li>");
        });
        $("#aboutExtTitle").html(WorthyData.about.extTitle);
        $("#aboutExtContent").html(WorthyData.about.extContent);
        $.each(WorthyData.about.extQuestions,function(i,e){
            var item='<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading_about_ext'+i+'"><h4 class="panel-title">';
            item+='<a '+(i>0?'class="collapsed"':'')+' data-toggle="collapse" data-parent="#accordion" href="#collapse_about_ext'+i+'" aria-expanded="'+(i==0?'true':'false')+'" aria-controls="collapse_about_ext'+i+'">';
            item+=e.ask;
            item+='</a></h4></div><div id="collapse_about_ext'+i+'" class="panel-collapse collapse '+(i==0?'in':'')+'" role="tabpanel" aria-labelledby="heading_about_ext'+i+'"><div class="panel-body">';
            item+=e.answer+'</div></div></div>';
            $("#accordion").append(item);
        });                                 
    };
    var initServices=function(){
        $("#services").html(WorthyData.services.title);
        $.each(WorthyData.services.serviceItems,function(i,e){
            if (i%2==0) {
                $("#servicesCol1").append(getRightServiceItem(e));
            }else{
                $("#servicesCol2").append(getRightServiceItem(e));
            }
        });
    };
    var getLeftServiceItem=function(e){
        var html='<div class="media"><div class="media-body text-right"><h4 class="media-heading">'+e.title+'</h4>';
        html+='<p>'+e.content+'</p></div><div class="media-right"><i class="fa '+e.iconClass+'"></i></div></div>';
        return html;
    }
    var getRightServiceItem=function(e){
        var html='<div class="media"><div class="media-left"><i class="fa '+e.iconClass+'"></i></div><div class="media-body">';
        html+='<h4 class="media-heading">'+e.title+'</h4><p>'+e.content+'</p></div></div>';
        return html;
    }
    var initPortfolio=function(){
        $("#portfolio").html(WorthyData.portfolio.title);
        $("#portfolioSubTitle").html(WorthyData.portfolio.subTitle);
        $("#portfolioGroups").append('<li class="active"><a href="#" data-filter="*">所有</a></li>');
        $.each(WorthyData.portfolio.groups,function(i,e){
            $("#portfolioGroups").append('<li><a href="#" data-filter=".'+e.class+'">'+e.name+'</a></li>');
        });
        $.each(WorthyData.portfolio.items,function(i,e){
            var param='portfolio_item_'+i;
            var html='<div class="col-sm-6 col-md-3 isotope-item '+e.class+'"><div class="image-box"><div class="overlay-container">';
            html+='<img class="worthy-img" src="'+e.imgUrl+'" alt=""><a class="overlay" onclick="WorthyPage.showPortfolioModal('+i+')"';
            html+='<i class="fa fa-search-plus"></i><span>'+e.imgTitle+'</span></a></div>';
            html+='<a class="btn btn-default btn-block" onclick="WorthyPage.showPortfolioModal('+i+')">'+e.title+'</a></div></div>';
            $("#portfolioContainer").append(html);
        });
    }
    var showPortfolioModal=function(i){
        var e=WorthyData.portfolio.items[i];
        $("#pTitle").html(e.mTitle);                                              
        $("#pHead").html(e.mHead);                                              
        $("#pContent").html(e.mContent);                                              
        $("#pUrl").attr("src",e.imgUrl);
        $("#portfolioModal").modal("show");                                          
    };
    var initClients=function(){
        $("#clients").html(WorthyData.clients.title);
        var rowStart="<div class='row'>";
        var rowEnd='</div>';
        var html='';
        var closed=false;
        $.each(WorthyData.clients.comments,function(i,e){
            if(i%3==0){
                html+=rowStart;
                closed = false;
            }
            html+='<div class="col-md-4"><div class="media testimonial"><div class="media-left"><img class="worthy-img" src="'+e.img+'" alt=""></div>';
            html+='<div class="media-body"><h3 class="media-heading">'+e.title+'</h3><blockquote><p>'+e.detail+'</p>';
            html+='<footer>'+e.foot+'</footer></blockquote></div></div></div>';
            if (i%3==2) {
                html+=rowEnd;
                closed = true;
            }
        });
        if (!closed) {
            html+=rowEnd;
        }
        $("#clientComments").append(html);
        $.each(WorthyData.clients.clientLogos,function(i,e){
            $("#clientLogos").append('<div class="col-xs-2"><div class="list-horizontal-item"><img class="worthy-img" src="'+e.img+'" alt="client"></div></div>');
        });
        $("#clientCount").html(WorthyData.clients.clientCount+" 满意的客户！");
    };
    var initContact=function(){
        $("#contact").html(WorthyData.contact.title);
        $("#contactMsg").html(WorthyData.contact.msg);
        $("#contact_address").append(WorthyData.contact.address);
        $("#contact_tel").append(WorthyData.contact.tel);
        $("#contact_phone").append(WorthyData.contact.phone);
        $("#contact_mail").append(WorthyData.contact.mail);

        $.each(WorthyData.contact.socialInfo,function(i,e){
            $("#socialLinks").append('<li class="skype" ' + (i == 0 ? 'style="margin-left: 100px;"' : '') + '><a class="tooltips-ext" tooltip="&lt;img src=&#39;'+e.img+'&#39;&gt;&lt;br/&gt;' + e.title + '"><i class="fa ' + e.class + '"></i></a></li>');
        });

        //百度地图API功能  
        $("#mylocation").css("height",$("#leftContact").css("height"));
        var map = new BMap.Map("mylocation");
        window.map = map;
        var point = new BMap.Point(WorthyData.contact.map.point.x,WorthyData.contact.map.point.y);
        map.centerAndZoom(point, 16);
        map.addControl(new BMap.NavigationControl());      
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));     
        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {imageOffset: new BMap.Size(0, 0 - 10 * 25)}); 
        var marker = new BMap.Marker(point,{icon:myIcon,offset:new BMap.Size(2, -13)});
        var infoWindow = new BMap.InfoWindow("<b class='iw_poi_title' title='"+WorthyData.contact.map.title+"'>"+WorthyData.contact.map.title+"</b><div class='iw_poi_content'>"+WorthyData.contact.map.content+"</div>");  
        map.addOverlay(marker);
        marker.openInfoWindow(infoWindow);
        var label = new BMap.Label(WorthyData.contact.map.title,{"offset":new BMap.Size(8,-15)});
        label.setStyle({  
            backgroundColor: "#fcf8e3",
            borderColor:"#8C8C8C",  
            color:"#333",  
            cursor:"pointer"  
        });  
        marker.setLabel(label);  
        marker.addEventListener("click",function(){this.openInfoWindow(infoWindow);});
        marker.addEventListener("click",function(){this.openInfoWindow(infoWindow);});  
        infoWindow.addEventListener("open",function(){marker.getLabel().hide();});
        infoWindow.addEventListener("close",function(){marker.getLabel().show();});
        label.addEventListener("click",function(){marker.openInfoWindow(infoWindow);});
        window.onresize = function(){
            $("#mylocation").css("height",$("#leftContact").css("height"));
            map.reset();
        }
    };
    return{
        init:function(){
            initSite();
            initMenu();
            initBanner();
            initAbout();
            initServices();
            initPortfolio();
            initClients();
            initContact();
        },
        showPortfolioModal:function(i){
            showPortfolioModal(i);
        }
    }
}();

jQuery(document).ready(function() {
    $("#thisYear").html(new Date().getFullYear());
    $("#copyrightName").html(WorthyData.site.title);
    CustomJs.init();
    WorthyPage.init();
    $('.tooltips-ext').append("<span style='margin-bottom:20px;margin-left:-78px;'></span>");
    $('.tooltips-ext:not([tooltip-position])').attr('tooltip-position','top');
    $(".tooltips-ext").mouseenter(function(){$(this).find('span').empty().append($(this).attr('tooltip'));});
    
});
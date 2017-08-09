/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */
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
        if(!WorthyData.about.img1Url){
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
            html+='<img src="'+e.imgUrl+'" alt=""><a class="overlay" onclick="WorthyPage.showPortfolioModal('+i+')"';
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
            html+='<div class="col-md-4"><div class="media testimonial"><div class="media-left"><img src="'+e.img+'" alt=""></div>';
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
            $("#clientLogos").append('<div class="col-xs-2"><div class="list-horizontal-item"><img src="'+e.img+'" alt="client"></div></div>');
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
   CustomJs.init();
   WorthyPage.init();
});
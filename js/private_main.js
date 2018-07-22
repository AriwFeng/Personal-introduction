

$(function(){
    //启动电梯
    elevator.init();
});

  //建立轮播函数
function play(i){
    $('#slider>div').eq(i).animate({opacity:1},900).css('z-index',1).
		siblings().animate({opacity:0},1000).css('z-index',0);
    $('#slider_nav>li').eq(i).addClass('on').siblings().removeClass('on');
}
//设置轮播
var index=0;//播放第几图片
var count=3;//一共三张

//鼠标移入菜单的跳转轮播
$('#slider_nav>li').hover(function(){
    if(timer){clearInterval(timer)};
    index=$('#slider_nav>li').index(this);
    //一次性定时器
    timer=setTimeout(function(){
        play(index);
        //停止动画
        $('#slider').stop();
    },10);
},function(){
    clearInterval(timer);
    timer=setInterval(function(){
        play(index);
        index++;
        if(index==count){index=0};
    },2000);
});
//鼠标移入div停止轮播
/* $('#slider').hover(function(){
 if(timer){clearInterval(timer)};
 },function(){
 clearInterval(timer);
 timer=setInterval(function(){
 play(index);
 index++;
 if(index==count){index=0};
 },3000)
 });*/
//启动轮播定时器
var timer=setInterval(function(){
    play(index);
    index++;
    if(index==count){index=0};
},2000);












//设置时间轴
$('.cd-timeline-block').find('.cd-timeline-img, .cd-timeline-content').addClass('hidden_first');
$(window).on('scroll', function(){
	$('.cd-timeline-block').each(function(){
			
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()-160
				&& $(this).find('.cd-timeline-img').hasClass('hidden_first') ) {
				/*时间轴上小图片*/
				$(this).find('.cd-timeline-img').removeClass('hidden_first').addClass('small_imgIn');
				/*时间轴上大图片*/
				$(this).find('.cd-timeline-content').removeClass('hidden_first').addClass('big_imgIn');
			}
		})	
});

//设置电梯

function openLight(k){
   $($('.elev')[k]).addClass('activity').siblings().removeClass('activity');
   // console.log(k)
}
function getElemTop(elem){
    var sum=elem.offsetTop;
    while(elem.offsetParent!=null){
        sum+=elem.offsetParent.offsetTop;
        elem=elem.offsetParent;
    }
    return sum
}
//创建电梯对象
 var elevator= {
     DISTANCE: 0,
     DURATION: 1000,
     STEPS: 100,
     interval: 0,
     step: 0,
     timer: null,
     moved: 0,
     init: function () {

         this.interval=
             this.DURATION/this.STEPS;
         $(window).scroll(this.light.bind(this));
         $('.elev').click(this.scrollTo.bind(this));
     },
     //楼层亮灯函数
     light: function () {
        // console.log(scrollTop);
         //获取页面滚动距离兼容 火狐和IE
         var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
         if(0<=scrollTop&&scrollTop<600){
             openLight(0);
         }else if(600<=scrollTop&&scrollTop<1100){
             openLight(1);
         }else if(1100<=scrollTop&&scrollTop<3600){
             openLight(2);
         }else{
             openLight(3);
         }
     },
    //滚动到函数
     scrollTo:function(e){
         if(e && e.preventDefault) {
             //阻止默认浏览器动作(W3C)
             e.preventDefault();
         } else {
             //IE中阻止函数器默认动作的方式
             window.event.returnValue = false;
         }
         //e.preventDefault();
         //获取页面滚动距离兼容 火狐和IE
         var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
         if(this.timer==null){
             var target= e.target;
            if(target.nodeName=="A"){
                target=target.parentNode;
            }
            var n= $('.elev').index($(target));
             if(n==0){this.DISTANCE=-scrollTop;}else{
            this.DISTANCE=getElemTop($('.first')[n-1])-scrollTop;}
            if(this.DISTANCE>0){this.DISTANCE-=40;}
             if(this.DISTANCE<0){this.DISTANCE-=135;}
             this.step=
                 this.DISTANCE/this.STEPS;
             this.timer=setInterval(
                 this.scrollStep.bind(this),
                 this.interval
             );
         }
     },

     //滚动一步
     scrollStep:function(){
         window.scrollBy(0,this.step);
         this.moved++;
         if(this.moved==this.STEPS){
             //滚动完后的清除
             clearInterval(this.timer);
             this.timer=null;
             this.moved=0;
         }
     }

 };

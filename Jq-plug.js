/**
 * Created by Administrator on 2017/10/13.
 */
//五角星评论插件(全局调用)，ul和li实现的五角星，传入ul的jq对象即可，任意个数五角星都适用
$.fivePointedStar=function(ul_$Obj){
    var k=0,index;
    ul_$Obj.on("mouseenter","li",function(){
        $(this).text("★").prevAll("li").text("★").end().nextAll("li").text("☆");
    }).on("mouseleave",function(){
        if(k==0){
            $(this).children("li").text("☆").siblings("li").text("☆");
        }else{
            $(this).children("li").eq(index).text("★").prevAll("li").text("★").end().nextAll("li").text("☆");
        }
    }).on("click","li",function(){
        k=1;
        index=$(this).index();
        //如果不想用index做标记，可以用
        // 1.addClass（）添加一个类名做标记，用类选择器，需用到removeClass（）
        // 2.添加自定义attr（）做标记，用属性选择器，需用到removeAttr（）
        //3.添加data（）自定义数据做标记，但是需要map遍历找到index和removeData（）
        //同个事件可以绑定多个，依次执行
    })
};
//自动生成多个相同的儿子标签(可以含内容)(jq对象调用，原型函数)
$.fn.sons=function(html,num){//html的格式为<div></div>，即一个完整的标签，num为需要添加的个数
    for(var i=0;i<num;i++){
        $(this).append(html)
    }
};
//无缝轮播图插件，需要在首尾分别多添加一个“最后一张”和“第一张”图，从而实现无缝效果,lunUlObj对应很长的那个ul，circleUlObj对应圆圈li的ul，leftSpanObj,rightSpanObj对应左右箭头，currentClass代表圆圈li的样式，speed代表动画时长
$.circleImage=function (lunUlObj,circleUlObj,leftSpanObj,rightSpanObj,currentClass,speed) {
    var imgWidth=lunUlObj.find("img").width(),
        liNum=lunUlObj.find("img").length-2,
        target=(-1)*imgWidth;//存放目标位置，也即是当前位置;
    lunUlObj.css("left",(-1)*imgWidth);
    circleUlObj.on("mouseenter","li",function(){
        target=$(this).index()*(-1)*imgWidth+(-1)*imgWidth;//获取当前li对应的target
        lunUlObj.stop().animate({left:target},speed);
        $(this).addClass(currentClass).siblings().removeClass(currentClass);
    })
    rightSpanObj.on("click",function(){
        if(target==liNum*(-1)*imgWidth){
            target-=imgWidth;
            lunUlObj.stop().animate({left:target},speed).animate({left:(-1)*imgWidth},0);//先正常滚动一个图片，然后一瞬间跳转到开头图片
            target=(-1)*imgWidth;//将当前位置设置为开头
        }else {
            target-=imgWidth;
            lunUlObj.stop().animate({left:target},speed)
        };
        circleUlObj.children("li").removeClass(currentClass).eq((target+imgWidth)/((-1)*imgWidth)).addClass(currentClass);
    });//(target+imgWidth)/((-1)*imgWidth)为当前li的index值
    leftSpanObj.on("click",function(){
        if(target==(-1)*imgWidth){
            target=0;
            lunUlObj.stop().animate({left:target},speed).animate({left:liNum*(-1)*imgWidth},0);//先正常滚动一个图片，然后一瞬间跳转到结尾图片
            target=liNum*(-1)*imgWidth;//将当前位置设置为结尾
        }else {
            target+=imgWidth;
            lunUlObj.stop().animate({left:target},speed)
        };
        circleUlObj.children("li").removeClass(currentClass).eq((target+imgWidth)/((-1)*imgWidth)).addClass(currentClass);
    })
};


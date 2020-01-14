// 底部选项卡
$('.public-welfare-tab li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.public-welfare-navcon').eq($(this).index()).addClass('active').siblings().removeClass('active');
})

//楼层跳跃
//点击跳转到相应的楼层
$('#backbox .louceng-item').click(function () { 
    // 利用楼层的下标找到每层楼距离顶部的距离 跳转到相应的位置即可
    let now = $('#main .floor-jump').eq($(this).index()).offset().top;
    window.scrollTo(0, now - 97);
    //点击到那个楼层高亮显示 
    $(this).addClass('active').siblings().removeClass('active');
});

// 滚动滚动条对应楼层高亮显示
window.onscroll = function () {
    let iH = window.scrollY;//获取滚动距离
    let len = $('#main .floor-jump').size();
    
    for(let i = 0; i < len; i++){
        let iTop = $('#main .floor-jump').eq(i).offset().top - 100;//距离顶部的距离
        if(iTop <= iH){
            $('#backbox .louceng-item').eq(i).addClass('active').siblings().removeClass('active');
        }
    }
};

//楼层回到顶部
$('#backbox .backtop').click(function () {
    let scrollTop = window.setInterval(function () {
        let gaodu = window.pageYOffset;
        if (gaodu > 0) {
            window.scrollTo(0, gaodu - 80);
        }
        else {
            window.clearInterval(scrollTop);
        }
    }, 5);
});


// 检测cookie是否存在
function init_cookie1() {
    let oldname = getCookie('name');
    if (oldname) {
        // 存在
        $('.g-reg').css('display', 'none');
        $('.g-welcome').html('OCJ会员，欢迎光临 OCJ.COM.CN');
        $('.g-login').html('退出').attr('href', 'html/main.html');
    } else {
        // 点击退出 清除cookie
        $('.g-reg').css('display', 'block');
        $('.g-login').html('登录').attr('href', 'html/login.html');
        $('.g-reg').html('注册').attr('href', 'html/register.html');
        $('.g-welcome').html('欢迎光临 OCJ.COM.CN');
    }
}
init_cookie1();

// 封装轮播图插件
function lunbo(obj){
    // 1.获取节点
    let wrap = document.getElementById(obj.ele);
    let len = obj.arrImg.length;
    let zIndex = 2;
    let now = 0;
    let timer = null;

    // 2.渲染数据
    let strBannerBox = "";
    let strTabBox = "";
    for(let i = 0; i < len; i++){
        strBannerBox += `<img src="${obj.arrImg[i]}" alt="">`;
        strTabBox += `<li></li>`;
    }

    let html = `<div class="banner-box">
                    ${strBannerBox}
                </div>
                <ul class="tablist">
                    ${strTabBox}
                </ul>
                <div class="prevbox btn">
                    <div class="jiantouimg"></div>
                    <div class="slicknumbut">
                        <span>${len}</span>/${len}
                    </div>
                </div>
                <div class="nextbox btn">
                    <div class="jiantouimg"></div>
                    <div class="slicknumbut">
                        <span>2</span>/${len}
                    </div>
                </div>`;
    wrap.innerHTML = html;

    // 2.渲染数据后获取相应的节点
    let imgBox = wrap.getElementsByClassName('banner-box')[0];
    let aImg = imgBox.getElementsByTagName("img");
    let tabBox = wrap.getElementsByClassName("tablist")[0];
    let aLi = tabBox.getElementsByTagName("li");
    let prevbox = wrap.getElementsByClassName("prevbox")[0];
    let nextbox = wrap.getElementsByClassName("nextbox")[0];
    let prevNum = prevbox.getElementsByTagName('span')[0];
    let nextNum = nextbox.getElementsByTagName('span')[0];

    // 3.让第一张图片和第一个li显示
    aImg[0].style.zIndex = 1;
    aLi[0].classList.add('active');
    
    // 开启定时器
    timer = setInterval(next, 3000);


    // 4.封装显示下一张图片的函数
    function next() {
        now++;
        tab();
        
    }
    function prev(){
        now--;
        tab();
    }
    function tab() {        
        if (now >= len) {
            now = 0;
        }else if (now < 0) {
            now = len - 1;
        }
        let false_prevNum = now;
        let false_nextNum = now + 2;

        if(false_prevNum == 0){
            false_prevNum = len;
        }
        if (false_nextNum == len + 1){
            false_nextNum = 1;
        }
        prevNum.innerHTML = false_prevNum;
        nextNum.innerHTML = false_nextNum;

        for(let i = 0; i < len; i++){
            aImg[i].style.zIndex = 0;
            aLi[i].classList.remove('active');
        }

        //让底下的图片显示出来
        aImg[now].style.zIndex = 1;
        // 渐隐渐现
        aImg[now].style.opacity = 0;
        startMove(aImg[now], { opacity: 100 });
        aLi[now].classList.add('active');
    }

    let leftArrow = prevbox.getElementsByClassName("jiantouimg")[0];
    let rigArrow = nextbox.getElementsByClassName("jiantouimg")[0];
    
    //鼠标移入计时器停止计时
    tabBox.onmouseover =  imgBox.onmouseover = function () {
        clearInterval(timer);
    };
    tabBox.onmouseout = imgBox.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(next, 3000);
    };

    wrap.onmouseenter = function () {
        prevbox.style.display = "block";
        nextbox.style.display = "block";
    }
    wrap.onmouseleave = function () {
        prevbox.style.display = "none";
        nextbox.style.display = "none";
    }
    prevbox.onmouseenter = function () {   
        clearInterval(timer);  
        leftArrow.style.background = "url(img/leftjiantouf.png) no-repeat";
        startMove(prevbox, { width : 73});
    }
    prevbox.onmouseleave = function () {
        timer = setInterval(next, 3000);
        leftArrow.style.background = "url(img/leftjiantou.png) no-repeat";       
        startMove(prevbox, { width : 27});
    }
    nextbox.onmouseenter = function () {
        clearInterval(timer);
        rigArrow.style.background = "url(img/rightjiantouf.png) no-repeat";
        startMove(nextbox, { width : 73});
    }
    nextbox.onmouseleave = function () {
        timer = setInterval(next, 3000);
        rigArrow.style.background = "url(img/rightjiantou.png) no-repeat";
        startMove(nextbox, { width : 27});
    }
    
    // 给小按钮绑定点击事件
    let index = 0;
    for(let i = 0; i < aLi.length; i++){
        aLi[i].onmouseover = function () {
            clearInterval(timer);
        }
        aLi[i].onmouseout = function () {
            timer = setInterval(next, 3000);
        }
        aLi[i].onclick = function () {
            now = i;
            tab();
        }
    }

    nextbox.onclick = next;
    prevbox.onclick = prev;

}

// 底层轮播图
lunbo({
    ele: 'header-banner',
    width: '100%',
    height: '500px',
    arrImg: ['img/1_20190819160931_83.jpg', 'img/1_20190823170432_46.jpg', 'img/1_20190823170049_16.jpg', 'img/1_20190823165833_28.jpg', 'img/1_20190820172932_90.jpg']
})

// 主播推荐
lunbo({
    ele: 'recommendbanner',
    width : '550px',
    height : '550px',
    arrImg: ['img/15315573-4L.jpg', 'img/15310043-3L.jpg', 'img/15240673-L.jpg', 'img/15317587-L.jpg', 'img/15320692-7L.jpg']
})

// 全球购
lunbo({
    ele: 'banner1',
    width: "400px",
    height : '280px',
    arrImg: ['img/2_20190201094721_13.jpg', 'img/2_20180813094948_86.jpg', 'img/2_20180608164802_69.jpg', 'img/2_20180313103359_30.jpg', 'img/2_20180717105738_77.jpg']
});

// 食品饮料
lunbo({
    ele :　'foodbanner1',
    width : '290px',
    height : '350px',
    arrImg: ['img/1_20170630133153_95.jpg', 'img/1_20170520094949_61.jpg', 'img/1_20170520095015_94.jpg']
});

// 家具厨房
lunbo({
    ele: 'foodbanner2',
    width: '290px',
    height: '350px',
    arrImg: ['img/1_20190816101437_82.jpg', 'img/1_20170616164648_26.jpg', 'img/1_20161021141539_73.jpg', 'img/1_20161010103926_16.jpg']
})
lunbo({
    ele: 'foodbanner3',
    width: '290px',
    height: '350px',
    arrImg: ['img/1_20180613150107_8.jpg', 'img/1_20160617140638_42.jpg', 'img/1_20170406140747_17.jpg']
});
lunbo({
    ele: 'foodbanner4',
    width: '290px',
    height: '350px',
    arrImg: ['img/1_20190823143109_72.jpg', 'img/1_20190802154217_64.jpg', 'img/1_20190820172451_10.jpg', 'img/1_20180104183153_83.jpg']
})
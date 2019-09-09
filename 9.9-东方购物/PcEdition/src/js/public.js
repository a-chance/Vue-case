(function () {
    // 该城市设置一个开关
    $('#header .header-start .g-area dd').data('istrue', true);

    function show_city() {
        // $('#header .header-start .g-area dd').css('display', 'block');
        if ($('#header .header-start .g-area dd').data('istrue')) {
            $('#header .header-start .g-area dd').css('display', 'block');
            $('#header .header-start .g-area dd').data('istrue', false);
        } else {
            $('#header .header-start .g-area dd').css('display', 'none');
            $('#header .header-start .g-area dd').data('istrue', true);
        }
    }
    $("#header .change").click(function(){
        show_city();
    });
    // 给城市绑定事件
    // 替换当前城市
    
    $('.hot-city a').click(function () {
        let val = $(this).html();
        $('.g-area dt .lb').html(val);
        $('#header .header-start .g-area dd').data('istrue', false);
        show_city();
    });

    $('.city-list span').click(function () {
        let val = $(this).html();
        $('.g-area dt .lb').html(val);
        $('#header .header-start .g-area dd').data('istrue', false);
        show_city();
    });

    // 检测cookie是否存在
    function init_cookie(){        
        let oldname = getCookie('name');
        if (oldname) {
            // 存在
            $('.g-reg').css('display', 'none');
            $('.g-welcome').html('OCJ会员，欢迎光临 OCJ.COM.CN'); 
            $('.g-login').html('退出').attr('href', '../main.html'); 
            $('.g-header-cart dt a').click(function () {
                $(this).attr('href', 'cart.html'); 
            })
        } else {
            // 点击退出 清除cookie
            $('.g-reg').css('display', 'block');
            $('.g-login').html('登录').attr('href', 'login.html');
            $('.g-reg').html('注册').attr('href', 'register.html');
            $('.g-welcome').html('欢迎光临 OCJ.COM.CN'); 
            $('.g-header-cart dt a').click(function () {
                alert("请先登录查看购物车！");
            })
        }
    }
    init_cookie();

    // 返回顶部轮播图
    let timer1 = null;
    let index = 0;
    function fn() {
        if (++index > $('.adver .banner img').size() - 1) {
            index = 0;
        }
        $('.adver .banner img').eq(index).addClass('active').siblings().removeClass('active');
        $('.adver .tablist li').eq(index).addClass('active').siblings().removeClass('active');
    }
    timer1 = setInterval(fn, 5000)

    // 给按钮绑定点击事件
    $('.adver .tablist li').click(function () {
        clearInterval(timer1);
        $(this).addClass('active').siblings().removeClass('active');
        $('.adver .banner img').eq($(this).index()).addClass('active').siblings().removeClass('active');
    })

    // 鼠标移入图片盒子清除定时器
    $('.adver').mouseover(function () {
        clearInterval(timer1);
    })
    $('.adver').mouseout(function () {
        clearInterval(timer1);
        timer1 = setInterval(fn, 5000)
    })
})();
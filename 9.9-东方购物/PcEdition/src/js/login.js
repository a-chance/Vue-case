(function () {
    // 轮播图
    var s1 = new Swiper('#swiper-container', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false//设置成拖拽后还能继续运行
        },
        loop: true,
        speed: 1000,
        pagination: {
            el: '.swiper-pagination'
        },
    });

    var oBox = document.getElementById('swiper-container');

    oBox.onmouseover = function () {//鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () {//鼠标经过离开
        s1.autoplay.start();
    }

    // 生成验证，码函数
    function init_code() {
        let code = ranCod();
        let color = ranColor("rgb");
        $('.yzm-img').css('color', () => color).html(code);
        $('.yzm').val("");
    }
    // 初始化
    init_code();
    // 1.点击随机切换验证码
    $('.change-yzm').click(() => init_code());

    // 2.输入验证码
    $('.yzm').on('input', function () {
        let val = $.trim($(this).val());
        let val2 = $.trim($('.yzm-img').html());

        // 3.输入验证码正确的话就发送ajax请求
        if (val.toLowerCase() == val2.toLowerCase()){
            $('.yzm-tips').css('display', 'none');

            $('#login-form .submit').click(function () {
                init();
                // $.ajax({
                //     'type': 'post',
                //     'url': '../api/login.php',
                //     'data': {
                //         'username': $('.username').val(),
                //         'pwd': $('.pwd').val()
                //     },
                //     'success': function (str) {
                //         console.log(str);
                //         if (str == 'yes') {
                //             $(location).attr('href', '../main.html');
                //         } else {
                //             alert("用户名或密码错误！");
                //         }
                //     }
                // })
            });
            // 给登录按钮绑定键盘事件
            $(window).keydown(function (event) {
                if (event.keyCode === 13) {
                    init();
                }
            })
        }else{
            $('.yzm-tips').css('display', 'block');
        }
    })

    // 定义一个自定义函数，点击登录按钮和回车键时发送ajax请求
    // 1.定义async函数
    // 2.用awiait关键字
    async function init() {
         let result = await new Promise( resolve => {
             let username = $('.username').val()
             $.ajax({
                 'type': 'post',
                 'url': '../api/login.php',
                 'data': {
                     'username': $('.username').val(),
                     'pwd': $('.pwd').val()
                 },
                 'success': function (str) {
                    let arr = JSON.parse(str);
                    let uid = arr[0].id * 1;
                    console.log(uid);

                    if (str) {
                        let oldname = getCookie('name')
                        if(oldname){
                            alert("你已处于登录状态，不能重新登录");
                        }else{
                            setCookie('name', username, 1);
                            setCookie('uid', uid, 1);
                            alert("登录成功");
                            $(location).attr('href', '../main.html');
                        }
                        
                     } else {
                         alert("用户名或密码错误！");
                     }
                 }
             })
         })
    };

    
})();
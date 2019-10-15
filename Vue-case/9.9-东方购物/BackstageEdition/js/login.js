(function () {
    // 定义一个自定义函数，点击登录按钮和回车键时发送ajax请求
    function init() {
        $.ajax({
            'type': 'post',
            'url': 'api/login.php',
            'data': {
                'username': $('.username').val(),
                'pwd': $('.pwd').val()
            },
            'success': function (str) {
                console.log(str);
                if (str == 'yes') {
                    $(location).attr('href', 'main.html');
                } else {
                    alert("用户名或密码错误！");
                }
            }
        })
    };

    $('#loginbox .login-btn').click(function () {        
        init();
    });
    // 给登录按钮绑定键盘事件
    $(window).keydown(function (event) {
        if(event.keyCode === 13){
            init();
        }        
    })

})();
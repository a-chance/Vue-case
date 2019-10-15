(function () {
    // 1.点击切换选项卡
    $('.tablist li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.content-bot .conbot-left').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    });

    let dataInfo = [
        {
            "tit": '手机号',
            "type": "text",
            "placeholder": "请输入手机号"
        },
        {
            "tit": '密码',
            "type": "password",
            "placeholder": "请输入密码"
        },
        {
            "tit": '确认密码',
            "type": "password",
            "placeholder": "请确认密码"
        },
    ];
    // 正则验证的reg参数
    let arrReg = ["phone","password", "confirm_pwd"];
    // 正则验证的提示信息
    let arrTips = [
        {
            "success": "验证成功！",
            "failure": "电话号码有误，请您重新输入！",
            "null": "电话号码不能为空"
        },
        {
            "success": "验证成功！",
            "failure": "密码不合法！",
            "null": "密码不能为空"
        },
        {
            "success": "验证成功！",
            "failure": "两次输入密码不同，请重新输入！",
            "null": "确认密码不能为空"
        }
    ];

    let dataLen = dataInfo.length;  // 获取数据长度
    let box = document.getElementsByClassName("register-item-form")[0];

    // 2.获取焦点后边框变成蓝色
    // 定义一个变量，用于存储输入验证成功的数量，如果合法数量 = inpu个数，就可以提交数据,让它跳转到主页面

    // 封装正则验证函数
    function checkInput(ele, reg, inf, msg) {
        ele.onfocus = function () {
            ele.style.borderColor = "#239cdc";
            ele.style.boxShadow = "0 0 6px #a6e0ff";
        }
        ele.onblur = function () {
            // inf.style.display = "block";
            ele.style.borderColor = "#c9c8cf";
            ele.style.boxShadow = "";
            var val = ele.value.trim();
            
            //1.非空验证
            if (val) {
                if (reg == "phone") {
                    // 如果验证的是用户名，那么就要从数据库中查询是否存在，
                    ajax({
                        'type': 'get',
                        'url': '../api/checkname.php',
                        'data': {
                            'phone': val
                        },
                        'success': str => {
                            if (str === 'no') {
                                inf.style.display = "block";
                                inf.innerHTML = "很抱歉，该手机号码已被使用";
                                ele.dataset.isok = false;
                                return;
                            } else {
                                inf.style.display = "block";
                                ele.dataset.isok = true;
                            }
                        }
                    });
                }
                // 验证如果密码 === 确认密码 
                if (reg == "confirm_pwd") {
                    let con = document.getElementsByClassName('inp')[1].value;
                    
                    if (con === val) {
                        inf.style.display = "none";
                        inf.innerHTML = msg.success;
                        ele.dataset.isok = true;
                    } else {
                        inf.style.display = "block";
                        inf.innerHTML = msg.failure;
                        ele.dataset.isok = false;
                    }
                    return; // 不论是否满足条件，后面正则验证都会执行一次判断，所以要在此做出判断
                }

                // 定义变量，存储正则验证后的布尔值
                var res = checkReg[reg](val);
                if (res) {
                    //符合规则
                    inf.style.display = "none";
                    inf.innerHTML = msg.success;
                    ele.dataset.isok = true;
                } else {
                    //不符合规则
                    inf.style.display = "block";
                    inf.innerHTML = msg.failure;
                    ele.dataset.isok = false;
                }
            } else {
                inf.style.display = "block";
                inf.innerHTML = msg.null;
                ele.dataset.isok = false;
            }
        }
    }

    // 开始正则验证,按需求添加
    let inp = box.getElementsByClassName("inp");
    let tips = box.getElementsByClassName("tips");
    
    for (let i = 0; i < dataLen; i++) {
        // 表单聚焦，边框变成蓝色
        inp[i].onfocus = function () {
            this.style.borderColor = "#207dff";
        }
        // 正则验证
        checkInput(inp[i], arrReg[i], tips[i], arrTips[i]);
    }

    // 4.给按钮绑定事件
    let tiaokuan = document.getElementsByClassName('tiaokuan')[0];
    let lisense = document.getElementById("lisense");
    let sub = box.getElementsByClassName("sub-sure")[0];
    // console.log(lisense.checked);
    
    // 判断密码强度
    let regPwd = document.getElementById("reg-pwd");
    let regpwdon = document.getElementsByClassName('pwd-bar-on')[0];
    /* 
        密码强度验证：
            * 如果全是数字 ----- 弱
            * 如果数字和字母下划线 ----中
            * 数字 字母 特殊字符 ---强
    */
    let reg1 = /^\S\d{5,19}$/;  // 纯数字
    let reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/; // 必须含有字母和数字
    let reg3 = /^(?![A-z0-9]+$)(?![A-z~@*()_]+$)(?![0-9~@*()_]+$)([A-z0-9~@*()_]{8,})$/; // 最少10位, 由大小字母 + 数字 + 特殊符号~@* ()_

    regPwd.oninput = function () {
        let val = regPwd.value;
        // console.log(val)
        if(reg1.test(val)){ // 弱
            startMove(regpwdon, {'width' : 60});
        } 
        if(reg2.test(val)) { // 中
            startMove(regpwdon, { 'width': 120 });
        }
        if (reg3.test(val)){
            startMove(regpwdon, { 'width': 179 });
        }
    }
    regPwd.onchange = function () {
        let val = regPwd.value;
        if(val == "")
            regpwdon.style.width = "0";
    }

    // 短信验证
    let getcode = document.getElementsByClassName('get-yzm')[0];
    let yzminp = document.getElementsByClassName('yzm-inp')[0];
    let codeyz = document.getElementsByClassName('codeyz')[0];
    
    // 点击获取短信验证码
    getcode.onclick = function () {        
        ajax({
            'type': 'post',
            'url': '../api/get_note.php',
            'data': {
                'userphone': "18209515484"
            },
            success: str => {
                let arr = JSON.parse(str);
                console.log(arr.phonecode);

                yzminp.onchange = function () {
                    let codeval = yzminp.value;
                    if (codeval == arr.phonecode) {
                        yzminp.dataset.istruecode = true;
                        codeyz.style.display = "none";
                    } else {
                        yzminp.dataset.istruecode = false;
                        codeyz.style.display = "block";
                    }
                }
            }
        })
    }
    
    
    // 提交按钮
    sub.onclick = function () {
        
        let sum = 0;
        for (let i = 0; i < dataLen; i++) {
            if (inp[i].dataset.isok === "true") sum++;
        }

        if (sum == dataLen && lisense.checked && yzminp.dataset.istruecode == "true") {
            let a = inp[0].value.trim();
            let b = inp[1].value.trim();
            console.log(a, b);
            
            ajax({
                'type': 'get',
                'url': '../api/reg.php',
                'data': {
                    'phone': a,
                    'pwd': b,
                },
                'success': str => {
                    // console.log(str);

                    if (str == 'yes') {
                        alert("注册成功！");
                        location.href = '../html/login.html';
                    } else {
                        alert("注册失败");
                    }
                }
            });
        } else {
            alert("请完善信息，重新提交");
        }
    }
})();
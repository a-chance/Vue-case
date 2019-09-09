(function () { 

    // 页面要渲染的表单
    let dataInfo = [
        {
            "tit": '用户名',
            "type": "text",
            "placeholder": "请输入用户名"
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
        {
            "tit": '手机号',
            "type": "text",
            "placeholder": "请输入手机号"
        },
        {
            "tit": '邮箱',
            "type": "text",
            "placeholder": "请输邮箱"
        },
    ];
    // 正则验证的reg参数
    let arrReg = ["username", "password", "confirm_pwd", "phone", "email"];
    // 正则验证的提示信息
    let arrTips = [
        {
            "success": "验证成功！",
            "failure": "用户名不合法！",
            "null": "用户名不能为空"
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
        },
        {
            "success": "验证成功！",
            "failure": "电话号码有误，请您重新输入！",
            "null": "电话号码不能为空"
        },
        {
            "success": "邮箱成功！",
            "failure": "邮箱不合法！",
            "null": "邮箱不能为空"
        },
    ];

    let dataLen = dataInfo.length;  // 获取数据长度
    let form = document.getElementById("form");

    // 1.渲染数据
    let constr = "";
    dataInfo.forEach((value) => {
        constr += `<div class="control-group">
                        <label class="control-label fl">${value.tit}：</label>
                        <input type="${value.type}" placeholder="${value.placeholder}" class="inp">
                        <p class="tips fl">${value.errorInfo}</p>
                    </div>`;
    });
    form.innerHTML = constr;

    // 2.获取焦点后边框变成蓝色,因为是新创建的节点，所以采用事件委托的方式绑定事件
    // 封装正则验证函数
    function checkInput(ele, reg, inf, msg) {
        ele.onblur = function () {
            inf.style.display = "block";
            ele.style.borderColor = "#E8E8E8";
            var val = ele.value.trim();
            //1.非空验证
            if (val) {
                if (reg == "username") {
                    // 如果验证的是用户名，那么就要从数据库中查询是否存在，
                    ajax({
                        'type': 'get',
                        'url': 'api/checkname.php',
                        'data': {
                            'username': val
                        },
                        'success': str => {
                            // console.log(str);                            
                            if (str === 'no') {  
                                console.log(1);
                                                              
                                inf.innerHTML = "*&nbsp;&nbsp;用户名已存在";
                                inf.style.color = "red";
                                ele.dataset.isok = false;
                                return;
                            } else {
                                ele.dataset.isok = true;
                            }
                        }
                    });
                }
                // 验证如果密码 === 确认密码 
                if (reg == "confirm_pwd") {
                    let con = ele.parentNode.previousElementSibling.children[1].value;
                    if (con === val) {
                        // inf.style.display = "block";
                        inf.innerHTML = "*&nbsp;&nbsp;" + msg.success;
                        inf.style.color = '#58bc58';

                        ele.dataset.isok = true;
                    } else {
                        // inf.style.display = "block";
                        inf.innerHTML = "*&nbsp;&nbsp;" + msg.failure;
                        inf.style.color = 'red';
                        ele.dataset.isok = false;
                    }
                    return; // 不论是否满足条件，后面正则验证都会执行一次判断，所以要在此做出判断
                }

                // 定义变量，存储正则验证后的布尔值
                var res = checkReg[reg](val);
                if (res) {
                    //符合规则
                    // inf.style.display = "block";
                    inf.innerHTML = "*&nbsp;&nbsp;" + msg.success;
                    inf.style.color = '#58bc58';
                    ele.dataset.isok = true;
                } else {
                    //不符合规则
                    // inf.style.display = "block";
                    inf.innerHTML = "*&nbsp;&nbsp;" + msg.failure;
                    inf.style.color = 'red';
                    ele.dataset.isok = false;
                }
            } else {
                // inf.style.display = "block";
                inf.innerHTML = "*&nbsp;&nbsp;" + msg.null;
                inf.style.color = 'red';
                ele.dataset.isok = false;
            }
        }
    }

    // 开始正则验证,按需求添加
    let inp = form.getElementsByClassName("inp");
    let tips = form.getElementsByClassName("tips");

    for (let i = 0; i < dataLen; i++) {
        // 表单聚焦，边框变成蓝色
        inp[i].onfocus = function () {
            this.style.borderColor = "#207dff";
        }
        // 正则验证
        checkInput(inp[i], arrReg[i], tips[i], arrTips[i]);
    }

    // 4.给按钮绑定事件
    let sub = document.getElementsByClassName("btn")[0];

    // 提交按钮
    sub.onclick = function () {
        let sum = 0;
        for (let i = 0; i < dataLen; i++) {
            if (inp[i].dataset.isok === "true") sum++;
        }
        // console.log(sum);
        // 如果sum==dataLen就插入注册信息
        if (sum == dataLen) {
            sub.style.disabled = false;

            let a = inp[0].value.trim();
            let b = inp[1].value.trim();
            let c = inp[3].value.trim();
            let d = inp[4].value.trim();
            
            ajax({
                'type': 'get',
                'url': 'api/user_add.php',
                data: {
                    'username': a,
                    'pwd': b,
                    'phone': c,
                    'email': d,
                },
                'success': str => {
                    // console.log(str);
                    if (str == 'yes') {
                        // alert("添加成功！");
                        custom.style = "display: block;";
                        mask.style = "display: block;";
                        cancelInfo.innerHTML = "添加成功，请点击确定继续操作！";
                        Pos_Mid();
                        sureBtn.onclick = function () {
                            location.href = 'user_manage.html';
                        }
                    }
                }
            });
        } else {
            // alert("请完善信息，重新提交");
            custom.style = "display: block;";
            mask.style = "display: block;";
            cancelInfo.innerHTML = "请完善信息，重新提交！";
            Pos_Mid();
        }
    }
})();
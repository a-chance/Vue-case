let tab = document.getElementById("tab");
let allSele = document.getElementById("allSele");
let revSele = document.getElementById("revSele");
let sele = tab.getElementsByClassName("sele");
let tbody = document.getElementById("tbody");

// 鼠标经过td让tr高亮显示
tab.onmouseover = (ev) => {
    if(ev.target.tagName.toLowerCase() == "td"){
        ev.target.parentNode.style.background = "#eee";
        ev.target.parentNode.style.boxShadow = "0 0 15px 3px #fff inset";
    }
}
tab.onmouseout = (ev) => {
    if (ev.target.tagName.toLowerCase() == "td") {
        ev.target.parentNode.style.background = "";
    }
}

// 1.全选
allSele.onclick = function () {
    for (let val of sele) {
        val.checked = this.checked;
    }
}
// 2.反选
revSele.onclick = function () {
    for (let val of sele) {
        val.checked = !val.checked;
    }
    check();
}
// 3.封装反选控制全选，单个选择控制全选
function check() {
    let num = 0;
    for (let val of sele) {
        if (val.checked) {
            num++;
        }
    }
    if (num === sele.length) {
        allSele.checked = true;
    } else {
        allSele.checked = false;
    }
}
// 4.单个点击后也能控制全选
for (let val of sele) {
    val.onclick = check;
}
// 分页
// 在此处要获取总的count
// 初始化页面
init();
function init() {
    ajax({
        type: 'post',
        url: 'api/user_manage.php',
        data: {
            sql: 'SELECT * from admin'
        },
        success: str => {
            let arr = JSON.parse(str);
            let count = arr.length;
            // 分页
            layui.use(['laypage', 'layer'], function () {
                var laypage = layui.laypage
                    , layer = layui.layer;

                //完整分页功能
                laypage.render({
                    elem: 'demo7'   // 节点id
                    , count: count     // 每页显示的条数
                    , layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                    //        [总条数， 上一页， 当前页数， 下一页， 每页显示的条数， 刷新， 跳转到第几页]
                    , jump: function (obj) {
                        let demo7 = document.getElementById("demo7"); //获取分页的节点
                        let currpageBox = demo7.getElementsByClassName("layui-laypage-curr")[0].children[1]; // 当前显示的页数
                        let option = demo7.querySelectorAll(".layui-laypage-limits select option");
                        // 封装获取显示条数的函数
                        function num(arr) {
                            for (let val of arr) {
                                if (val.selected) {
                                    // 定义正则，匹配数字
                                    let str = val.innerHTML.trim();
                                    let reg = /\d+/;
                                    return str.match(reg)[0] * 1;
                                }
                            }
                        }
                        /* 
                            1.发送ajax请求，查询数据库中的条数 
                            2. 数据库要返回的信息
                        */
                        // 渲染数据
                        function init1() {
                            // 获取每页显示的条数
                            let limit = num(option);
                            // 当前页数
                            let currpage = currpageBox.innerHTML * 1;
                            ajax({
                                'type': 'get',
                                'url': 'api/user_manage.php',
                                'data': {
                                    'sql': 'SELECT * from admin limit' + " " + (currpage - 1) * limit + ',' + limit
                                },
                                'success': str => {
                                    let arr = JSON.parse(str);
                                    let html = arr.map(item => {
                                        return `<tr>
                                            <td><input type="checkbox" class="sele"></td>
                                            <td>${item.id}</td>
                                            <td>${item.username}</td>
                                            <td>${item.pwd}</td>
                                            <td>${item.phone}</td>
                                            <td>${item.email}</td>
                                            <td class="btn-box">
                                                <input type="button" value="修改" class="copy btn">
                                                <input type="button" value="删除" class="del btn">
                                                <input type="button" value="保存" class="save btn" disabled="false">
                                            </td>
                                        </tr>`;
                                    }).join('');
                                    tbody.innerHTML = html;
                                    // 2.给修改，删除，保存按钮绑定事件
                                    let update = tbody.getElementsByClassName("copy");
                                    let del = tbody.getElementsByClassName("del");
                                    let save = tbody.getElementsByClassName("save");

                                    // 修改： 按钮绑定事件，并且传递 用户名、密码、电话、邮箱到update_user.htmlyemina
                                    for (let val of update) {
                                        val.onclick = function () {
                                            val.style.background = "#ccc";
                                            val.parentNode.children[2].style.background = "#58bc58";
                                            val.parentNode.children[2].removeAttribute("disabled");

                                            let userInf = this.parentNode.parentNode.children;
                                            let str = ""
                                            for (let i = 0; i < userInf.length; i++) {
                                                if (i == 0 || i == 1 || i == userInf.length - 1) {
                                                    userInf[i].title = "该选项不可编辑";
                                                } else {
                                                    userInf[i].setAttribute("contentEditable", "");
                                                }
                                            }
                                        }
                                    }

                                    // 删除： 按钮绑定事件，保存以后让td不可编辑，并且发送ajax请求修改到数据库中
                                    for (let val of del) {
                                        val.onclick = function () {
                                            // 获取要删除数据的id
                                            let id = val.parentNode.parentNode.children[1].innerHTML * 1;
                                            // 自定义弹窗，如果点击确定，就修改信息，如果点击取消就返回，不修改用户信息
                                            custom.style = "display: block;";
                                            mask.style = "display: block;";
                                            returnBtn.style.display = "block";
                                            cancelInfo.innerHTML = "信息一旦删除就无法恢复，您确定要删除吗？";
                                            document.body.style.overflow = "hidden";
                                            Pos_Mid();
                                            document.body.style.overflow = "scroll";
                                            sureBtn.onclick = function () {
                                                // 发送ajax请求
                                                ajax({
                                                    'type': 'post',
                                                    'url': 'api/user_del.php',
                                                    'data': {
                                                        'id': id,
                                                    },
                                                    'success': str => {
                                                        if (str == 'yes') {
                                                            location.href = "user_manage.html";
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }

                                    // 保存： 按钮绑定事件，保存以后让td不可编辑，并且发送ajax请求修改到数据库中
                                    for (let val of save) {
                                        val.onclick = function () {

                                            this.style.background = "#ccc";
                                            this.setAttribute("disabled", "disabled");
                                            val.parentNode.children[0].style.background = "rgb(0, 150, 136)";

                                            let userInf = this.parentNode.parentNode.children;
                                            for (let i = 2; i < userInf.length - 1; i++) {
                                                userInf[i].removeAttribute("contentEditable");
                                            }

                                            // console.log(userInf[2].innerHTML, userInf[3].innerHTML, userInf[4].innerHTML, userInf[5].innerHTML,);
                                            // 发送ajax请求
                                            ajax({
                                                'type': 'post',
                                                'url': 'api/user_update.php',
                                                'data': {
                                                    'id': userInf[1].innerHTML,
                                                    'username': userInf[2].innerHTML,
                                                    'pwd': userInf[3].innerHTML,
                                                    'phone': userInf[4].innerHTML,
                                                    'email': userInf[5].innerHTML,
                                                },
                                                'success': str => {
                                                    if (str == 'yes') {
                                                        // alert("修改成功！");
                                                        custom.style = "display: block;";
                                                        mask.style = "display: block;";
                                                        document.body.style.overflow = "hidden";
                                                        Pos_Mid();
                                                        document.body.style.overflow = "scroll";
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            });
                        }
                        init1();
                    }
                });
            });

        }
    });
}



/*
 * @Descripttion: 生成随机颜色
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-03 14:27:01
 */

 {
    function Colors(type) {
        let strColor = "#"; // 存储颜色值
        // 随机生成16进制颜色值
        if(type == "excolor"){
            let str = "0123465789abcdef";
            for (let i = 0; i < 6; i++) {
                strColor += str[i];
            }
            // console.log(strColor);
            return strColor;
        }
        // 随机生成rgb颜色值
        if(type == "rgb"){
            let r = Math.floor(Math.random() * 256),
                g = Math.floor(Math.random() * 256),
                b = Math.floor(Math.random() * 256);
            strColor = `rgb(${r}, ${g}, ${b})`;
            // console.log(strColor);
            return strColor;
        }
        return -1;
    }
 }

/*
 * @Descripttion: 生成任意范围(区间)的随机数
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
{
    function ranNum(min, max){
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        return num;
    }
}

/*
 * @Descripttion: 生成随机位数验证码（该函数严格区分大小写）
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
{
    function randomCode (count) {
        let str = "012456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";        
        let len = str.length;
        let code = "";
        for(let i = 0; i < count; i++){
            let index = Math.floor(Math.random() * len);
            code += str[index];
        }
        return code;
    }
}
/*
 * @Descripttion: 数组去重函数
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
{
    function Arr_Norepeat(arr) {
        let res = [];
        arr.forEach((val, index) => {
            if (arr.indexOf(val) === index) {
                res.push(val);
            }
        })
        return res;
    }
}

/*
 * @Descripttion: 过滤敏感词
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
// 参数1:敏感词数组     参数2：正则表达式      参数3：要取代的内容
{
    function Filter_Words(words, rep, str) {
        // var arr = ['傻', '逼', '猪', '爸', '操', '妈', '狗', 'fuck', '智障', '屎'];
        let reg = new RegExp(words, "ig");
        let str1 = "";
        for (let i = 0; i < words.length; i++) {
            str = str.replace(words[i], rep);
        }
        return str;
    }
}

/*
 * @Descripttion: 字符串格式数据转成对象格式的数据
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */

//  字符串格式数据转换成对象格式数据
{
    function Str_Trans_Obj (str) {
        let obj = {};
        let arr = str.split("&");
        arr.forEach( val => {
            let arr1 = val.split("=");
            obj[arr1[0]] = arr1[1];
        })
        return obj;
    }
}

/*
 * @Descripttion: 对象格式数据转换成字符串数据
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
// 对象格式的数据转换成字符串数据
{
    function objToStr(obj) {
        let str = ""
        for (let item in obj) {
            str += item + "=" + obj[item] + "&";
        }
        return str.slice(0, -1);
    }
}


/*
 * @Descripttion: 获取最终显示的样式 (行内样式 || 内部样式 || 外部样式) 
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-07-23 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-07-23 17:47:33
 */
// 传2个参数表示获取，3个参数表示设置，最多只能穿3个参数
{
    function css() {
        // 如果传入两个参数，就是获取样式，注意每次只能获取一条样式
        if (arguments.length === 2) {
            if (getComputedStyle(arguments[0], false)) {
                return getComputedStyle(arguments[0], false)[arguments[1]];
            } else {
                return arguments[0].currentStyle[arguments[1]];
            }
            return 
        } else if (arguments.length === 3) {    // 为了安全起见，严格确定参数的个数
            arguments[0].style[arguments[1]] = arguments[2];
            return arguments[0].style[arguments[1]] = arguments[2];
        }
    }
}

/*
 * @Descripttion: 毫秒数 ==> xx年xx月xx日xx时xx分xx秒
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-08-03 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-08-03 17:47:33
 */
{
    // 补0函数
    function addZero(num) {
        if (parseInt(num) < 10) {
            num = '0' + num;
        }
        return num;
    }
    // 转换日期
    function getMyDate(num) {
        var date = new Date(num),
            oYear = date.getFullYear(),
            oMonth = date.getMonth() + 1,
            oDay = date.getDate(),
            oHour = date.getHours(),
            oMin = date.getMinutes(),
            oSen = date.getSeconds(),
            oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
                addZero(oMin) + ':' + addZero(oSen);
        return oTime;
    }
}

/*
 * @Description: 封装正则验证
 * @Author: wangweiguo
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */
var checkReg = {
    username: function (str) {
        var reg = /^[\u4E00-\u9FA5\w]{2,15}$/;
        return reg.test(str);
    },
    password: function (str) {
        var reg = /^[\w]{1,17}$/;
        return reg.test(str);
    },
    confirm_pwd: function (str) {
        var reg = /^[\w]{5,17}$/;
        return reg.test(str);
    },
    nickname: function (str) {
        var reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        return reg.test(str);
    },
    realkname: function (str) {
        var reg = /^[\u4e00-\u9fa5]{0,}$/;
        return reg.test(str);
    },
    email: function (str) {
        var reg = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    identity: function (str) { // 身份证
        var reg = /^\d{15}|\d{18}$/;
        return reg.test(str);
    },
    phone: function (str) {
        var reg = /^1[3-9]\d{9}$/; //手机号
        return reg.test(str);
    },
    birthday: function (str) { // 生日
        var reg = /^\d{4}-\d{1,2}-\d{1,2}/;
        return reg.test(str);
    }
}
/*
 * @Description: 封装表单验证
 * @Author: wangweiguo
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function checkInput(ele, reg, inf, meg) {
    /*
        参数一：ele 要正则验证的表单
        参数二：reg 正则不同
        参数三：inf 提示信息节点不同
        参数四：meg 提示信息不同,对象{
            success : "验证成功",
            failure : "验证失败",
            null : "不能为空"
        }
    */
    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index;//用自定义属性的值作为开关对象的属性名
        //1.非空验证
        if (val) {
            var res = checkReg[reg](val);
            if (res) {
                //符合规则
                inf.innerHTML = msg.success;
                inf.style.color = '#58bc58';
                ele.istrue = true;
            } else {
                //不符合规则
                inf.innerHTML = msg.failure;
                inf.style.color = 'red';
                ele.istrue = false;
            }
        } else {
            inf.innerHTML = msg.null;
            inf.style.color = 'red';
            ele.istrue = false;
        }
    }
}

/*
 * @Descripttion: ajax函数
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-08-03 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-08-03 17:47:33
*/
function ajax(opt) {
    //准备好默认参数(选填)
    let defaultobj = {
        data: '',
        asyn: true,
        failure: null,
    };
    Object.assign(defaultobj, opt); //用默认参数
    let xhr = new XMLHttpRequest();

    if (defaultobj.type.toLowerCase() == 'get') {
        //get走向
        if (defaultobj.data) {
            defaultobj.data = objToStr(defaultobj.data);
            defaultobj.url += '?' + defaultobj.data;
        }
        xhr.open('get', defaultobj.url, defaultobj.asyn); //建立连接
        xhr.send(null); //发送请求
    } else if (defaultobj.type.toLowerCase() == 'post') {
        //post走向
        xhr.open('post', defaultobj.url, defaultobj.asyn); //建立连接
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        defaultobj.data = objToStr(defaultobj.data);
        xhr.send(defaultobj.data); //发送请求
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                let data = xhr.responseText;
                // console.log(data);
                defaultobj.success(data);
            } else {
                if (defaultobj.failure) {
                    //说明写了回调函数
                    defaultobj.failure(xhr.status); //返回错误状态码
                }
            }
        }
    };
}

/*
 * @Descripttion: cookie的设置，取值，删除
 * @version: First edition
 * @Author: wangweiguo
 * @Date: 2019-08-03 17:47:33
 * @LastEditors: wangweiguo
 * @LastEditTime: 2019-08-03 17:47:33
*/
// 1.设置cookie
function setCookie(obj, time = 0) {
    // 获取cookie的有效期
    const timer = new Date(Date.now() + time * 1000 * 60 * 60 * 24).toUTCString();
    /* let date = new Date();
    date.setDate(date.getDate()+7); 这表示7天后失效*/

    for (let key in obj) {
        document.cookie = `${key}=${obj[key]};expires=${timer}`;
    }
}

// 2.获取cookie
function getCookie(attr){
    let arr1 = document.cookie.split("; ");
    
    for (let val of arr1) {
        let arr2 = val.split("=");
        if (arr2[0] == attr) {            
            return arr2[1];
        }
    }
}

// 3.删除cookie
function removeCookie(attr) {
    let obj = {};
    obj[attr] = "";
    setCookie(obj, -1);
}

 
/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-24 07:21:14
 * @LastEditTime: 2019-08-19 20:12:13
 * @LastEditors: Please set LastEditors
 */
//随机颜色
function ranColor(n) {
	if (n == 16) {
		var html = '0123456789abcdef';
		var res = '#';
		for (var i = 0; i < 6; i++) {
			var j = parseInt(Math.random() * html.length); //0-15
			res += html[j];
			// console.log(res);
		}
	} else if (n == 'rgb') {
		var r = parseInt(Math.random() * 256); //0-255
		var g = parseInt(Math.random() * 256);
		var b = parseInt(Math.random() * 256);
		var res = 'rgb(' + r + ',' + g + ',' + b + ')';
		// console.log(res);
	}
	return res;
}

/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-24 07:21:14
 * @LastEditTime: 2019-07-24 07:25:30
 * @LastEditors: Please set LastEditors
 */

//随机验证码
function ranCod() {
	var html = '0123456789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP';
	var res = '';
	for (var i = 0; i < 4; i++) {
		var j = parseInt(Math.random() * html.length);
		res += html[j];
		// console.log(res);
	}
	return res;
}
/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-24 07:21:14
 * @LastEditTime: 2019-07-24 07:25:30
 * @LastEditors: Please set LastEditors
 */

//输出任意范围的随机数
function ranNum(a, b) {
	if (a < b) {
		var res = parseInt(Math.random() * (b - a + 1)) + a;
	} else {
		var res = parseInt(Math.random() * (a - b + 1)) + b;
	}
	console.log(res);
	return res;
}

/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-24 07:21:14
 * @LastEditTime: 2019-07-24 07:25:30
 * @LastEditors: Please set LastEditors
 */

//输出最大值,输入的个数不确定，就用argumes
function ranCom() {
	for (var i = 0; i < arguments.length - 1; i++) {
		if (arguments[i] <= arguments[i + 1]) {
			var res = arguments[i + 1];
		} else {
			res = arguments[i];
		}
	}
	return res;
}
//获取id值
function getid(id) {
	return document.getElementById(id);
}

/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-26 15:58:34
 * @LastEditTime: 2019-07-26 15:58:34
 * @LastEditors: Please set LastEditors
 */

//数组去重
function norepeat(arr) {
	var newArr = []; //存放无重数组
	arr.forEach(function(item) {
		if (newArr.indexOf(item) == -1) {
			//查重
			newArr.push(item); //若无重，则压入newArr
		}
	});
	return newArr;
}

/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-26 15:58:34
 * @LastEditTime: 2019-07-26 15:58:34
 * @LastEditors: Please set LastEditors
 */
//去掉敏感字符
function dirWord(str) {
	var arr = ['傻', '逼', '猪', '爸', '操', '妈', '狗', 'fuck', '智障', '屎'];
	for (var i = 0; i < arr.length; i++) {
		var word = '';
		word = arr[i];
		var Reg = new RegExp(word, 'gi');
		str = str.replace(Reg, '*');
	}
	return str;
}

//字符串装换为对象
function strToObj(str) {
	var objs = {};
	var arr = str.split('&'); //分割之后存进数组
	arr.forEach(function(item) {
		var arr2 = item.split('=');
		objs[arr2[0]] = arr2[1];
	});
	return objs;
}
//对象转换成字符串(此处是域名，因此后面有一个&)
function objToStr(obj) {
	var str = '';
	for (var key in obj) {
		str += key + '=' + obj[key] + '&'; //key==属性名。传进来的是对象，在此处遍历然后转换为字符串
	}
	return str.slice(0, -1); //去掉最后一个字符（此处即&）
}

//将小于10的数补充0
function toDb(num) {
	if (num < 10) {
		return '0' + num;
	} else {
		return num;
	}
}

/*
 * @Description: My first common js document
 * @Author: 郑文
 * @Date: 2019-07-26 15:58:34
 * @LastEditTime: 2019-07-26 15:58:34
 * @LastEditors: Please set LastEditors
 */

//设置获取样/设置式函数

function css() {
	if (arguments.length == 2) {
		//要获取的样式的个数不确定，用argumes
		//获取样式
		if (getComputedStyle(arguments[0], false)) {
			//如果传两个参数，代表获取样式
			return getComputedStyle(arguments[0], false)[arguments[1]];
		} else {
			return arguments[0].currentStyle(arguments[1]);
		}
	} else if (arguments.length == 3) {
		//传入三个参数代表设置样式
		return (arguments[0].style[arguments[1]] = arguments[2]);
	}
}

//封装函数：给你毫秒数(纪元时间)-转成  xx年xx月xx日xx时xx分xx秒
function timeToStr(num) {
	//num是秒数    98876秒  有多少天： xx天xx时xx分xx秒
	var sec = parseInt(num % 60); //06 秒
	var min = parseInt((num / 60) % 60); //Math.floor(num / 60) % 60     分
	var hour = parseInt((num / 60 / 60) % 24); //时
	var day = parseInt(num / 60 / 60 / 24) % 30; //天数
	var mouth = parseInt((num / 3600 / 24 / 30) % 12); //月数
	var year = parseInt(num / 3600 / 24 / 365); //年数
	// var mon = toDb()
	var html = '';
	return year + '年' + mouth + '月' + day + '天' + hour + '小时' + min + '分' + sec + '秒';
}

//正则验证(表单)

var checkReg = {
	email: function(str) {
		var reg = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/; //y邮箱
		return reg.test(str);
	},
	phone: function(str) {
		var reg = /^1[3-9]\d{9}$/; //手机号
		return reg.test(str);
	},
	account: function(str) {
		var reg = /^[a-z][\w\-]{5,19}$/; //账号
		return reg.test(str);
	},
	name: function(str) {
		var reg = /^[\u2E80-\u9FFF]+$/; //昵称
		return reg.test(str);
	},
	birth: function(str) {
		var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/; //生日
		return reg.test(str);
	},
	idCard: function(str) {
		var reg = /^(\d{17}|\d{14})[\dx]$/; //身份证
		return reg.test(str);
	},
	password: function(str) {
		var reg = /^\S{6,20}$/; //密码
		return reg.test(str);
	},
	surePass: function(str) {
		var reg = /^\S{6,20}$/; //确认密码
		return reg.test(str);
	},
};
function checkInput(ele, reg, inf, meg) {
	/*
                参数一：ele 要正则验证的表单
                参数二：reg 正则不同
                参数三：inf 提示信息节点不同
                参数四：meg 提示信息不同,(对象)
    */

	ele.onblur = function() {
		//失去焦点时发生
		var val = ele.value.trim();
		var index = this.dataset.index; //用自定义属性的值作为开关对象的属性名
		//1.非空验证
		if (val) {
			//2.正则验证
			// var regEmail = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
			// var res = regEmail.test(email);
			// eval():把字符串转成js
			// var str = `checkReg.${reg}(val)`;//方法一：借助一个方法eval()
			var res = checkReg[reg](val); //方法二：利用对象属性名可以接收变量的特性实现
			// console.log(eval(str), res);
			// var res = reg(val);//实参
			// console.log(res);
			// var res = checkReg.email(val);
			if (res) {
				//符合规则
				inf.innerHTML = meg.success;
				inf.style.color = '#58bc58';
				ele.istrue = true; //挂载属性，其值为true
			} else {
				//不符合规则
				inf.innerHTML = meg.failure;
				inf.style.color = 'red';
				ele.istrue = false;
			}
		} else {
			inf.innerHTML = meg.null;
			inf.style.color = 'red';
			ele.istrue = false;
		}
	};
}

//运动框架
function startMove(obj, json, fnend) {
	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {
		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for (var key in json) {
			//key:键名   json[key] :键值
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if (key == 'opacity') {
				//初始值
				cur = css(obj, key) * 100; //透明度
			} else {
				cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的
			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6; //出现小数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			//保证上一个属性全部都达到目标值了
			if (cur != json[key]) {
				//width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if (key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100; //0-1
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height
			}
		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if (istrue) {
			//如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if (fnend) {
				//可选参数的由来
				fnend();
			}
		}
	}, 30); //obj.timer 每个对象都有自己定时器
}

//ajax函数框架封装
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

//传秒后转换成年月日时分秒格式
function getTime(sec) {
	//传秒数，转成：2019-06-25 14:00:00
	var date = new Date(sec * 1000);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var mins = date.getMinutes();
	var secs = date.getSeconds();
	return {
		year,
		month,
		day,
		hours,
		mins,
		secs,
	};
}

//封装cookie操作(设置，获取(修改) 删除)
//设置cookie
function setCookie(key, val, iDay) {
	//key：键名；val：键值；iDay：失效时间
	var now = new Date();
	now.setDate(now.getDate() + iDay);
	document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
}

function getCookie(key) {
	//获取cookie值
	var cookies = document.cookie; //name=malin; pwd=123456
	var arr = cookies.split('; '); //['name=malin','pwd=123456']
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('='); //['name','malin'
		if (key == arr2[0]) {
			return arr2[1];
		}
	}
}
//删除cookie
function removeCookie(key) {
	//删除：设置失效时间为过去的时间，立即失效
	setCookie(key, '', -1); //-1代表过去的时间，所以相当于直接将cookie设置为失效
}

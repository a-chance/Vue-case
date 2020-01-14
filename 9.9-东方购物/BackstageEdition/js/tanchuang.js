let mask = document.getElementsByClassName("mask")[0];
let custom = document.getElementsByClassName("custom-popup")[0];
let customTit = custom.getElementsByClassName("cancel-tit")[0];
let cancelInfo = document.getElementById("info");
let returnBtn = document.getElementsByClassName("return-btn")[0];
let sureBtn = document.getElementsByClassName("sure-btn")[0];

// 2.弹窗居中显示，并自适应浏览器窗口大小
function Pos_Mid() {
    let iLeft = (window.innerWidth - custom.offsetWidth) / 2;
    let iTop = (window.innerHeight - custom.offsetHeight) / 2;

    custom.style.left = iLeft + "px";
    custom.style.top = iTop + "px";
}
// 弹窗自适应
window.onresize = function () {
    Pos_Mid();
}

// 弹窗拖拽
customTit.onmousedown = function (ev) {
    ev = ev || window.ev;
    // 获取光标相对于可视区的距离
    let disX = ev.offsetX;
    let disY = ev.offsetY;

    document.onmousemove = function (ev) {
        let l = ev.clientX - disX;
        let t = ev.clientY - disY;

        if (l <= 0) {
            l = 0;
        } else if (l >= window.offsetX - custom.offsetWidth) {
            l = window.innerWidth - custom.offsetWidth;
        }
        if (t <= 0) {
            t = 0;
        } else if (t >= window.offsetY - custom.offsetHeight) {
            t = window.innerHeight - custom.offsetHeight;
        }

        custom.style.left = l + "px";
        custom.style.top = t + "px";
    }
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}

// 3.点击关闭按钮或者esc键可以关闭或者确定都是可以关闭的
function Cancel_Popup() {
    custom.style.display = "none";
    mask.style.display = "none";
}
// cancel.onclick = Cancel_Popup;
sureBtn.onclick = Cancel_Popup;
returnBtn.onclick = Cancel_Popup;
window.onkeyup = function (ev) {
    if (ev.keyCode === 27) {
        Cancel_Popup();
    }
}
(function () {
    function init_cart(){
        let uid = getCookie('uid');
        // console.log(uid);

        ajax({
            "type": 'get',
            'url': '../api/getdata_cart.php',
            'data': {
                'uid': uid
            },
            'success': data => {                
                let arr = JSON.parse(data);
                // console.log(arr);
                // 渲染数据
                let str = arr.map( val => {
                    let xiaoji = val.price * val.count;
                    return `<div class="product clearfix" gid=${val.id}>

                        <div class="cols1 fl">
                            <input type="checkbox"  class="fl sele" checked>

                            <div class="pic fl">
                                <img src="../img/${val.imgsrc}" alt="">
                            </div>

                            <div class="detail fl">
                                <p class="name clearfix">
                                    <em class="pre_icon tv"></em>
                                    <a target="blank" href="detail/15286862" title="${val.tit}">${val.tit}</a>
                                </p>
                                <p class="info">颜色/种类：<em>无</em></p>
                            </div>
                        </div>

                        <div class="cols2 fl">
                            <div class="jifen">
                                <span>${val.jifen}</span>
                            </div>
                        </div>

                        <div class="cols3 fl">
                            <div class="cols3-price">
                                ￥<span>${val.price}</span>
                            </div>
                        </div>

                        <div class="cols4 fl">
                            <div class="cols4-count clearfix">
                                <p class="mul num-opt">-</p>
                                <p class="count"contenteditable>${val.count}</p>
                                <p class="add num-opt">+</p>
                            </div>
                        </div>
                        <div class="cols5 fl">
                            <div class="cols5-total clearfix">
                               ￥<i style="font-style: normal;">${xiaoji}</i>
                            </div>
                        </div>
                        <div class="cols6 fl">
                            <div class="cols6-opt clearfix">
                               <div class="buy"></div>
                               <div class="del-box clearfix">
                                   <span class="s1">收藏</span>
                                   <span class="s2">删除</span>
                               </div>
                            </div>
                        </div>
                        <div class="cols7 fl"></div>
                    </div>`;
                }).join('');
                let sum = 0;
                arr.forEach( val => {
                    sum += val.count * 1;
                });
                $('#itemsCount').html(sum);

                $('.product-list').html(str);
                let tal = 0;
                for (let i = 0; i < $('.cols5-total i').size(); i++){
                    tal += $('.cols5-total i').eq(i).html() * 1
                }
                $('.p2 i').html(tal);

                //1.点击加减可以修改数量和小计
                function total(now, num) {//数量和小计的变化 now-点击的元素
                    //数量的变化,限购10件
                    let kuncun = 5;//data-num
                    if (num < 1) {
                        num = 1;
                    } else if (num > kuncun) {
                        num = kuncun;
                        alert("最多购买" + kuncun + "件");
                    }
                    $(now).parent().find('.count').html(num);

                    //小计=数量*单价
                    let price = $(now).parent().parent().prev().children(0).children(0).html();//单价
                    
                    let all = (num * price).toFixed(2);//小计
                    $(now).parent().parent().next().children(0).children(0).html(all);
                    allNum();
                }
                //点击加
                $('.product').on('click', '.add', function () {
                    let num = $(this).prev().html();
                    num++;
                    total($(this), num);                    
                });

                //点击减
                $('.product').on('click', '.mul', function () {
                    let num = $(this).next().html();
                    num--;
                    total($(this), num);
                });

                //删除当行 集合里面找集合
                $('.product-list').on('click', '.s2', function () {
                    // console.log($(this));
                    let ok = confirm('您确定要删我吗？');
                    if (ok) {
                        // 发送ajax请求，删除数据库中的数据    
                        let id = $(this).parents('.product').attr('gid');
                        $.ajax({
                            "type": 'get',
                            'url': '../api/del_cart.php',
                            'data': {
                                // DELETE FROM admin WHERE id = $id
                                'sql': 'DELETE FROM cart WHERE id = ' + id + " " + "and" + " " + "uid" + "=" + uid
                            },
                            'success': str => {}
                        });
                        $(this).parent().parent().parent().parent().remove();
                    }
                    allNum();
                });

                //复选框控制总量和总价
                function checkedArr() {
                    let arr = [];//存放勾选复选框的下标
                    $('.cols1 input').each(function (index, item) {
                        if ($(item).prop('checked')) {
                            //被勾选了
                            arr.push(index);
                        }
                    });
                    return arr;
                }
                
                function allNum() {
                    let checkall = checkedArr();//返回被勾选的下标数组
                    let num = 0;//放商品总数量
                    let total = 0;//放总价
                    checkall.forEach(function (item, index) {
                        num += $('.product-list .count').eq(checkall[index]).html() * 1;//累加
                        total += $('.cols5-total i').eq(checkall[index]).html() * 1;

                    });
                    console.log(total);
                    
                    $('#itemsCount').html(`${num}`);
                    $('.p2 i').html(`${total.toFixed(2)}`);

                    //控制全选按钮
                    let len = $('.product-list input').length;//复选框的个数
                    let achecknum = $('.product-list input:checked').length;
                    if (len == achecknum) {
                        //已经全选
                        $('.balance-wrap input').prop('checked', true);
                    } else {
                        $('.balance-wrap input').prop('checked', false);
                    }
                }

                // 单个选择
                $('.product-list').on('click', '.product input', function () {
                    allNum();
                });

                //全选功能
                $('.balance-wrap input').click(function () {
                    let isok = $('.balance-wrap input').prop('checked');
                    $('.product-list input').prop('checked', isok);
                    allNum();
                });

                //全删
                $('.empty').click(function () {
                    let checkall = checkedArr().reverse();//返回被勾选的下标数组
                    if (checkall.length == $('.product-list .product').length){
                        let ok = confirm('您确定要删除我们？');
                        if (ok) {
                            checkall.forEach(function (item, index) {
                                let id = $('.product').eq(index).attr('gid');                                
                                $.ajax({
                                    "type": 'get',
                                    'url': '../api/del_cart.php',
                                    'data': {
                                        // DELETE FROM admin WHERE id = $id
                                        'sql': 'DELETE FROM cart WHERE id = ' + id + " " + "and" + " " + "uid" + "=" + uid
                                    },
                                    'success': str => {
                                        location.href = "cart.html";
                                    }
                                });
                            });
                        }
                    }else{
                        alert("请全部选择删除的商品！");
                    }
                    allNum();
                    if ($('.product-list .add').size() == 0) {
                        //已经没有数据
                        $('.balance-wrap').css('display', 'none');
                    }
                });

                // 批量删除
                $('.batch-del').click(function () {
                    let checkall = checkedArr().reverse();//返回被勾选的下标数组
                    if (checkall.length) {
                        let ok = confirm('您确定要删除我们？');
                        if (ok) {
                            checkall.forEach(function (item, index) {
                                let id = $('.product').eq(index).attr('gid');
                                $.ajax({
                                    "type": 'get',
                                    'url': '../api/del_cart.php',
                                    'data': {
                                        // DELETE FROM admin WHERE id = $id
                                        'sql': 'DELETE FROM cart WHERE id = ' + id + " " + "and" + " " + "uid" + "=" + uid
                                    },
                                    'success': str => {
                                        location.href = "cart.html";
                                    }
                                });
                            });
                        }
                    } 
                    allNum();
                    if ($('.product-list .add').size() == 0) {
                        //已经没有数据
                        $('.balance-wrap').css('display', 'none');
                    }
                })

                // 给去结算按钮绑定事件
                $('.cols5-total').click(function () {
                    alert()
                })
            }
        });
    }
    init_cart();

    

    
})();
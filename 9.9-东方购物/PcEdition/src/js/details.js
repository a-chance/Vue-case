(function () {

    // 渲染数据
    let goodsId = Number(decodeURI(location.search.slice(1)));
    // console.log(goodsId);
    // 通过id查找数据库
    $.ajax({
        'type': 'get',
        'data': {
            'goodsId': goodsId
        },
        'url': '../api/de_getdata.php',
        'success': data => {
            // console.log(data);
            let arr = JSON.parse(data);
            console.log(arr);
            console.log(getCookie('uid'));
            
            let html = arr.map( val => {
                return `<div class="conl-left fl">
                            <div class="details-wrap">
                                <div class="img-box">
                                    <img src="../img/${val.imgsrc}" alt="">
                                    <div class="fdj"></div>
                                    <div class="mask"></div>
                                </div>
                                <div class="show-imgbox">
                                    <img src="../img/${val.imgsrc}" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="con1-rig fl">
                            <div class="row clearfix">
                                <dl class="key clearfix">
                                    <dt class="key">商品编号</dt>
                                    <dd>1519-4414</dd>
                                </dl>
                            </div>
                            <div class="row">
                                <dl class="key clearfix">
                                    <dt class="key">价格</dt>
                                    <dd style="color: #505966;">￥<span style="text-decoration: line-through;">78</span></dd>
                                </dl>
                                <dl class="key clearfix">
                                    <dt class="key">促销价</dt>
                                    <dd style="font-size: 24px;color: #ff0000;font-weight: bold;">￥${val.price}</dd>
                                </dl>
                                <dl class="key clearfix">
                                    <dt class="key">赠品</dt>
                                    <dd style="color: #000; font-size: 12px;">神仙盐焗鸭掌20g*4</dd>
                                </dl>
                            </div>
                            <div class="row">
                                <dl class="key clearfix">
                                    <dt class="key">
                                        配送
                                    </dt>
                                    <dd class="key">
                                        <select name="" id="">
                                            <option>上海</option>
                                        </select>
                                    </dd>
                                </dl>
                                <dl class="key clearfix">
                                    <dt class="key">服务</dt>
                                    <dd>
                                        由<a href="###" style="color: #ff0000;">优品一号专营店</a>配送并承担售后服务
                                    </dd>
                                </dl>
                                <dl class="key clearfix">
                                    <dt class="key">数量</dt>
                                    <dd>
                                        <p class="mul num-opt">-</p>
                                        <p class="count">1</p>
                                        <p class="add num-opt">+</p>
                                    </dd>
                                </dl>
                            </div>
                            <div class="row clearfix">
                                <div class="ljgm-btn">立即购买</div>
                                <div class="jrgwc-btn">加入购物车</div>
                                <div class="buy-code">
                                    <a href="###">APP下单享更多优惠</a>
                                    <img src="../img/15194414A.jpg" alt="">
                                </div>
                            </div>
                        </div>`;
            }).join('');
            
            $('.conl-topwrap').html(html);
            // 放大镜
            $('.img-box').on('mouseover', () => {
                $('.show-imgbox').css('display', 'block');
            })
            $('.img-box').on('mouseout', () => {
                $('.show-imgbox').css('display', 'none');
            })

            // 选项卡
            $('.tab-list li').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
            })

            // 吸顶菜单
            let iTop = $('.tab-list').offset().top;
            window.onscroll = function () {
                let iH = window.scrollY;
                if (iH >= iTop) {
                    $('.tab-list').css('position', 'fixed');
                } else {
                    $('.tab-list').css('position', 'static');
                }
            }

            // 获取加减按钮对象
            let addBtn = document.getElementsByClassName("add")[0],
                reduceBtn = document.getElementsByClassName("mul")[0],
                purchaseCount = document.getElementsByClassName("count")[0];

            // 给加减按钮绑定事件(限购5件)
            addBtn.onclick = function () {
                // 获取原始购买数量
                let num = Number(purchaseCount.innerHTML);
                if (++num <= 5) {
                    purchaseCount.innerHTML = num;
                    reduceBtn.style.backgroundColor = "#ccc";
                }
                // 等于5时让它出于禁用状态
                if (num >= 5) {
                    addBtn.style.backgroundColor = "#ededed";
                } else {
                    addBtn.style.backgroundColor = "#ccc";
                }
            }
            reduceBtn.onclick = function () {
                // 获取原始购买数量
                let num = Number(purchaseCount.innerHTML);

                // 超过2件时可以减少
                if (--num >= 1) {
                    purchaseCount.innerHTML = num;
                    addBtn.style.backgroundColor = "#ccc";
                }
                // 等于1时让它出于禁用状态
                if (num === 1) {
                    reduceBtn.style.backgroundColor = "#ededed";
                }
            }

            // 给加入购物车绑定事件
            $('.jrgwc-btn').on('click', function () {
                let uid = getCookie('uid');
                let count = $('.count').html() * 1;
                // 判断是否有用户登录
                if(uid){
                    // 存到数据库中                    
                    $.ajax({
                        'type': 'get',
                        'data': {
                            'id': arr[0].id, 
                            'uid': uid,
                            'tit': arr[0].tit, 
                            'price': arr[0].price, 
                            'jifen': arr[0].jifen, 
                            'imgsrc': arr[0].imgsrc,
                            'count' : count
                        },
                        'url': '../api/add_cart.php',
                        'success': str => {
                            // 通过用户id存储
                            if(str == 'yes'){
                                alert('添加成功');
                            }else{
                                alert('添加失败');
                            }

                        }
                    })
                }else{
                    // 存在cookie中
                    alert('亲爱的游客，您还没登录，请先登录！');
                    
                }
                
            })
        }
    });

})();
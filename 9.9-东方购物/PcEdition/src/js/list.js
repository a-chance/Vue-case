(function () {
    
    // 1.渲染数据
    // 获取对象
    let dressList = document.getElementsByClassName("goods-list-box")[0];

    function create(arr) {
        
        let str = arr.data.map(value => {
            return `<div class="goods-item">
                            <div class="goods-item-imgwrap">
                                <a href="###" class="img">
                                    <img src="../img/${value.imgsrc}" alt="">
                                </a>
                                <div class="newicon"></div>
                            </div>
                            <p class="line"></p>
                            <p class="title">
                                <a href="###">
                                    ${value.tit}
                                </a>
                            </p>
                            <p class="price">
                                ￥
                                <em>${value.price}</em>
                            </p>

                            <p class="jifen">
                                <span class="credit">${value.jifen}</span>
                            </p>

                            <div class="more-link">
                                <span class="add-cart">加入购物车</span>
                                <span class="look-details"></span>
                                <span class="add-collector"></span>
                                <span class="goods-pk"></span>
                            </div>
                        </div>`;
        }).join("");

        // 渲染分页
        // let str2 = 
        dressList.innerHTML = str;
        let goodsItem = document.getElementsByClassName('goods-item');

        // 跳转到详情页
        for (let i = 0; i < goodsItem.length; i++) {
            goodsItem[i].dataset.id = i + 1;
            goodsItem[i].onclick = function () {
                window.open('details.html?' + (i + 1));
            }
        }
    }
    // 初始化数据
    let ipage = 1; // 获取第一页的数据
    let num = 31; // 定义每页显示的条数
    function init() {
        
        ajax({
            "type": 'get',
            'url': '../api/getdata.php',
            'data': {
                'page': ipage,
                'num': num
            },
            'success': str => {
                let arr = JSON.parse(str);
                // 渲染数据
                create(arr);
            }
        })
    }
    init();
    // 循环绑定自定义属性
    for (let i = 0; i < $('.outborderbox').size(); i++) {
        $('.outborderbox').eq(i).data('isok', true);        
    }

    // 1.点击按钮切换排序
    $('.layer-iner-left .outborderbox').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        for (let i = 0; i < $('.operation-btn').length; i++){
            $('.operation-btn').eq(i).removeClass('active');
        }
        console.log($('.outborderbox').eq($(this).index()).data('isok'));
        
        if($('.outborderbox').eq($(this).index()).data('isok')){
            $('.operation-btn').eq($(this).index()).attr('class', 'operation-btn active').siblings().attr('class', 'operation-btn');
        }else{
            $('.operation-btn').eq($(this).index()).attr('class', 'operation-btn active2').siblings().attr('class', 'operation-btn');
        }
    })
    
    // 给价格排序绑定事件
    let order = "";
    $('.outborderbox').eq(1).click(function () {
        console.log($(this).data('isok'));
        
        if($(this).data('isok')){
            $(this).data('isok', false);
            order = 'desc';
        }else{
            $(this).data('isok', true);
            order = "asc";
        }
        
        $.ajax({
            "type": 'get',
            'url': '../api/order_price.php',
            'data': {
                'order': order
            },
            'success': str => {
                let arr = JSON.parse(str);                
                create(arr);
            }
        });
    })


})();
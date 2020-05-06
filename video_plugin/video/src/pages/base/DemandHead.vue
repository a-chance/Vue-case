<template>
	<div class="head_container">
		<div class="head_con_box">
			<img class="goback" :src="goBackImg">
			<div class="phone_wrap">
				<img class="phone" :src="phoneImg">
			</div>
			<div class="span_wrap">
				<span class="head_title">添喜lucklily</span>
				<span class="head_date">2019年11月25日|已编辑</span>
			</div>
			
			<div class="follow">关注</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				goBackImg: require('../../../static/imgs/back.png'),
				phoneImg: require('../../../static/imgs/phone.jpg')
			}
		},
	}
	
</script>
<style>
	.head_container{
		/* position: relative; */
		width: 100%;
		height: 71px;
	}

	
	.head_container .head_con_box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 71px;
		background-color: #FFFFFF;
		padding: 0 10px;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0 1px 2px -0.5px #EEEEEE;
	}
	
	.head_con_box .goback{
		width: 30px;
		height: 30px;
	}
	
	.head_con_box .phone_wrap{
		width: 50px;
		height: 50px;
		/* margin: 0 30px 0 20px; */
	}
	
	.head_con_box .phone_wrap .phone{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.span_wrap .head_title{
		display: block;
		color: #333333;
		font-size: 19px;
		line-height: 30px;
	}
	
	.span_wrap .head_date{
		display: block;
		margin-top: 2.5px;
		color: #C8C7CC;
		font-size: 13px;
		line-height: 15px;
	}
	
	.head_con_box .follow{
		width: 84px;
		height: 34px;
		border: 2px solid #e9703c;
		color: #e9703c;
		font-size: 14px;
		font-weight: 550;
		line-height: 34px;
		text-align: center;
		border-radius: 30px;
		letter-spacing: 2.5px;
	}
	
</style>
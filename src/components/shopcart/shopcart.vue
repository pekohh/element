<template>
  <div class="shopcart">
  	<!--购物车组件-->
	<div class="content" @click="toggleList">
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo" :class="{'highlight':totalCount>0}">
					<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
				</div>
				<div class="num" :class="{'highlight':totalCount>0}" v-show="totalCount>0">{{totalCount}}</div>
			</div>
			<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="content-right">
			<!--<div class="pay">还差￥{{minPrice}}元起送</div> -->
			<div class="pay" :class="payClass">{{payDesc}}</div>
		</div>
	</div>
	<!--购物车小球动画组件-->
	<div class="ball-container">
		<div v-for="ball in balls">
			<transition name="drop" @before-enter='beforeDrop' @enter="dropping" @after-enter="afterDrop">
				<div class="ball" v-show="ball.show">
					<div class="inner inner-hook"></div>
				</div>
			</transition>
		</div>
	</div>
	<!--购物车详情组件-->
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li v-for="food in selectFoods" class="food">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>

  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  data(){
  	return {
  		fold:true,//是否折叠
  		balls:[
	  		{
	  			show:false
	  		},
	  		{
	  			show:false
	  		},
	  		{
	  			show:false
	  		},
	  		{
	  			show:false
	  		},
	  		{
	  			show:false
	  		},	  			  			  		
  		],
  		dropBalls:[]
  	}
  },
  props:{
  	selectFoods:{
  		type:Array,
  		default(){
  			return [{price:10,count:1}]
  		}
  	},
  	deliveryPrice:{
  		type:Number,
  		default:0
  	},
  	minPrice:{
  		type:Number,
  		default:0
  	}
  },
  computed:{
  	//计算总价	
  	totalPrice(){
  		let total=0
  		this.selectFoods.forEach((food)=>{
  			total+=food.price*food.count
  		})
  		//console.log(total)
  		return total
  	},
  	//计算总数量
  	totalCount(){
  		let totalCount=0
  		this.selectFoods.forEach((good)=>{	
  			totalCount+=good.count
  		})
  		return totalCount
  	},
  	//计算右边三种不同的状态所对应的显示
  	payDesc(){
  		if(this.totalPrice===0){
  			return `￥${this.minPrice}元起送`
  		}else if(this.totalPrice<this.minPrice){
  			let diff=this.minPrice-this.totalPrice
  			return `还差￥${diff}元起送`
  		}else
  			{
  				return '去结算'
  			}
  	},
  	//计算右边不同状态所对应的属性名称
  	payClass(){
  		if(this.totalPrice<this.minPrice){
  			return 'not-enough'
  		}else{
  			return 'enough'
  		}
  	},
  	//购物车详情组件的显示与隐藏
  	listShow(){
  		if(!this.totalCount){
  			this.fold=true
  			return false
  		}
  		let show=!this.fold;
  		if(show){
  			this.$nextTick(function(){
  				if(!this.scroll){
  					this.scroll=new BScroll(this.$refs.listContent,{click:true})
  				}else{
  					this.scroll.refresh()
  				}
  			})
  		}
  		return show;
  	}
  },
  created(){
  	//console.log(this.selectFoods)
  },
  components:{
  	cartcontrol
  },
  methods:{
  	toggleList(){
  		if(!this.totalCount){
  			return
  		}
  		this.fold=!this.fold
  	},
  	drop(el){
  		console.log(el)//el指加号那个元素
  		for(let i=0;i<this.balls.length;i++){
  			let ball=this.balls[i]
  			//找到第一个为false的球
  			if(!ball.show){
  				ball.show=true
  				ball.el=el//设置这个ball的el属性值为传送的el值
  				//console.log(ball)//此时这个ball有两个属性值el,和show
  				this.dropBalls.push(ball)//把这个为true的ball放到dropBalls里面
  				return;
  			}
  		}
  	},
  	beforeDrop(el){
  		//console.log(el)//el指小球
  		let count=this.balls.length
  		while(count--){
  			let ball=this.balls[count];
  			//找到第一个为true的小球
  			if(ball.show){
  				//console.log(count)//0
  				//返回矩形对象,包含四个属性,left,top,right和bottom。
  				let rect=ball.el.getBoundingClientRect()
  				console.log(rect)//top:276,right:1151,bottom:312,left:1115
  				let x=rect.left-32//1083
  				let y=-(window.innerHeight-rect.top-22)//
  				el.style.display='';
  				el.style.webkitTransform=`translate3d(0,${y}px,0)`
  				el.style.transform=`translate3d(0,${y}px,0)`
  				let inner=el.getElementsByClassName('inner-hook')[0]
  				inner.style.webkitTransform=`translate3d(${x}px,0,0)`
  				inner.style.transform=`translate3d(${x}px,0,0)`
  			}
  		}
  	},
  	dropping(el,done){
	/* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
      	this.$nextTick(()=>{
      		el.style.webkitTransform='translate3d(0,0,0)'
  			el.style.transform='translate3d(0,0,0)'
  			let inner=el.getElementsByClassName('inner-hook')[0]
  			inner.style.webkitTransform='translate3d(0,0,0)'
  			inner.style.transform='translate3d(0,0,0)'
      	})
  	},
  	afterDrop(el){
  		let ball=this.dropBalls.shift()
  		if(ball){
  			ball.show=false
  			el.style.display='none'
  		}
  	}
  }

}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.shopcart
	position:fixed
	left:0
	bottom:0
	width:100%
	height:48px
	z-index:50
	background:#141d27
	color:rgba(255,255,255,0.4)
	font-size:0
	.content
		color: rgba(255, 255, 255, 0.4)
		font-size: 0
		display:flex
		background: #141d27       	
		.content-left
			flex:1
			.logo-wrapper
				position:relative
				top:-10px
				display:inline-block
				vertical-align:top
				width:56px
				height:56px
				margin:0 12px
				background:#141d27
				border-radius:50%
				padding:6px
				box-sizing:border-box				
				.logo
					width:100%
					height:100%
					background:#2b343c
					border-radius:50%
					text-align:center
					&.highlight
						background: rgb(0, 160, 220)
					.icon-shopping_cart
						font-size:24px
						line-height:44px
						color:#80858a
						&.highlight
							color:#fff
				.num
					position:absolute
					right:0
					top:0
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					background:rgb(240,20,20)
					box-shadow:0 4px 8px rgba(0,0,0,0.4)
			.price
				display:inline-block
				vertical-align:top
				margin:12px 0 0 12px
				line-height:24px
				font-size:10px
				&.highlight
					color:#fff
			.desc
				display:inline-block
				vertical-align:top
				margin:12px 0 0 12px
				line-height:24px
				font-size:10px
		.content-right
			flex:0 0 105px
			width:105px
			.pay
				height:48px
				line-height:48px
				text-align:center
				font-size:12px
				font-weight:700
				&.not-enough
					background:#2b333b
				&.enough
					color:#fff
					background:#00b43c
	.ball-container
		.ball
			position:fixed
			left:32px
			bottom:22px
			z-index:200
			transition:all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
			.inner
				width:16px
				height:16px
				border-radius:50%
				background:rgb(0,160,220)
				transition:all 0.4s linear
	.shopcart-list
		position:absolute
		left:0
		top:0
		z-index:-1
		width:100%
		transform:translate3d(0,-100%,0)
		&.fold-enter-active,&.fold-leave-active
			transition:all 0.5s
		&.fold-enter,&.fold-leave-active
			transform:translate3d(0,0,0)
		.list-header
			height:40px
			line-height:40px
			padding:0 18px
			background:#f3f5f7
			border-bottom:1px solid rgba(7, 17, 27, 0.1)
			.title
				float:left
				font-size:14px
				color:rgb(7,17,27)
			.empty
				float:right
				font-size:12px
				color:rgb(0,160,220)
		.list-content
			padding:0 18px
			max-height:217px
			overflow:hidden
			background:#fff
			.food
				position:relative
				padding:12px 0
				box-sizing:border-box
				border-1px(rgba(7,17,27,0.1))
				.name
					line-height:24px
					font-size:14px
					color: rgb(7, 17, 27)
				.price
					position:absolute
					right:90px
					bottom:12px
					line-height:24px
					font-size:14px
					font-weight:700
					color:rgb(240,20,20)
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 6px







</style>

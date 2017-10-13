<template>
  <div class="header">
  	<div class="content-wrapper">
  		<div class="avatar">
  			<img :src="seller.avatar" width="64" height="64"/>
  		</div>
  		<div class="content">
  			<div class="title">
  				<span class="brand"></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<div class="decription">
  				{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
  			<div class="support" v-if="seller.supports">
  				<sOffers class="icon" :num="seller.supports[0].type" :tag="1"></sOffers>
  				<span class="text">{{seller.supports[0].description}}</span>
  			</div>	
  		</div>
  		<div class="supports" v-if="seller.supports" @click='showDetail'>
  			<span class="count">{{seller.supports.length}}个</span>
  			<i class="icon-keyboard_arrow_right"></i> 		
  		</div>  		
  	</div>
  	<div class="bulletin-wrapper" @click='showDetail' >
  		<span class="bulletin-title"></span>
  		<span class="bulletin-text">{{seller.bulletin}}</span>
  		<i class="icon-keyboard_arrow_right"></i>
  	</div>
  	<div class="background">
  		<img :src="seller.avatar" width="100%" height="100%">
  	</div>
  	<transition name="fade">
  		<div class="detail" v-show="detailShow">
	  		<div class="detail-wrapper">
	  			<h1 class="name">{{seller.name}}</h1>
	  			<div class="star-wrapper">
	  				<v-star :size="48" :score="seller.score"></v-star>
	  			</div>
	  			<div class="title">
	  				<div class="line"></div>
	  				<div class="text">优惠信息</div>
	  				<div class="line"></div>
	  			</div>
	  			<ul class="supports">
	  				<li class="suports-item" v-for="(item,index) in seller.supports">
	  					<sOffers class="icon" :num="seller.supports[index].type" ></sOffers>
	  					<span class="text">{{item.description}}</span>
	  				</li>
	  			</ul>
	   			<div class="title">
	  				<div class="line"></div>
	  				<div class="text">商家公告</div>
	  				<div class="line"></div>
	  			</div> 
	  			<div class="bulletin">
	  				<p class="content">{{seller.bulletin}}</p>
	  			</div>		
	  		</div>
	  		<div class="detail-close" @click="hideDetail">
	  			<i class="icon-close"></i>
	  		</div>
  		</div>
  	</transition>
  </div>
</template>

<script type="text/ecmascript-6">
import sOffers from '../special-offers/special-offers.vue'
import star from '../star/star'
export default {
  data () {
    return {   
    	detailShow:false  
    }
  },
  components:{
  	'v-star':star,
  	'sOffers':sOffers
  },
  methods:{
  	showDetail(){
  		return this.detailShow=true
  	},
  	hideDetail(){
  		return this.detailShow=false
  	}
  },
  props:['seller'],
  created(){
  	this.classMap=['decrease','discount','guarantee','invoice','special']

  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.header
	position:relative
	width:100%	
	font-size:0
	background:rgba(0,0,0,0.3)
	color:#fff
	.content-wrapper
		padding: 24px 12px 18px 24px
		position:relative
		.avatar
			display:inline-block
			vertical-align:top
		.content
			margin-left:6px
			display:inline-block
			.title
				margin-bottom:6px
				.brand
					display:inline-block
					bg-image('brand')
					width:30px
					height:18px
					background-size:30px 18px 
					background-repeat:no-repeat
					margin-right:6px
					vertical-align:top
				.name
					display:inline-block
					font-size:18px
					line-height:18px
					font-weight:700
			.decription
				font-size:12px
				line-height:12px
				margin:5px 0
			.support
				margin:5px 0
				.icon
					display:inline-block
					background-size:12px 12px
					width:12px
					height:12px
					background-repeat:no-repeat
					vertical-align:top
					margin-right:4px										
				.text
					display:inline-block
					font-size:12px
					line-height:12px
		.supports
			position:absolute
			right:12px
			bottom:12px
			height:24px
			padding:0 8px
			line-height:24px
			border-radius:4px
			background: rgba(0, 0, 0, 0.2)	    
			.count
				font-size:10px
				display:inline-block
			.icon-keyboard_arrow_right
				display:inline-block
				font-size:10px
				text-align:center
	.bulletin-wrapper
		position:relative
		height:28px
		line-height:28px
		padding:0 22px 0 12px 
		background:rgba(7,17,27,0.2)
		white-space:nowrap
		overflow:hidden
		text-overflow:ellipsis
		.bulletin-title
			display:inline-block
			bg-image('bulletin')
			background-size:22px 12px
			width:22px
			height:12px
			margin-top:8px
			vertical-align:top
		.bulletin-text
			display:inline-block
			font-size:10px
			line-height:28px
			margin:0 4px
		.icon-keyboard_arrow_right
			display:inline-block
			font-size:10px
			text-align:center	
			position:absolute
			right:12px
			top:8px		
	.background
		position:absolute
		left:0
		top:0
		width:100%
		z-index:-1
		height:100%
		filter: blur(10px)
	.detail
		position:fixed
		left:0
		top:0
		width:100%
		height:100%
		background:rgba(0,0,0,0.7)
		z-index:100
		overflow: auto
		opacity:1
		&.fade-enter-active,&.fade-leave-active
			transition:all 0.5s 
		&.fade-enter,&.fade-leave-to
			opacity:0
			background:rgba(7,17,27,0)
		.detail-wrapper
			width:80%
			min-height: 100%
			margin:64px auto 0 auto
			padding-bottom:64px
			.name
				font-size:20px
				margin:50px auto
				text-align:center
			.star-wrapper
				width:100%
				text-align:center
			.title
				display:flex
				margin:30px 0
				.line
					flex:1
					border-bottom:1px solid #ccc
				.text
					flex:0 0 80px
					font-size:20px
					padding:0 20px
			.supports
				.suports-item
					.icon
						display:inline-block
						width:16px
						height:16px
						background-size:16px 16px
						background-repeat:no-repeat
						margin-right:4px
					.text
						display:inline-block
						font-size:14px
						line-height:14px
			.bulletin
				font-size:14px
				line-height:28px
		.detail-close
			position:relative
			width:32px
			height:32px
			margin:-64px auto 0 auto
			clear: both
			font-size:32px
				







</style>

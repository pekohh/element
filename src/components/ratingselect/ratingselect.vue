<template>
  <div class="ratingselect" >
   	<div class="rating-type border-1px">
   		<span class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}
   			<span class="count">{{ratings.length}}</span>
   		</span>
   		<span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}
   			<span class="count">{{positives.length}}</span>
   		</span>
   		<span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}
   			<span class="count">{{negatives.length}}</span>
   		</span>
   	</div>
   	<div class="switch"  @click="toggleContent($event)" :class="{'on':onlyContent}">
   		<span class="icon-check_circle"></span>
   		<span class="text" >只看有内容的评价</span>
   	</div>
  </div>
</template>

<script type="text/ecmascript-6">
const ALL = 2;
const POSITIVE=0
const NEGATIVE=1;
export default {
  data () {
    return {
    
    }
  },
  props:{
  	desc:{
  		type:Object,
  		default(){
  			return {
  				all:'全部',
  				positive:'满意',
  				negative:'不满意'
  			}
  		}
  	},
  	ratings:{
  		type:Array,
  		default(){
  			return []
  		}
  	},
  	selectType:{
  		type:Number,
  		default:ALL
  	},
  	onlyContent:{
  		type:Boolean,
  		defaut:false
  	}
  },
  methods:{
  	//选择以哪种形式显示内容(全部,推荐,吐槽)
  	select(type,event){
  		if(!event._constructed){
  			return;
  		}
  		console.log(type)
  		this.$emit('select',type)
  	},
  	//控制是否只显示有内容的信息
  	toggleContent(event){
  		if(!event._constructed){
  			return;
  		}
  		this.$emit('toggleContent')
  	}
  },
  computed:{
  	positives(){
  		
  		return this.ratings.filter((rating)=>{
  			 return rating.rateType===POSITIVE
  		})
  	},
  	negatives(){
  		return this.ratings.filter((rating)=>{
  			return rating.rateType===NEGATIVE
  		})
  	}
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.ratingselect
	.rating-type
		padding:18px 0
		margin:0 18px
		position:relative
		font-size:0
		border-1px(rgba(7,17,27,0.1))
		.block
			display:inline-block
			padding:8px 12px
			margin-right:8px
			line-height:16px
			border-radius:1px
			font-size:12px
			color:#4d555d
			&.positive
				background:rgba(0,160,220,0.2)
				&.active
					background: #00a0dc
					color:#fff
			&.negative
				background:rgba(77,85,93,0.2)
				&.active
					background:#00a0dc
					color:#fff
	.switch
		padding:12px 18px
		line-height:24px
		border-bottom:1px solid rgba(7,17,27,0.1)
		color:#93999f
		font-size:0
		&.on
			.icon-check_circle
				color: #00c850;
		.icon-check_circle
			display:inline-block
			vertical-align:top
			margin-right:4px
			font-size:24px
		.text
			display:inline-block
			vertical-align:top
			font-size:12px	
	

	
</style>

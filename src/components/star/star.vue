<template>
  <div class="star" :class="starType">
  	<span class="star-item" :class="item" v-for="item in starClasses"></span>
  </div>
</template>

<script type="text/ecmascript-6">

const CLS_ON='on'
const CLS_HALF='half'
const CLS_OFF='off'
const LENGTH=5
export default {
  data () {
    return {    
    }
  },
  props:['size','score'],
  computed:{
  	starType(){
  		return "star-"+this.size
  	},
  	starClasses(){
  		let result=[]
  		let score=Math.floor(this.score*2)/2
  		let hasDesc=score%1!==0
  		let isTege=Math.floor(this.score)
  		for(let i=0;i<isTege;i++){
  			result.push(CLS_ON)
  		}
  		if(hasDesc){
  			result.push(CLS_HALF)
  		}
  		while(result.length<LENGTH){
  			result.push(CLS_OFF)
  		}
  		return result
  	}
  }

}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.star
	font-size:0
	.star-item
		display:inline-block
	&.star-48
		.star-item
			width:20px
			height:20px
			background-size:20px 20px
			background-repeat:no-repeat
			margin-right:12px
			&:last-chile
				margin-right:0
			&.on
				bg-image('star48_on')
			&.half
				bg-image('star48_half')
			&.off
				bg-image('star48_off')
	&.star-36
		.star-item
			width:15px
			height:15px
			background-size:15px 15px
			background-repeat:no-repeat
			margin-right:6px
			&:last-chile
				margin-right:0
			&.on
				bg-image('star36_on')
			&.half
				bg-image('star36_half')
			&.off
				bg-image('star36_off')
	&.star-24
		.star-item
			width:10px
			height:10px
			background-size:10px 10px
			background-repeat:no-repeat
			margin-right:6px
			&:last-chile
				margin-right:0
			&.on
				bg-image('star24_on')
			&.half
				bg-image('star24_half')
			&.off
				bg-image('star24_off')
</style>

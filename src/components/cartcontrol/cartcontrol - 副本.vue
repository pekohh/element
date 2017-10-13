<template>
  <div class="cartcontrol">
  	<div class="cart-decrease" @click="decreaseCart(event)" v-show="food.count>0">
  		<span class="icon-remove_circle_outline"></span>
  	</div>
  	<div class="cart-count">{{food.count}}</div>
  	<div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  data () {
    return {
      
    }
  },
  props:{
  	food:{
  		type:Object
  	}
  },
  methods:{
  	addCart(event){
  		if(!event._constructed){
  			return
  		}
  		if(!this.food.count){
  			//this.food.count=1
  			Vue.set(this.food,'count',1)
  		}else{
  			this.food.count++
  		}
  		//console.log(this.food.count)
  		//console.log(this.food)
  	},
  	decreaseCart(){
  		if(!event._constructed){
  			return
  		}
  		if(this.food.count){
  			this.food.count--
  		}
  	}
  },
  created(){
  	//console.log(this.food)
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size:0
	.cart-decrease
		display:inline-block
		padding:6px
		.icon-remove_circle_outline
			padding: 6px;
		    line-height: 24px;
		    font-size: 24px;
		    color: #00a0dc;
	.cart-count
		display:inline-block
		vertical-align:top
		width:12px
		padding-top:6px
		line-height:24px
		text-align:center
		font-size:10px
		color:rgb(147,153,159)
	.cart-add
		display:inline-block
		padding:6px
		line-height:24px
		font-size:24px
		color:rgb(0,160,220)
</style>

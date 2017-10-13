<template>
  <div class="goods">
    <!-- 侧导航栏模块 -->
  	<div class="menu-wrapper" ref="menuWrapper" >
  		<ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px"><span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>{{item.name}}</span>
        </li>
      </ul>
  	</div>
    <!-- 商品列表模块-->
  	<div class="foods-wrapper" ref="foodsWrapper">
  		<ul>
  			<li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item"> 
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span >好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!-- 选取商品模块-->
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>  				
  		</ul>
  	</div>
    <!-- 购物车模块-->
    <shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
const ERR_NO=0
export default {
  data () {
    return {
      goods:[],
      listHeight:[],
      scrollY:0,
      selectedFood:{},
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  components:{ 
    shopcart,
    cartcontrol
  },
  created(){
  	this.classMap=['decrease','discount','guarantee','invoice','special']
  	this.$http.get('api/goods').then(function(res){
  		res=res.body
  		if(res.errno===ERR_NO){
  			this.goods=res.data
  			this.$nextTick(() => {
  				this._initScroll()
  				//this._ini()
  				this._calculateHeight()
  			}) 			
  		}
  	})
  },
  methods:{
  	_initScroll(){
      this.menuScroll=new BScroll(this.$refs.menuWrapper,{
         click:true//click: true 是否派发click事件
      })
      this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
         click:true,
         probeType: 3
         //probeType: 1 会截流,只有在滚动结束的时候派发一个 scroll 事件。
         //2在手指 move 的时候也会实时派发 scroll 事件，不会截流。 
         //3除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
      })
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight(){
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height=0
      this.listHeight.push(height)
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i]
        height+=item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index,event){
      if(!event._constructed){
        return
      }
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el=foodList[index]
      this.foodsScroll.scrollToElement(el,300)
    },
    selectFoods(){
     let foods=[]
      this.goods.forEach((good)=>{
         good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
        return foods;
        
    }
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i]
        let height2=this.listHeight[i+1]
        if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
          return i
        }
      }
      return 0      
    } 
  },
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods
  display:flex
  position:absolute
  left:0
  top:174px
  bottom:64px
  overflow:hidden
  .menu-wrapper
    flex:0 0 80px
    width:80px
    background: #f3f5f7
    .menu-item
      font-size:0
      display:table
      width:56px
      height:54px
      padding:0 12px
      &.current
        background: #fff
        font-weight: 700
        color:red
        .text
          font-weight: 700
          border-none()
      .text
        display:table-cell
        font-size:12px
        border-1px(#ccc)
        vertical-align:middle
        text-align:center
        .icon
          display:inline-block
          margin-right:2px
          vertical-align:top
          width:12px
          height:12px
          background-size:12px 12px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')            
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3') 
          &.special
            bg-image('special_3')   
  .foods-wrapper
    flex:1
    .title
      font-size:12px
      line-height:26px
      padding-left:14px
      height:26px
      colorg:rgb(147,153,159)
      background:#f3f5f7
      border-left: 2px solid #d9dde1
    .food-item
      display:flex
      margin:18px
      .icon
        flex:0 0 57px
        width:57px
        margin-right:10px
      .content
        position:relative
        flex:1
        .name
          margin:2px 0 8px 0
          height:14px
          line-height:14px
          color:rgb(7,17,27)
          font-size:14px
        .desc,.extra
          line-height:10px
          font-size:10px
          color:rgb(147,153,159)
        .desc
          line-height:12px
          margin-bottom:8px
        .extra
          margin-bottom:8px
          .count
            margin-right:12px
        .price
          font-weight:700
          line-height:24px
          .now
            margin-right:8px
            font-size:12px
            color:rgb(240,20,20)
          .old
            text-decoration:line-through
            font-size:10px
            color:rgb(147,153,159)
        .cartcontrol-wrapper
          position:absolute
          right:0 
          bottom:12px
</style>

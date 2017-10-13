<template>
<div>
    <div class="goods">
    <!-- 侧导航栏模块 -->
    <div class="menu-wrapper" ref="menuWrapper" >
      <ul>
       <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
       </li>
      </ul>
    </div>
    <!-- 商品列表模块-->
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</P>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">{{food.price}}</span><span class="old">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>                  
                </div>
              </li>
            </ul>
          </li>
        </ul>
    </div>
    <!-- 购物车模块-->
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcart>
  </div>
  <!-- 列表详情页面-->
  <food :food="selectedFood" ref="food"></food>
</div>
</template>

<script type="text/ecmascript-6">
import food from '../food/food'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import star from '../star/star'
const ERR_NO=0

export default {
  data(){
    return {
      goods:[],
      scrollY:0,
      listHeight:[],
      selectedFood:{}
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  components:{ 
    shopcart,
    cartcontrol,
    food
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
        click:true
      })
      this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
        click:true,
        probeType: 3
      })
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight(){
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height=0;
      this.listHeight.push(height)
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i]
        height+=item.clientHeight
        this.listHeight.push(height)
      }
      //console.log(this.listHeight)
    },
    selectMenu(index,event){
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el=foodList[index]
      this.foodsScroll.scrollToElement(el,300)
    },
    selectFood(food,event){
      if(!event._constructed){
        return;
      }
      this.selectedFood=food;
      this.$refs.food.show();
    },
    addFood(target){
      this._drop(target)
    },
    _drop(target){
      this.$refs.shopcart.drop(target)
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
      return foods
    }
  }
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
  width:100%
  font-size:0
  overflow:hidden
  .menu-wrapper
    flex:0 0 80px
    width:80px
    display:inline-block
    background: #f3f5f7
    .menu-item
      display:table
      width:56px
      height:54px
      padding:0 12px
      text-align:center
      &.current
        background:#fff
        font-weight:700
        color:#f60
        font-size:20px
      .text
        display:table-cell
        vertical-align:middle
        font-size:12px
        border-1px(#ccc)
        .icon 
          width:12px
          height:12px
          background-size:12px 12px
          margin-right:2px
          display:inline-block
          vertical-align:top
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
      padding-left:14px
      height:26px
      line-height:26px
      border-left:2px solid #d9dde1
      color: rgb(147, 153, 159)
      background:#f3f5f7
    .food-item
      margin:18px
      display:flex
      padding-bottom:18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        margin-bottom:0
        border-none()
      .icon
        flex:0 0 57px
        width:57px
        margin-right:10px
      .content
        flex:1
        .name
          margin: 2px 0 8px 0
          height:14px
          line-height:14px
          font-size:14px
          color: rgb(7, 17, 27)
        .desc,.extra
          font-size:10px
          line-height:10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right:2px
        .price
          font-weight:700
          line-height:24px
          margin-top:5px
          .now
            color: rgb(240, 20, 20)
            font-size:14px
            margin-right:8px
          .old
            font-size:10px
            text-decoration:line-through
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position:absolute
          right:0
          bottom:12px



</style>

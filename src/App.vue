<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to='/goods' class="tab-item">商品</router-link>
      <router-link to='/seller' class="tab-item">商家</router-link>
      <router-link to='/ratings' class="tab-item">评论</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header'
const ERRNO=0
export default {
  name: 'app',
  data(){
    return {
      seller:{}
    }
  },
  components:{
    'v-header':header
  },
  created(){
    this.$http.get('api/seller').then(function(res){
      res=res.body  
      //console.log(res)
      if(res.errno===ERRNO){
        this.seller=res.data;
       // console.log(this.seller)
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
.tab
  display:flex
  height:40px
  line-height:40px
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    color:#000
    flex:1
    text-align:center
    font-size:14px
    display:block
    &.router-link-active
          color: rgb(240, 20, 20)

</style>

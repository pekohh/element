<template>
  <div class="special-offers" :class="classMap[num]">
  	
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      classMap:['decrease','discount','guarantee','invoice','special']
    }
  },
  props:['num']
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.special-offers
	&.decrease
		bg-image('decrease_1')
	&.discount
		bg-image('discount_1')						
	&.guarantee
		bg-image('guarantee_1')
	&.invoice
		bg-image('invoice_1')	
	&.special
		bg-image('special_1')			
</style>

// 빛 투과율
<template>
  <div>
    빛 투과율
  </div>
</template>

<script>
export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    value: null,
    list: []
  }),
  methods: {
    init : function(){
       console.log('빛 투과율');
    }
  }
};
</script>


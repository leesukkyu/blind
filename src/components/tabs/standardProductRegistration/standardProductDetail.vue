// 제조품상세
<template>
  <div>
    제조품 상세 api 필요.
  </div> 
</template>

<script>
export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      console.log('제조품 상세');
    }
  }
};
</script>


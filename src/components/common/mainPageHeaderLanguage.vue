<template>
  <v-flex xs12>
    <v-select
      :items="states"
      v-model="lang"
      menu-props="auto"
      label="Select"
      prepend-icon="language"
      @change="change"
    ></v-select>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        lang: 'Korean',
        states: [
          'Korean', 'English', 'Chinese', 'Japanese'
        ]
      }
    },
    methods : {
      change : function(){
        switch(this.lang){
          case 'Korean' : this.$i18n.locale = 'korean'; break;
          case 'English' : this.$i18n.locale = 'english'; break;
          case 'Chinese' : this.$i18n.locale = 'chinese'; break;
          case 'Japanese' : this.$i18n.locale = 'japanese'; break;
        }
      }
    }
  }
</script>

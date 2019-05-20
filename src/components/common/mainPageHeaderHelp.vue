<template>
  <div style="margin-top:-8px;">
    <span>
      <v-tooltip bottom>
        <div slot="activator">
        <v-switch
          style="display:inline-block"
          color="teal"
          :label="$t('common.header.help')"
          :value="helpSettingValue"
          @click.stop="toggleHelpValue"
        ></v-switch>
        <v-icon
          color="yellow"
          medium
          style="display:inline-block;position:relative;top:-10px;right:-3px;"
        >speaker_notes</v-icon>
        </div>
        <span>{{ $t('help_msg.t1') }}</span>
      </v-tooltip>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    cbb: function() {
      console.log("xx");
      return "xx";
    }
  },
  computed: {
    helpSettingValue: function() {
      return this.$store.getters.getIni.help;
    }
  },
  methods: {
    toggleHelpValue: function() {
      this.$store.dispatch("changeHelp");
    }
  }
};
</script>

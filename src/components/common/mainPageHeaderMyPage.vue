<template>
  <div>
    <v-btn small class="mx-0" flat icon color="gray">
      <v-icon>lock_open</v-icon>
    </v-btn>
    <v-btn class="mx-0" flat color="gray">
      <v-icon>person_outline</v-icon>
      {{ user }}
    </v-btn>

    <v-btn class="px-0 mx-0" flat color="gray" style="min-width:20px;margin-top:6px;">
      <v-badge right>
        <v-icon>notifications_active</v-icon>
        <span slot="badge">2</span>
      </v-badge>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  computed: {
    user: function() {
      return this.$store.getters.getLoginInfo.loginInfo.app_company;
    }
  }
};
</script>


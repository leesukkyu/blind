<template>
  <div class="hello">
    <v-app>
      <v-container fill-height>
        <v-layout row wrap align-center justify-center>
          <v-flex xs6>
            <v-text-field v-focus v-model="id" :rules="[rules.required]" label="id"></v-text-field>
            <v-text-field v-model="password" :rules="[rules.required]" label="password"></v-text-field>
            <v-btn :loading="loading" @click="submitLogin" color="orange lighten-1 white--text" block>Login</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: function() {
    return {
      id: 'test',
      password: null,
      rules: {
        required: value => !!value || "Required."
      },
      loading : false
    };
  },
  methods: {
    submitLogin() {
      this.loading = true;
      this.$store
        .dispatch('login', {
          id: this.id,
          password: this.password
        }, function(){
          this.loading = false;
        })
    }
  }
};
</script>

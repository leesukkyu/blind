<template>
  <div>
    <v-layout absolute px-2 pt-2 text-xs-center row wrap>
      <v-flex pl-1 xs1>
        <main-page-header-language-wrap></main-page-header-language-wrap>
      </v-flex>
      <v-flex pl-3 xs7>
        <main-page-header-menu-list-wrap></main-page-header-menu-list-wrap>
      </v-flex>
      <v-flex pl-1 xs2>
        <main-page-header-my-page-wrap></main-page-header-my-page-wrap>
      </v-flex>
      <v-flex pl-1 xs2>
        <main-page-header-help-wrap></main-page-header-help-wrap>
      </v-flex>
    </v-layout>
    </div>
</template>

<script>
import mainPageHeaderLanguageWrap from "./mainPageHeaderLanguage";
import mainPageHeaderMenuListWrap from "./mainPageHeaderMenuList";
import mainPageHeaderMyPageWrap from "./mainPageHeaderMyPage";
import mainPageHeaderHelpWrap from "./mainPageHeaderHelp";

export default {
  components: {
    mainPageHeaderLanguageWrap: mainPageHeaderLanguageWrap,
    mainPageHeaderMenuListWrap: mainPageHeaderMenuListWrap,
    mainPageHeaderMyPageWrap: mainPageHeaderMyPageWrap,
    mainPageHeaderHelpWrap: mainPageHeaderHelpWrap
  },
  data: function() {
    return {
      id: null,
      password: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    submitLogin() {
      this.$store
        .dispatch("login", {
          id: this.id,
          password: this.password
        })
        .then(() => this.moveMainPage());
    },
    moveMainPage() {
      this.$router.push("mainPage");
    }
  }
};
</script>

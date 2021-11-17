<template>
  <div class="login">
    <h1>Login</h1>
    <input required type="text" v-model="login" />
    <button @click="auth">OK</button>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  data: function () {
    return {
      login: "",
    };
  },
  methods: {
    auth: function () {
      Vue.axios
        .get(`http://46.101.212.195:3000/students/name/${this.login}`)
        .then((response) => {
          if (response.data === null || response.data.name === "CastError") {
            return;
          }

          this.$store.commit("setUser", response.data);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
</style>
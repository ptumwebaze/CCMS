<template>
  <router-view></router-view>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  beforeCreate() {

    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      this.$store.dispatch("login/authuser");
     
    } else {
      axios.defaults.headers.common["Authorization"] = "";
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    }
  },
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>

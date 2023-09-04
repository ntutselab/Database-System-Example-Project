<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar />
      <v-footer absolute dark horizontal class="d-flex justify-center">
        <span class="my-3">Copyright © BSS</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

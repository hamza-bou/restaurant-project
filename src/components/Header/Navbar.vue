<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" exact> Home </router-link>
        </li>
      </ul>
      <div class="d-flex">
        <a href="#" @click="logout()">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(['redirectTo']),
    logout(){
        localStorage.clear();
        this.redirectTo({val:"login"});
    }
  },
};
</script>

<style lang="scss" scoped>
nav li:hover a,
nav li a.router-link-active,
nav li a.router-link-exact-active {
  color: rgb(7, 114, 114);
  cursor: pointer;
}
nav a {
    color: black;
    text-decoration: none;
    font-size:18px;
}
</style>

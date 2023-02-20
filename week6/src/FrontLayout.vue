<template>
  <div>我是首頁</div>
  <router-link to="/">Home</router-link>|
  <router-link to="/about">About</router-link>|
  <router-link to="/Product">Product</router-link>|
  <router-link to="/Products">Products</router-link>|
  <router-link to="/Cart">Cart</router-link>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
};
</script>

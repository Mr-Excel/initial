<template>
  <div v-if="isLoading">
    <div
      class="loader"
      v-loading="true"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="#F2F6FC"
    ></div>
  </div>
  <div id="nav" v-if="isShowNav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view />
</template>
<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const isShowNav = computed(() => store.state.isNavBarShow);
    const isLoading = computed(() => store.state.loading);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    watch(route, (to) => {
      if (to.path == "/login") {
        store.dispatch("changeNav", false);
      } else {
        store.dispatch("changeNav", true);
      }
    });
    return { svg, isShowNav, isLoading };
  },
};
</script>
<style scoped lang="sass">
.loader
  position: fixed
  background: #464646
  left: 0
  top: 0
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

#app
  text-align: center;
  color: #2c3e50;

#nav
  padding: 30px;

  a
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active
      color: #42b983;
</style>

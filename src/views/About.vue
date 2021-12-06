<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickme">Click me</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.loading);
    const clickme = () => {
      store.dispatch("createDoc", {
        collection: "users",
        data: {
          first_name: "Asad",
          last_name: "Ali",
          password: "1122",
          is_active: true,
          email: "asadalinawaz600@gmail.com",
          address: "Grw, Punjab, PK",
          created_at: new Date(),
        },
      });
    };
    return {
      isLoading,
      clickme,
    };
  },
};
</script>
<style lang="sass" scoped></style>

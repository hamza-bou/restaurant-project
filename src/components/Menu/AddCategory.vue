<template>
  <Navbar />
  <div class="container mt-3">
    <h2>add category</h2>
    <router-link
      :to="{ name: 'ViewCategories', params: { locationIdIs: locationId } }"
    >
      <button type="button" class="btn btn-outline-success float-left">
        Back to Categories
      </button>
    </router-link>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";

export default {
  name: "AddCategory",
  components: {
    Navbar,
  },
  data() {
    return {
      locationId: this.$route.params.locationId,
    };
  },
};
</script>

<style lang="scss" scoped></style>

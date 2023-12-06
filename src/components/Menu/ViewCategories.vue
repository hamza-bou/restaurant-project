<template>
  <Navbar />
  <div class="container mt-3">
    <h2>Categories</h2>
    <div>

        <router-link
          :to="{ name: 'AddCategory', params: { locationIdIs: locationIdIs } }"
        >
          <button type="button" class="btn btn-secondary float-right">Add Category</button>
        </router-link>
        <router-link :to="{ name: 'Menu', params: { locationId: locationIdIs } }">
            <button type="button" class="btn btn-outline-success float-left">Back To Menu</button>
        </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";

export default {
  name: "ViewCategories",
  components: {
    Navbar,
  },
  data() {
    return {
      locationIdIs: this.$route.params.locationIdIs,
    };
  }
};
</script>

<style lang="scss" scoped></style>

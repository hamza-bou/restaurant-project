<template>
  <Navbar />
  <div class="container mt-3">
    <h2>Categories</h2>
    <div class="container mt-3">
      <router-link :to="{ name: 'Menu', params: { locationId: locationIdIs } }">
        <button type="button" class="btn btn-outline-success">
          Back To Menu
        </button>
      </router-link>
      
    </div>
    <div class="container mt-5" v-for="cat in detailsCategories">
      <router-link :to="{ name: 'AddItem', params: { idcategory: cat.id } }" >
        <button type="button" class="btn btn-outline-success ">
          Add item
        </button>
      </router-link>
      <div>
        <h3 class="text-left">{{ cat.name }}</h3>
      </div>
      <ul class="list-group mt-3">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="food in getFoodsByCategoryId(cat.id)"
        >
          {{food.name}}
          <span class="badge badge-primary badge-pill">{{food.price}} DH</span>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "ViewCategories",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      locationIdIs: this.$route.params.locationIdIs,
    };
  },
  computed: {
    ...mapState(["foodsByLocationId","detailsCategories"]),
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }
    this.getCategories({
      userId:this.userId,
      locationId: this.locationIdIs,
      redirectToPage: "home",
    });
    this.getFoodsByLocationId({
      locationId: this.locationIdIs,
      redirectToPage: "home",
    });
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["getCategories","getFoodsByLocationId"]),
    getFoodsByCategoryId(categoryId) {
      return this.foodsByLocationId.filter((food) => food.idCategory === categoryId);
    },
  },
};
</script>

<style lang="scss" scoped></style>

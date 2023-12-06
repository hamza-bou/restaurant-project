<template>
  <Navbar />
  <div class="container mt-3">
    <h2>Menu</h2>
    <router-link
      :to="{ name: 'ViewCategories', params: { locationIdIs: locationId } }" v-if="detailsCategories.length > 0" >
      <button type="button" class="btn btn-outline-success float-left">
        View Categories
      </button>
    </router-link>
    <router-link
        :to="{ name: 'AddCategory', params: { locationIdIs: locationId } }"
        class="ml-5" v-if="locationId"
      >
        <button type="button" class="btn btn-secondary float-right">Add Category</button>
      </router-link>
  </div>
  <div class="clearfix"></div>
  <div class="mt-5" v-if="locationInfo.length > 0">
    <h3 class="text-center">{{ locationInfo[0].name }}</h3>
    <div class="text-muted">{{ locationInfo[0].phone }}</div>
    <div class="text-muted">{{ locationInfo[0].address }}</div>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Menu",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      userName: "",
      locationId: "",
    };
  },
  created() {
    this.locationId = this.$route.params.locationId;
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "loggedInUserId",
      "detailsCategories",
      "listOfCategories",
      "locationInfo",
    ]),
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.userName = JSON.parse(user).name;
    }
    this.inLoggedInUser();
    this.getCategories({
      userid: this.userId,
      locationId: this.locationId,
    });

    this.getLocationInfo({
      userid: this.userId,
      id: this.locationId,
      redirectToPage: "home",
    });
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["inLoggedInUser", "getCategories", "getLocationInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <Navbar />
  <div class="container mt-3">
    <h2>add category</h2>
    <router-link
      :to="{ name: 'Menu', params: { locationId: locationId } }" v-if="locationId"
    >
      <button type="button" class="btn btn-outline-success float-left">
        Back to Menu
      </button>
    </router-link>

    <div class="mt-5" v-if="locationInfo.length > 0">
      <h3 class="text-center">{{ locationInfo[0].name }}</h3>
      <div class="text-muted">{{ locationInfo[0].phone }}</div>
      <div class="text-muted">{{ locationInfo[0].address }}</div>
    </div>
    <form class="mt-5 text-left col-sm-6"  @click.prevent>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Category Name"
          v-model="name"
        />
        <div class="invalid-feedback d-block" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" @click="addCategory()">Add Category</button>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errorAdded">
              Probleme added Category
            </div>
    </form>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapState, mapMutations,mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "AddCategory",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useValidate(),
      userId: "",
      locationId: "",
      name: "",
      errorAdded: false,
    };
  },
  created() {
    this.locationId = this.$route.params.locationIdIs;
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
    };
  },
  computed: {
    ...mapState(["locationInfo"]),
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }

    this.getLocationInfo({
      userid: this.userId,
      id: parseInt(this.locationId),
      redirectToPage: "home",
    });
  },
  methods: {
    ...mapActions(['redirectTo']),
    ...mapMutations(["getLocationInfo"]),
    async addCategory() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const newCategory = await axios.post(
          "http://localhost:3000/categories",
          {
            name: this.name,
            userId: this.userId,
            locationId: parseInt(this.locationId),
          }
        );
        if (newCategory.status === 201) {
          this.$router.push({name:"ViewCategories", params: {locationId: this.locationId}});
          this.errorAdded = false;
          this.name = "";
          this.v$.name.$errors[0].$message = "";
        } else {
          this.errorAdded = true;
        }
      } else {
        console.log("not Good");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

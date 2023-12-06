<template>
  <Navbar />
  <div class="container mt-5">
    <h2>
      Add food in
      <i class="text-info">{{ oneCategoryDetails[0]?.name }}</i> category
    </h2>
    <router-link
      :to="{
        name: 'ViewCategories',
        params: { locationIdIs: oneCategoryDetails[0]?.locationId },
      }"
      v-if="oneCategoryDetails[0]?.locationId"
    >
      <button type="button" class="btn btn-outline-success mt-3">
        Back to Categories
      </button>
    </router-link>
    <form class="mt-5 text-left col-sm-6" @click.prevent>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Food Name"
          v-model="nameFood"
        />
        <div class="invalid-feedback d-block" v-if="v$.nameFood.$error">
          {{ v$.nameFood.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Food Price"
          v-model="priceFood"
        />
        <div class="invalid-feedback d-block" v-if="v$.priceFood.$error">
          {{ v$.priceFood.$errors[0].$message }}
        </div>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" @click="addFood()">Add Food</button>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errorAdded">Probleme added Food</div>
    </form>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "AddItem",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useValidate(),
      userId: "",
      nameFood: "",
      priceFood: "",
      idCategory: "",
      errorAdded: false,
    };
  },
  created() {
    this.idCategory = this.$route.params.idcategory;
  },
  validations() {
    return {
      nameFood: { required, minLength: minLength(3) },
      priceFood: { required },
    };
  },
  computed: {
    ...mapState(["oneCategoryDetails"]),
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }

    this.getCategoryById({
      id: parseInt(this.idCategory),
      redirectToPage: "home",
    });
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["detailsCategories","getCategoryById"]),
    async addFood() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const newFood = await axios.post(
          "http://localhost:3000/foods",
          {
            name: this.nameFood,
            price: this.priceFood,
            userId: this.userId,
            locationId: this.oneCategoryDetails[0]?.locationId,
            idCategory:parseInt(this.idCategory),
            nameCategory:this.oneCategoryDetails[0].name,
          }
        );
        if (newFood.status === 201) {
          this.$router.push({
            name: "ViewCategories",
            params: { locationIdIs: this.oneCategoryDetails[0]?.locationId },
          });
          this.errorAdded = false;
          this.nameFood = "";
          this.priceFood = "";
          this.v$.nameFood.$errors[0].$message = "";
          this.v$.priceFood.$errors[0].$message = "";
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

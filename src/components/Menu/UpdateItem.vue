<template>
  <Navbar />
  <div class="container mt-5">
    <h2>Update <i class="text-info">{{ nameFood }}</i></h2>
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
        <button type="submit" class="btn btn-primary" @click="updateFood()">
          Update 
        </button>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errorAdded">
        Probleme updated 
      </div>
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
    name: "UpdateItem",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useValidate(),
      userId: "",
      nameFood: "",
      priceFood: "",
      idFood: "",
      errorAdded: false,
      locationId:"",
      idCategory:"",
    };
  },
  created() {
    this.idFood = this.$route.params.idItem;
  },
  validations() {
    return {
      nameFood: { required, minLength: minLength(3) },
      priceFood: { required },
    };
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }
    this.getfoodById();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["detailsCategories","getCategoryById"]),
    async getfoodById(){
      const food = await axios.get(`http://localhost:3000/foods?id=${this.idFood}`);
      if (food.status === 200) {
        this.nameFood = food.data[0].name;
        this.priceFood = food.data[0].price;
        this.locationId= food.data[0].locationId;
        this.idCategory= food.data[0].idCategory;
      }
    },
    async updateFood() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const updateFood = await axios.put(
          `http://localhost:3000/foods/${this.idFood}`,
          {
            name: this.nameFood,
            price: this.priceFood,
            userId: this.userId,
            locationId: this.locationId,
            idCategory:this.idCategory,
          }
        );
        if (updateFood.status === 200) {
          this.$router.push({
            name: "ViewCategories",
            params: { locationIdIs: this.locationId },
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

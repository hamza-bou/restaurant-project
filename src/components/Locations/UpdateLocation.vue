<template>
  <Navbar />
  <div class="container mt-3 text-left">
    <form @click.prevent>
      <div class="form-group mb-3">
        <input
          type="text"
          v-model="name"
          class="form-control"
          placeholder="Name"
        />
        <div class="invalid-feedback d-block" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group mb-3">
        <input
          type="text"
          v-model="phone"
          class="form-control"
          placeholder="Phone"
        />
        <div class="invalid-feedback d-block" v-if="v$.phone.$error">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group mb-3">
        <input
          type="text"
          v-model="address"
          class="form-control"
          placeholder="Adresse"
        />
        <div class="invalid-feedback d-block" v-if="v$.address.$error">
          {{ v$.address.$errors[0].$message }}
        </div>
      </div>
      <button type="submit" @click="updateLocation()" class="btn btn-info">Update</button>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Header/Navbar.vue";
import useValidate from "@vuelidate/core";
import { required, minLength, numeric } from "@vuelidate/validators";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "UpdateLocation",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      phone: "",
      address: "",
      userId: "",
      errorAdded: false,
      locationId: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      phone: { required, numeric, minLength: minLength(10) },
      address: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.locationId = this.$route.params.locationId;
    }
    this.getLocationById();
    
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async getLocationById() {
        let result = await axios.get(`http://localhost:3000/Locations/${this.locationId}`);
        this.name = result.data.name;
        this.phone = result.data.phone;
        this.address = result.data.address;
    },
    async updateLocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const editLocation = await axios.put(
          `http://localhost:3000/Locations/${this.locationId}`,
          {
            name: this.name,
            phone: this.phone,
            address: this.address,
            userId: this.userId,
          }
        );
        if (editLocation.status === 200) {
          this.redirectTo({ val: "home" });
          this.errorAdded = false;
          this.name = "";
          this.phone = "";
          this.address = "";
          this.v$.name.$errors[0].$message = "";
          this.v$.phone.$errors[0].$message = "";
          this.v$.address.$errors[0].$message = "";
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

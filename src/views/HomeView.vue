<template>
  <Navbar />
  <div class="container mt-5">
    <h2>Welcome <b>{{ userName.toUpperCase()}}</b></h2>
    <AddLocation />
    <p class="font-weight-light text-left">
      {{ listLocation.length }} Location(s)
    </p>
    <div class="card-columns mt-3">
      <ItemLocation
        v-for="location in listLocation"
        :allLocations="location"
        @id="deleteTask"
      />
    </div>
    <div
      class="alert alert-info text-left"
      role="alert"
      v-if="zeroLocations.length > 0"
    >
      {{ zeroLocations }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Header/Navbar.vue";
import AddLocation from "@/components/Locations/AddLocation.vue";
import ItemLocation from "@/components/Locations/ItemLocation.vue";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    Navbar,
    AddLocation,
    ItemLocation,
  },
  data() {
    return {
      userName: "",
      userId: "",
      listLocation: [],
      zeroLocations: "",
    };
  },
  mounted() {
    const user = localStorage.getItem("userinfo");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    this.getLocation();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async getLocation() {
      let result = await axios.get(
        `http://localhost:3000/Locations?userId=${this.userId}`
      );
      if (result.status === 200 && result.data.length > 0) {
        this.listLocation = result.data;
        this.zeroLocations = "";
      } else {
        this.zeroLocations = "No location added yet !!!";
      }
    },
    async deleteTask(id) {
      let filteredList = await axios.delete(
        `http://localhost:3000/Locations/${id}`
      );
      console.log("filteredList", filteredList);
      if (filteredList.status === 200) {
        this.listLocation = this.listLocation.filter(
          (location) => location.id !== id
        );
      }
    },
  },
};
</script>

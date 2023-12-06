<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ allLocations.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ allLocations.phone }}</h6>
      <p class="card-text">{{ allLocations.address }}</p>
      <router-link
        :to="{ name: 'UpdateLocation', params: { locationId: allLocations.id } }"
      >
        <button type="button" class="btn btn-info">Edit</button>
      </router-link>
      <button
        type="button"
        class="btn btn-danger ml-1"
        @click="deleteLocation(allLocations.id)"
      >
        Delete
      </button>
      <router-link
        :to="{ name: 'Menu',params: { locationId: allLocations.id } }"
      >
        <button type="button" class="btn btn-secondary ml-1">Menu</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemLocation",
  props: ["allLocations"],
  methods: {
     deleteLocation(idLocation) {
      if (confirm("Do you really want to delete?")) {
        this.$emit("id", idLocation);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

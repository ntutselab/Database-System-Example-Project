<template>
  <v-sheet v-if="isLoading" color="grey lighten-4" class="pa-3">
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name: "Loading",
  props: { isLoading: { type: Boolean, default: true } }
};
</script>

<style></style>

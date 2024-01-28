<script>
import HomeView from "./views/HomeView.vue";

export default {
  components: {
    HomeView,
  },
  beforeCreate() {},
};
</script>

<template>
  <v-app id="map">
    <v-app-bar app>
      <v-toolbar-title
        >Worldwide Poverty Rate Interactive Map (%)</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from "./views/HomeView.vue";

export default {
  components: {
    HomeView,
  },
  beforeCreate() {
    function mapScripts() {
      let script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"
      );
      script.setAttribute("type", "text/javascript");
      document.head.appendChild(script);

      let script2 = document.createElement("script");
      script2.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"
      );
      script2.setAttribute("type", "text/javascript");
      document.head.appendChild(script2);

      let script3 = document.createElement("script");
      script3.setAttribute(
        "src",
        "https://cdn.anychart.com/geodata/2.2.0/custom/world/world.js"
      );
      script3.setAttribute("type", "text/javascript");
      document.head.appendChild(script3);

      let script4 = document.createElement("script");
      script4.setAttribute(
        "src",
        "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js"
      );
      script4.setAttribute("type", "text/javascript");
      document.head.appendChild(script4);

      let script5 = document.createElement("script");
      script5.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/v8/js/anychart-map.min.js"
      );
      script5.setAttribute("type", "text/javascript");
      document.head.appendChild(script5);

      let script6 = document.createElement("script");
      script6.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"
      );
      script6.setAttribute("type", "text/javascript");
      document.head.appendChild(script6);

      let script7 = document.createElement("script");
      script7.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"
      );
      script7.setAttribute("type", "text/javascript");
      document.head.appendChild(script7);

      let script8 = document.createElement("script");
      script8.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/8.11.0/js/anychart-ui.min.js"
      );
      script8.setAttribute("type", "text/javascript");
      document.head.appendChild(script8);

      let script9 = document.createElement("script");
      script9.setAttribute(
        "src",
        "https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js"
      );
      script9.setAttribute("type", "text/javascript");
      script9.setAttribute("defer", true);
      document.head.appendChild(script9);
    }
    mapScripts();
  },
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

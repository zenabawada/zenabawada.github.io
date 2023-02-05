const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    "/api": {
      ws: true,
      changeOrigin: true,
      target: "https://apps.who.int/",
    },
  },
});

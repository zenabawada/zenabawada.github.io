const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        ws: true,
        changeOrigin: true,
        target: "https://apps.who.int/",
      },
    },
  },
});

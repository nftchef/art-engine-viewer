const config = require("./config");
console.log({ config });
process.env.VUE_APP_IMAGE_TYPE = config.imageType;

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    //TODO: make paths dynamic
    config.resolve.alias.set(
      "#BUILD",
      path.resolve(__dirname, "../Art Engine/build")
    );
  },
};

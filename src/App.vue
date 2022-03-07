<template>
  <div class="explorer">
    <filter-aside />
    <gallery-component />
  </div>
</template>

<script>
// import { computed } from "@vue/runtime-core";
import { imageType } from "../config";
// import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import FilterAside from "./components/FilterAside.vue";
import GalleryComponent from "@/components/GalleryComponent.vue";

// ***** SET THE PATH TO YOUR BUILD FOLDER, RELATIVE TO THIS PROJECT ****//
//                             |
//                             |
//                             v
import metadata from "../../Art Engine/build/json/_metadata.json";

export default {
  name: "App",
  components: {
    GalleryComponent,
    FilterAside,
  },
  setup() {
    const store = useStore();

    store.dispatch("INITIALIZE_TRAITS", metadata);

    return {
      // traitTypes,
      GalleryComponent,
      imageType,
      // buildLoaded,
      // allTraits,
      metadata,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #363636;
  margin-top: 60px;
  width: 100vw;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.explorer {
  display: flex;
  margin: 0 2rem;
}
</style>

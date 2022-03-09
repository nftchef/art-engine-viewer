<template>
  <div :class="{ app: true, darkmode }">
    <darkmode-toggle />
    <div class="explorer">
      <filter-aside />
      <gallery-component />
    </div>
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
import { computed } from "@vue/runtime-core";
import DarkmodeToggle from "./components/DarkmodeToggle.vue";

export default {
  name: "App",
  components: {
    GalleryComponent,
    FilterAside,
    DarkmodeToggle,
  },
  setup() {
    const store = useStore();

    store.dispatch("INITIALIZE_TRAITS", metadata);
    const darkmode = computed(() => store.state.darkmode);

    return {
      // traitTypes,
      GalleryComponent,
      imageType,
      darkmode,
      // buildLoaded,
      // allTraits,
      metadata,
    };
  },
};
</script>

<style lang="scss">
:root {
  --dark: #222;
  --light: #e5e5e5;
  --white: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  width: 100vw;
}

.app {
  --background: var(--white);

  min-height: 100vh;
  padding: 2em;

  &.darkmode {
    --background: var(--dark);
    --color: var(--light);
  }
  background: var(--background);
  color: var(--color);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.explorer {
  display: flex;
  padding: 2rem;
}
</style>

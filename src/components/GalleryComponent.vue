<template>
  <div class="gallery">
    <!-- <pre>detail index:{{ detailIndex }}</pre> -->
    <!-- <pre>selected img: {{ selectedToken }}</pre> -->
    <h1>{{ results.length }}/ {{ metadata.length }}</h1>

    <active-filters />
    <div class="results">
      <div class="result" v-for="item in results" :key="item.name">
        <div v-if="mode == 'gallery' || mode == 'gallery-list'">
          <!-- TODO: make src path configurable -->
          <img
            @click="selectionHandler(item, item.edition)"
            :data-token="item"
            :src="require(`#BUILD/images/${item.edition}.${imageType}`)"
            alt=""
            srcset=""
          />
        </div>
        <p>
          {{ item.name }}
        </p>
      </div>
    </div>
    <!-- <pre>{{ sources }}</pre> -->
    <!-- <pre>{{ type }}</pre> -->
  </div>

  <div
    v-if="selectedToken"
    v-show="modalOpen"
    :class="{ modal: true, fullscreen }"
  >
    <!-- {{ selectedToken }} -->
    <button @click="toggleFullscreen" class="fullscreen-toggle">
      <!-- Fullscreen toggle -->
      <img
        v-if="!fullscreen"
        src="@/assets/icon-fullscreen-open.svg"
        alt=""
        srcset=""
      />
      <img v-else src="@/assets/icon-fullscreen-close.svg" alt="" srcset="" />
    </button>
    <!-- Close modal -->
    <button class="close" @click="toggleModal">
      <img src="@/assets/icon-close.svg" alt="" srcset="" />
    </button>
    <div v-if="!fullscreen" class="metadata">
      <h1>{{ selectedToken.name }}</h1>
      <div class="attributes">
        <div
          v-for="attribute in selectedToken.attributes"
          class="attribute"
          :key="attribute.trait_type"
        >
          <p class="attribute__trait">{{ attribute.trait_type }}</p>
          <p class="attribute__value">{{ attribute.value }}</p>
        </div>
      </div>
    </div>
    <img
      :src="require(`#BUILD/images/${selectedToken.edition}.${imageType}`)"
      alt=""
      srcset=""
    />
  </div>
  <div class="screen" v-if="modalOpen"></div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import ActiveFilters from "./ActiveFilters.vue";

const handlers = {};
export default {
  components: { ActiveFilters },
  setup() {
    const store = useStore();

    const allTraits = computed(() => store.state.allTraits);
    const metadata = computed(() => store.state.metadata);
    const results = computed(() => store.state.results);

    const fullscreen = ref(false);

    const detailIndex = computed(() => store.state.currentDetailIndex);
    const selectedToken = ref(null);
    watch(detailIndex, (index) => {
      console.log("setting selected");
      selectedToken.value = metadata.value.find(
        (element) => element.edition == index
      );
    });

    const imageType = process.env.VUE_APP_IMAGE_TYPE;
    const modalOpen = ref(false);
    // const total = ref(null);
    // TODO:
    const mode = ref("gallery");
    return {
      mode,
      allTraits,
      metadata,
      results,
      imageType,
      modalOpen,
      fullscreen,
      detailIndex,
      toggleModal: () => (modalOpen.value = !modalOpen.value),
      toggleFullscreen: toggleFullscreen(fullscreen),
      selectedToken,
      selectionHandler: selectionHandler(store, selectedToken, modalOpen),
    };
  },
};

const selectionHandler = (store, selected, modalOpen) => (elem, index) => {
  store.dispatch("CURRENT_DETAIL_INDEX", index);
  console.log("selection handler", { index });
  modalOpen.value = !modalOpen.value;

  toggleKeyHandler(store, modalOpen);
};

const toggleKeyHandler = (store, modalOpen) => {
  // remember the handlers if it is not created, otherwise reuse it
  handlers.keyHandler = handlers.keyHandler
    ? handlers.keyHandler
    : keyPressHandler(store, modalOpen);

  if (modalOpen.value) {
    window.addEventListener("keydown", handlers.keyHandler);
  } else {
    window.removeEventListener("keydown", handlers.keyHandler);
  }
};

const keyPressHandler = (store, modalOpen) => (e) => {
  const index = store.state.currentDetailIndex;
  const max = store.state.metadata.length;
  const min = store.state.metadata[0].edition;
  switch (e.key) {
    case "Escape":
      modalOpen.value = false;
      toggleKeyHandler(store, modalOpen);
      break;
    case "ArrowUp":
      e.preventDefault();
      if (index + 1 <= max) {
        store.dispatch("CURRENT_DETAIL_INDEX", index + 1);
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      if (index + 1 <= max) {
        store.dispatch("CURRENT_DETAIL_INDEX", index + 1);
      }
      break;
    case "ArrowLeft":
      e.preventDefault();
      if (index - 1 >= min) {
        store.dispatch("CURRENT_DETAIL_INDEX", index - 1);
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (index - 1 >= min) {
        store.dispatch("CURRENT_DETAIL_INDEX", index - 1);
      }
      break;

    default:
      break;
  }
};

const toggleFullscreen = (fullscreenState) => () => {
  fullscreenState.value = !fullscreenState.value;
};
</script>

<style lang="scss" scoped>
.results {
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 1rem;
  grid-template-columns: repeat(5, 1fr);

  img {
    width: 100%;
    transition: transform ease-in-out 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.018);
      box-shadow: 0px 2px 5px 1px rgb(0 0 0 / 23%);
    }
  }

  .result {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.screen {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background: var(--background);
  opacity: 0.65;
  z-index: 9;
}
.modal {
  display: flex;
  position: fixed;
  background: var(--background);
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 85vw;
  height: 50vh;
  margin: auto;
  border: 1px solid;
  border-radius: 0.6rem;
  overflow: hidden;
  z-index: 10;

  &.fullscreen {
    height: 99vh;
    width: 99vw;
    justify-content: center;
  }

  .metadata {
    flex-basis: 50%;
    padding: 2rem;

    h1 {
      margin-bottom: 1rem;
    }
  }
  .attributes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem 1rem;

    .attribute {
      &__trait {
        font-size: 0.9em;
        font-weight: bolder;
        line-height: 1;
      }
      &__value {
        font-size: 1.1em;
      }
    }
  }

  button {
    position: absolute;
    background: none;
    border: none;
    opacity: 50%;

    &.fullscreen-toggle {
      right: 0;
      top: 0;
    }

    &.close {
      left: 0;
      top: 0;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="gallery">
    <!-- <pre>detail index:{{ detailIndex }}</pre> -->
    <!-- <pre>selected img: {{ selectedImage }}</pre> -->
    <h1>{{ results.length }}/ {{ metadata.length }}</h1>
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

  <div v-if="selectedImage" v-show="modalOpen" class="modal">
    <!-- {{ selectedImage }} -->
    <div class="metadata">
      <h1>{{ selectedImage.name }}</h1>
      <div class="attributes">
        <div
          v-for="attribute in selectedImage.attributes"
          class="attribute"
          :key="attribute.trait_type"
        >
          <p class="attribute__trait">{{ attribute.trait_type }}</p>
          <p class="attribute__value">{{ attribute.value }}</p>
        </div>
      </div>
    </div>
    <img
      :src="require(`#BUILD/images/${selectedImage.edition}.${imageType}`)"
      alt=""
      srcset=""
    />
  </div>
  <div class="screen" v-if="modalOpen"></div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

const handlers = {};
export default {
  setup() {
    const store = useStore();

    const allTraits = computed(() => store.state.allTraits);
    const metadata = computed(() => store.state.metadata);
    const results = computed(() => store.state.results);

    const detailIndex = computed(() => store.state.currentDetailIndex);
    const selectedImage = ref(null);
    watch(detailIndex, (index) => {
      selectedImage.value = metadata.value[index];
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
      detailIndex,
      selectedImage,
      selectionHandler: selectionHandler(store, selectedImage, modalOpen),
    };
  },
};

const selectionHandler = (store, selected, modalOpen) => (item, index) => {
  store.dispatch("CURRENT_DETAIL_INDEX", index);
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
      if (index - 1 >= 0) {
        store.dispatch("CURRENT_DETAIL_INDEX", index - 1);
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (index - 1 >= 0) {
        store.dispatch("CURRENT_DETAIL_INDEX", index - 1);
      }
      break;

    default:
      break;
  }
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
  background: white;
  opacity: 0.65;
  z-index: 9;
}
.modal {
  display: flex;
  position: fixed;
  background: white;
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
}
</style>

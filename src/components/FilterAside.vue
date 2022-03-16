<template>
  <aside class="filters">
    <h1>Filter</h1>
    <div v-for="type in Object.keys(allTraits).sort()" :key="type">
      <label for="" class="filter__type">{{ type }}</label>
      <ul class="filter__list">
        <li
          class="filter__attribute"
          v-for="attribute in Object.keys(allTraits[type]).sort()"
          :key="attribute"
        >
          <input
            class="filter__checkbox"
            type="checkbox"
            @change="filterHandler($event, allTraits[type][attribute])"
            :checked="allTraits[type][attribute].filterState"
            :data-trait-type="type"
            :data-trait-attribute="attribute"
            :name="attribute"
            :id="attribute"
          />
          <label :for="attribute"
            >{{ attribute }}
            <span class="filter__attribute-count"
              >({{ allTraits[type][attribute].count }})</span
            ></label
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
// import { ref } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore();
    const allTraits = computed(() => store.state.allTraits);
    const traitTypes = computed(() => store.state.traitTypes);
    return { traitTypes, allTraits, filterHandler: filterHandler(store) };
  },
};

const filterHandler = (_store) => (e, trait) => {
  const store = _store;
  console.log("FilterHandler", { checked: e.target.checked, trait });

  if (e.target.checked) {
    // add
    console.log("add filter");
    store.dispatch("ADD_FILTER", {
      trait_type: e.target.dataset.traitType,
      value: e.target.dataset.traitAttribute,
    });
  } else {
    // remove
    console.log("remove filter");
    store.dispatch("REMOVE_FILTER", {
      trait_type: e.target.dataset.traitType,
      value: e.target.dataset.traitAttribute,
    });
  }
};
</script>

<style lang="scss" scoped>
.filters {
  margin-right: 2rem;
  min-width: 200px;

  h1 {
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 2em;
  }
}

.filter {
  &__list {
    margin-bottom: 1rem;
  }
  &__type {
    font-weight: bolder;
    margin-bottom: 1rem;
  }
  &__attribute {
    list-style: none;
  }

  &__checkbox {
    margin-right: 0.25rem;
  }

  &__attribute-count {
    opacity: 0.6;
    font-size: 0.875em;
  }
}
</style>

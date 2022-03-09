<template>
  <div class="active-filters">
    <span class="filter-label"
      >FILTERS
      <span class="filter-count">{{ activeFilters.length }}</span></span
    >
    <div v-for="filter in activeFilters" :key="filter" class="filter">
      <span>{{ filter.trait_type }}:{{ filter.value }}</span>
      <button @click="removeFilter(filter)">
        <img src="@/assets/icon-close.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const activeFilters = computed(() => store.state.filters);

    return { activeFilters, removeFilter: removeFilter(store) };
  },
};

const removeFilter = (store) => (filter) => {
  store.dispatch("REMOVE_FILTER", filter);
};
</script>

<style lang="scss" scoped>
.active-filters {
  display: flex;
  height: 3rem;
  align-items: center;
}
.filter {
  align-items: center;
  color: var(--dark);
  background: #e9e9e9;
  border-radius: 1rem;
  display: flex;
  font-size: 0.875em;
  height: 1.25rem;
  margin: 0 0.2rem;
  overflow: hidden;
  padding: 0.25rem 0.5rem;

  button {
    background: none;
    border: none;
    height: 1rem;
    width: 1rem;

    img {
      width: 100%;
    }
  }
}

.filter-label {
  margin-right: 1rem;
  font-weight: bolder;
}

.filter-count {
  font-weight: lighter;
}
</style>

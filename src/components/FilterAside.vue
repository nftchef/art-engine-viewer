<template>
  <aside class="filters">
    <h1>Filter</h1>
    <div v-for="category in Object.keys(allTraits).sort()" :key="category">
      <label
        for=""
        @click="collapsed[category] = !collapsed[category]"
        class="filter__type"
      >
        <svg
          :class="{ 'expand-icon': true, collapsed: collapsed[category] }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
        </svg>
        {{ category }}</label
      >
      <ul class="filter__list" v-show="!collapsed[category]">
        <li
          class="filter__attribute"
          v-for="attribute in Object.keys(allTraits[category]).sort()"
          :key="attribute"
        >
          <input
            class="filter__checkbox"
            type="checkbox"
            @change="filterHandler($event, allTraits[category][attribute])"
            :checked="allTraits[category][attribute].filterState"
            :data-trait-type="category"
            :data-trait-attribute="attribute"
            :name="attribute"
            :id="attribute"
          />
          <label :for="attribute"
            >{{ attribute }}
            <span class="filter__attribute-count"
              >({{ allTraits[category][attribute].count }})</span
            ></label
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
// import { ref } from "@vue/reactivity";

const store = useStore();
const allTraits = computed(() => store.state.allTraits);
// const traitTypes = computed(() => store.state.traitTypes);

const collapsed = reactive({});

Object.keys(allTraits.value).forEach((key) => {
  collapsed[key] = true;
});

console.log({ collapsed });

const filterHandler = (e, trait) => {
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
    font-size: 2em;
    font-weight: bolder;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
}

.expand-icon {
  width: 1.25rem;

  &.collapsed {
    transform: rotate(-90deg);
  }
}

.filter {
  &__list {
    margin-bottom: 1rem;
  }
  &__type {
    font-weight: bolder;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  &__attribute {
    list-style: none;
    padding: 0 0.2rem;
  }

  &__checkbox {
    margin-right: 0.5rem;
  }

  &__attribute-count {
    opacity: 0.6;
    font-size: 0.875em;
  }
}
</style>

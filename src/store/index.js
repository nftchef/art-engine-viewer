import { createStore } from "vuex";

export default createStore({
  state: {
    metadata: [],
    filters: [],
    results: [],
    allTraits: [],
    traitTypes: [],
  },
  getters: {},
  mutations: {
    SET_RESULTS(state, _results) {
      state.results = _results;
    },
    SET_METADATA(state, _metadata) {
      state.metadata = _metadata;
    },
    SET_TRAITS(state, _traitsData) {
      state.allTraits = _traitsData;
    },
    SET_TRAIT_TYPES(state, _traits) {
      state.traitTypes = _traits;
    },
  },
  actions: {
    INITIALIZE_TRAITS({ commit }, metadata) {
      console.log("init traits,", metadata);
      commit("SET_METADATA", metadata);
      const allTraits = metadata.reduce((acc, item) => {
        // loop over each item in the entire metadata. this could be
        // time intensive.
        // Initialize the trait if it has not been initialized yet in the acc
        // initialize the value at count 1 it it has not been init yet
        // sum al the counts
        item.attributes.forEach((attribute) => {
          acc[attribute.trait_type] = {
            ...acc[attribute.trait_type],
            [attribute.value]: {
              count: acc[attribute.trait_type]
                ? acc[attribute.trait_type][attribute.value]
                  ? acc[attribute.trait_type][attribute.value].count + 1
                  : 1
                : 1,
            },
          };
        });
        return acc;
      }, {});

      const traitTypes = Object.keys(allTraits);
      commit("SET_TRAIT_TYPES", traitTypes);
      commit("SET_TRAITS", allTraits);
    },
    /**
     *
     * @param {context} param0 Unwraped context params for commit,state
     * @param {Array} filters [...{}] filters of types and value pairs
     */
    UPDATE_RESULTS({ commit, state }, filters) {
      // TODO: do the filtering of the metadata here
      const subset = state.metadata.filter((item) => {
        return item.attributes.includes(
          (attribute) =>
            attribute.trait_type === filters.trait_type &&
            attribute.value === attribute.value
        );
      });

      commit("SET_RESULTS", subset);
    },
  },
  modules: {},
});

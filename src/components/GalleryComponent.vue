<template>
  <div>
    <pre>{{ sources }}</pre>
    <pre>{{ type }}</pre>
  </div>
</template>

<script>
export default {
  props: { sources: Array, type: String },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

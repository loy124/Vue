<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="removeAll">Clear All</span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
mapMutations;
export default {
  methods: {
    ...mapMutations({
      removeAll: "removeAllItem"
    })
  }
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
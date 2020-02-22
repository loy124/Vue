<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component></table-component>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import Vue from 'vue';
import TableComponent from './TableComponent';
import store from './store';
export default {
  store,
  components: {
    TableComponent,
  },
  computed: {
    winner() {
      return this.$store.state.winner;
    },
    turn() {
      return this.$store.state.turn;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import Vue from 'vue';
import TableComponent from './TableComponent';
export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: '',
    };
  },

  methods: {
    //뷰에서 객체나 배열이 있고 내부의값을 인덱스로 변경하면 화면에 적용되지 않는다
    //객체로 key값을 바꾸는경우도 마찬가지
    // //push등으로 사용하면 적용이 된다
    // onChangeData(){
    //   this.tableData[0][1] = 'O';
    // }
    onChangeData() {
      //this.tableData[1][0] = 'X' 작동하지 않는다
      //Vue를 import하고 바꾸고싶은 값을 Vue.set을 사용한다
      // this.tableData[1][0]에 'X'를 넣는다
      // Vue.set(this.tableData[1], 0, 'X');
      //Vue를 import 안하더라도 해당 방식으로 해결가능하다
      // this.$set(this.tableData[1], 0, 'X');
    },
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped></style>

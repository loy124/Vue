<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from './EventBus';
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  methods: {
    onClickTd() {
      //root값의 데이터를 가져온다
      // console.log(this.$root.$data);
      //부모의 데이터를 가져온다
      // console.log(this.$parent.$data);
      //자식 컴포넌트에서 부모컴포넌트의 데이터를 변경할 수 있다.
      //화면에서 반영이 되지 않는다

      //부모의 데이터는 잘 변경이되는데 화면에는 그려지지 않는다
      // this.$root.$data.tableData[this.rowIndex][
      //   this.cellIndex
      // ] = this.$root.$data.turn;

      //this.$set으로 일치화해주는 작업을 실시한다
      // 또한 인덱스를 여러번 쓰는경우 마지막 index를 key로 하면 된다
      if (this.cellData) return;
      //이벤트버스의 $on(this.onclickTd)
      EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
      // console.log(rootData);
    },
  },
};
</script>

<style></style>

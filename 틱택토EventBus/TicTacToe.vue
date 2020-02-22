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
import EventBus from './EventBus';
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
    onClickTd(rowIndex, cellIndex) {
      console.log(rowIndex, cellIndex);
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      let win = false;
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }

      //대각선
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }
      //승리했을때
      if (win) {
        this.winner = this.turn;
        this.turn = 'O';
        this.tableData = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      } else {
        //무승부일때
        let all = true; //all이 true면 무승부
        //무승부 검사
        this.tableData.forEach(row => {
          //2차원 배열이니 두번 forEach 실행
          row.forEach(cell => {
            // 칸이 비어있는경우면 all = false
            if (!cell) {
              all = false;
            }
          });
        });
        //무승부일때 값 초기화
        if (all) {
          this.winner = '';
          this.turn = 'O';
          this.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ];
          //무승부가 아니므로 턴만 넘긴다
        } else {
          this.turn = this.turn === 'O' ? 'X' : 'O';
        }
      }
    },
  },
  created() {
    //사용자 정의 이벤트 등록
    EventBus.$on('clickTd', this.onClickTd);
  },
};
</script>

<style scoped></style>

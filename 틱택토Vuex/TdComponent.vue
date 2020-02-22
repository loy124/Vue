<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  CHANGE_TURN,
  NO_WINNER,
} from './store';
export default {
  props: {
    rowIndex: Number,
    cellIndex: Number,
  },
  computed: {
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    tableData() {
      return this.$store.state.tableData;
    },
    turn() {
      return this.$store.state.turn;
    },
  },
  methods: {
    onClickTd() {
      //this.$set으로 일치화해주는 작업을 실시한다
      // 또한 인덱스를 여러번 쓰는경우 마지막 index를 key로 하면 된다
      if (this.cellData) return;
      //이벤트버스의 $on(this.onclickTd)
      // this.$set(this.tableData[this.rowIndex], cellIndex, this.turn);

      //뮤테이션을 부를때 commit을 사용한다
      //오타 방지를 위한 변수명 호출
      this.$store.commit(CLICK_CELL, {
        row: this.rowIndex,
        cell: this.cellIndex,
      });

      let win = false;
      if (
        this.tableData[this.rowIndex][0] === this.turn &&
        this.tableData[this.rowIndex][1] === this.turn &&
        this.tableData[this.rowIndex][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][this.cellIndex] === this.turn &&
        this.tableData[1][this.cellIndex] === this.turn &&
        this.tableData[2][this.cellIndex] === this.turn
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
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GAME);
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
          this.$store.commit(NO_WINNER);
          this.turn = 'O';
          this.$store.commit(RESET_GAME);
          //무승부가 아니므로 턴만 넘긴다
        } else {
          // this.turn = this.turn === 'O' ? 'X' : 'O';
          this.$store.commit(CHANGE_TURN);
        }
      }
    },
  },
};
</script>

<style></style>

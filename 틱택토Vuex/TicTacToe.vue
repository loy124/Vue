<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <!-- <table-component></table-component> -->
    <table-component>
      <!-- 슬롯 활용의 장점: 부모 컴포넌트에 함수들을 다 모아두었는데
       해당 함수들을 사용함(데이터를 한곳에서 관리한다-->
      <tr
        v-for="(rowData, rowIndex) in tableData"
        :key="rowIndex"
        :rowData="rowData"
      >
        <td
          v-for="(cellData, cellIndex) in rowData"
          @click="onClickTd(rowIndex, cellIndex, cellData)"
          :key="cellIndex"
        >
          {{ cellData }}
        </td>
      </tr>
    </table-component>

    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TableComponent from './TableComponent';
import store, {
  RESET_GAME,
  SET_WINNER,
  CHANGE_TURN,
  CLICK_CELL,
  NO_WINNER,
} from './store';

// import TableComponent from './TableComponent';

export default {
  store,
  components: {
    TableComponent,
  },
  data() {
    return {
      data: 1,
    };
  },

  computed: {
    //화살표 함수는 this 사용불가 일반함숨나 this 사용가능
    // winner: {
    //   get: function() {
    //     return this.$store.state.winner;
    //   },
    //   set: function() {},
    // },
    ...mapState(['winner', 'turn', 'tableData']),
    // ...mapState([{
    //   winner : state => state.winner,
    //   turnState: 'turn',
    //   winner(state){
    //     return state.winner + this.data;
    //   }
    // }]),
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    onClickTd(rowIndex, cellIndex, cellData) {
      //this.$set으로 일치화해주는 작업을 실시한다
      // 또한 인덱스를 여러번 쓰는경우 마지막 index를 key로 하면 된다
      if (cellData) return;
      //이벤트버스의 $on(this.onclickTd)
      // this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      //뮤테이션을 부를때 commit을 사용한다
      //오타 방지를 위한 변수명 호출
      this.$store.commit(CLICK_CELL, {
        row: rowIndex,
        cell: cellIndex,
      });

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

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//Vue.use 를 사용할때마다 $axios등 기능들이 추가되는 방식
//mutation의 이름들을 변수로 빼고 export 한다
//오타확률을 줄이기위해 이렇게 변수로 빼둔것
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

//export default는 아무렇게 이름을 통해 가져올수 있으나 import store from './store
//export const 는 import {SET_WINNER} from ./store 등 중괄호를 사용해서 원래 이름을 통해서만 불러올 수 있다.
export default new Vuex.Store({
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    }, //vue의 data와 유사
    getters: {
        // vue의 computed와 유사
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        },
    },
    mutations: {
        //대문자로 정하는게 Vue 커뮤니티의 규칙
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        //   SET_WINNER(state, winner) {
        //     state.winner = winner;
        // },
        [CLICK_CELL](state, { row, cell }) {
            // state.tableData[row][cell] = state.turn;
            //Vuex는 this.$set이 없다
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        },
    }, // state를 수정할 때 사용 (동기적으로)

    actions: {}, // 비동기를 사용할때, 또는 여러 mutation을 연달아 실행할때
});
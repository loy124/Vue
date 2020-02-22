//뷰를 설치했던것을 import로 가져온다
import Vue from 'vue';

import TicTacToe from './TicTacToe.vue';

new Vue(TicTacToe).$mount('#root');
<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball
        v-for="ball in winBalls"
        :key="ball"
        v-bind:number="ball"
      ></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한번 더!</button>
  </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);

  const shuffle = [];
  while (candidate.length > 0) {
    //splice는 배열을 하나씩 빼주면서 랜덤으로 채운것들을 하나씩 뽑아서 shuffle에 넣어준다
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0],
    );
    // console.log(candidate);
    // console.log(shuffle);
  }
  //맨 마지막 번호는 보너스 번호
  const bonusNumber = shuffle[shuffle.length - 1];

  //정답 번호를 앞에서부터 6개를 뽑은 후 오름차순 정리 한다
  // c - p 일 경우 내림차순
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  // 승리한 번호의 배열(spread) 과 보너스 번호를 한 배열로 리턴해준다
  return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
  components: {
    // 'lotto-ball': LottoBall,
    //뷰에서 PascalCase는 자동으로 kebab-case 로 바꿔준다
    LottoBall,
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      //하나씩 1초마다 winBalls 에 넣어준다 winBalls는 시각적인 용도
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },

  computed: {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
      this.showBalls();
    },
    showBalls() {
      //먼저 보너스를 제외한 공을 뽑는다
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach(t => clearTimeout(t));
  },
  // 어떤 값이 바뀌었는지 안바뀌었는지 감시하는 기능
  // 자주쓰면 좋지 않다
  // watch: {
  //   // bonus(value, oldvalue) {
  //   //   if (value === null) {
  //   //     console.log(value, oldvalue);
  //   //     this.showBalls();
  //   //   }
  //   // },
  //   redo(value, oldvalue) {
  //     if (value === false) {
  //       console.log(value, oldvalue);
  //       this.showBalls();
  //     }
  //   },
  // },
};
</script>

<style scoped></style>

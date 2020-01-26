<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  name: 'LottoBall',
  // props: {
  //   number: Number,
  // },
  // props: ['number'],
  props: {
    number: Number, //자료형을 설정해준다
  },

  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = 'red';
      } else if (this.number <= 20) {
        background = 'orange';
      } else if (this.number <= 30) {
        background = 'yellow';
      } else if (this.number <= 40) {
        background = 'blue';
      } else {
        background = 'green';
      }
      return {
        background,
      };
    },
  },
  //프롭스로 받은 것을 바꾸는것은 금지되어있다.(읽기 전용)
};
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>

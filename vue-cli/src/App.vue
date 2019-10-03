<template>
  <div>
    <!-- <app-header v-bind:프롭스 속성 이름="상위 컴포넌트 이름"></app-header> -->
    <app-header v-bind:propsdata="str" v-on:renew="renewString" />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  data: function() {
    return {
      str: "Header"
    };
  },
  components: {
    "app-header": AppHeader
  },
  methods: {
    renewString: function() {
      this.str = "hello vue-cli";
    }
  }
  // methods: {
  //   renewString: function() {
  //     this.str = "hi";
  //   }
  // }
};
</script>

<style>
</style>
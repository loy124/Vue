<template>
  <header>
    <div>{{propsdata}}</div>
    <button v-on:click="sendEvent">click</button>
  </header>
</template>

<script>
export default {
  props: ["propsdata"],
  methods: {
    sendEvent: function() {
      this.$emit("renew");
    }
  }
};
</script>

<style>
</style>
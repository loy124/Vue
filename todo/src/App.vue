<template>
  <div id="app">
    <AppHeader></AppHeader>
    <AppInput></AppInput>
    <AppList></AppList>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppInput from "./components/AppInput";
import AppList from "./components/AppList";
import AppFooter from "./components/AppFooter";

export default {
  components: {
    AppHeader,
    AppInput,
    AppList,
    AppFooter
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
}
</style>

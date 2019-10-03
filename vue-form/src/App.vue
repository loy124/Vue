<template>
  <div>
    <!-- //submit.prevent를 사용하면 e.preventDefault와 같다 -->
    <form v-on:submit.prevent="submitForm">
      <div>
        <label for="id">id:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">password:</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <button>login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submitForm: function() {
      console.log(this.username, this.password);
      const url = "https://jsonplaceholder.typicode.com/users";
      const formData = {
        username: this.username,
        password: this.password
      };
      axios
        .post(url, formData)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="inputBox shadow">
    <input type="text" v-model="inputData" @keyup.enter="addTodoItem" />
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer" @click="addTodoItem">
      <i class="fas fa-plus addBtn"></i>
    </span>

    <Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
      -->
      <h3 slot="header">
        <span>경고!</span>
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
      </h3>

      <h3 slot="body">무언가를 입력하세요</h3>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/Modal";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      inputData: "",
      showModal: false
    };
  },
  methods: {
    addTodoItem() {
      if (this.inputData !== "") {
        this.$store.commit("addOneItem", this.inputData);
      } else {
        this.showModal = !this.showModal;
      }
      this.clearInput();
    },
    clearInput() {
      this.inputData = "";
    }
  },
  components: {
    Modal
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  margin-left: 10px;
  color: #42b983;
}
</style>
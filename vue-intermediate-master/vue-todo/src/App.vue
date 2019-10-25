<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter v-on:removeAll="removeAllItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

export default {
  data() {
    return {
      todoItems: []
    };
  },
  methods: {
    // removeOneItem(todoItem, index) {
    //   console.log(todoItem);
    //   localStorage.removeItem(todoItem.item);
    //   this.todoItems.splice(index, 1);
    // },
    // toggleOneItem(todoItem, index) {
    //   // todoItem.completed = !todoItem.completed;
    //   //컴포넌트 간 경계 명확화
    //   this.todoItems[index].completed = !this.todoItems[index].completed;
    //   // 로컬스토리지 갱신
    //   localStorage.removeItem(todoItem.item);
    //   localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    // },
    removeAllItem() {
      localStorage.clear();
      this.todoItems = []; //빈배열로 만들기
    }
  },

  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
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

<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v:on:toggle="toggleOneItem"
    ></TodoList>
    <TodoFooter v-on:removeAll="removeAllItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

export default {
  data: function() {
    return {
      todoItems: []
    };
  },
  methods: {
    addOneItem: function(todoItem) {
      let obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      console.log(todoItem);
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      //컴포넌트 간 경계 명확화
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 로컬스토리지 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    removeAllItem: function() {
      localStorage.clear();
      this.todoItems = []; //빈배열로 만들기
    }
  },
  created: function() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // console.log(localStorage.getItem(localStorage.key(i)));
          // console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); //오브젝트 변환
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
        // console.log(localStorage.key(i));
      }
    }
  },
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter
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

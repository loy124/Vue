<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fas fa-check"
          v-bind:class="{checkBtnCompleted : todoItem.completed}"
          v-on:click="toggleComplete({todoItem, index})"
        ></i>
        <span v-bind:class="{textCompleted : todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
      <!-- <button v-on:click="removeTodo">delete</button> -->
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    //인자가 자동으로 넘어간다
    ...mapMutations({
      removeTodo: "removeOneItem"
    }),
    ...mapMutations({
      toggleComplete: "toggleOneItem"
    })
    // removeTodo(todoItem, index) {
    //   this.$store.commit("removeOneItem", { todoItem, index });
    //   //새로운 배열 반환
    // },
    // toggleComplete(todoItem, index) {
    //   // this.$emit("toggle", todoItem, index);
    //   this.$store.commit("toggleOneItem", { todoItem, index });
    //   // console.log(todoItem);
    // }
  },
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedTodoItems;
    // },
    ...mapGetters(["storedTodoItems"])
    //위 선언내용과 다를때 객체 리터럴 방식 사용
    // ...mapGetters({
    //   todoItems: "storedTodoItems"
    // })
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

/* 리스트 아이템 트랜지션 효과 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
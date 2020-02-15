<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import index from "./views/index.vue";

// export default Vue.extend({
//   // 使用基础 Vue 构造器，创建一个“子类”
//   name: "app",
//   components: {
//     index
//   }
// });
@Component({
  name: "app",
  components: {
    index
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <a class="daily-item">
    <div class="daily-img" v-if="data.images">
      <img :src="imgPath + data.images[0]" />
    </div>
    <div class="daily-title" :class="{ noImg: !data.images }">
      {{ data.title }}
    </div>
  </a>
</template>
<script lang="ts">
import $ from "../libs/util";
// import Vue from "vue";
// import Component from "vue-class-component";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "item"
  // props: {
  //   data: {
  //     type: Object
  //   }
  // }
})
export default class Item extends Vue {
  // data
  imgPath: string = $.imgPath;
  @Prop({ type: Object, default: {} })
  data: Object;
}
// export default {
//   props: {
//     data: {
//       type: Object
//     }
//   },
//   data() {
//     return {
//       imgPath: $.imgPath
//     };
//   }
// };
</script>
<style lang="scss">
.daily-item {
  overflow: hidden;
  display: block;
  padding: 16px;

  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e3e8ee;
  }
}

.daily-img {
  float: left;
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
}

.daily-title {
  padding: 10px 5px 10px 90px;

  &.noImg {
    padding-left: 5px;
  }
}
</style>

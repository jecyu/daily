<template>
  <a class="daily-item">
    <div class="daily-img" v-if="data.images">
      <img :src="imgPath + data.images[0]">
    </div>
    <div class="daily-title" :class="{ noImg: !data.images}">{{ data.title }}</div>
  </a>
</template>
<script>
import $ from "../libs/util";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      // imgPath: "" // 接口返回数据有变，不用处理跨域
      imgPath: $.imgPath
    };
  }
};
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

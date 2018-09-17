<template>
    <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item" :class="{ on: type === 'recommend'}">每日推荐</div>
        <div class="daily-menu-item" :class="{ on: type === 'daily'}" @click="showThemes = !showThemes">主题日报</div>
        <ul v-show="showThemes">
          <li v-for="item in themes" :key="item.id">
            <a :class="{ on: item.id === themeId && type === 'daily'}" @click="handleToTheme(item.id)">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="daily-list">
        <Item></Item>
      </div>
      <daily-article></daily-article>
    </div>
</template>

<script>
import $ from "../libs/util";
export default {
  name: "index",
  data() {
    return {
      themes: [
        {
          name: "日常心理学",
          id: 13,
          thumbnail: "http://pic3.zhimg.com/xxx.jpg",
          color: 15007,
          description: "了解自己和别人，了解彼此的欲望和局限。"
        }
      ],
      showThemes: false,
      type: "recommend",
      list: [
        {
          type: 0,
          id: 7097426,
          title:
            "人们在虚拟生活中投入的精力是否对现实生活的人际关系有积极意义？"
        },
        {
          type: 0,
          id: 7101963,
          title: "写给想成为心里咨询师的学生同仁",
          images: ["http://pic1.zhimg.com/xxx.jpg"]
        }
      ], // 文章列表
      themeId: 0
    };
  },
  methods: {
    getThemes() {
      // axios 发起 get 请求
      $.ajax.get("themes").then(res => {
        this.themes = res.others;
      });
    },
    handleToTheme(id) {
      // 改变菜单分类
      this.type = "daily";
      // 设置当前点击子类的主题日报 id
      this.themeId = id;
      // 清空中间栏的数据
      this.list = [];
      $.ajax.get("theme/" + id).then(res => {
        // 过滤掉类型为 1 的文章，该类型下的文章为空
        this.list = res.stories.filters(item => item.type !== 1);
      });
    }
  },
  mounted() {
    // 初始化时调用
    this.getThemes();
  }
};
</script>

<style  lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #657180;
  font-size: 16px;
}

.daily-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;

  width: 150px;
  background: #f5f7f9;

  &-item {
    margin: 5px 0;
    padding: 10px 0;

    font-size: 18px;
    text-align: center;
    cursor: pointer;
    border-right: 2px solid transparent;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: #e3e8ee;
    }
    &.on {
      border-right: 2px solid #3399ff;
    }
  }
}

.daily-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
  width: 300px;
}

.daily-item {
  display: block;
  padding: 16px;
  overflow: hidden;

  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e3e8ee;
  }
}

.daily-article {
  margin-left: 450px;
  padding: 20px;
}

.daily-menu ul {
  list-style: none;
}

.daily-menu ul li a {
  display: block;
  padding: 5px 0;
  margin: 5px 0;

  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &.on {
    color: hsl(210, 100%, 60%);
  }
}
</style>

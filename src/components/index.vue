<template>
    <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item" :class="{ on: type === 'recommend'}" @click="handleToRecommend">每日推荐</div>
        <div class="daily-menu-item" :class="{ on: type === 'daily'}" @click="showThemes = !showThemes">主题日报</div>
        <ul v-show="showThemes">
          <li v-for="item in themes" :key="item.id">
            <a :class="{ on: item.id === themeId && type === 'daily'}" @click="handleToTheme(item.id)">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="daily-list" ref="list" @scroll="handleScroll">
        <template v-if="type === 'recommend'">
          <div v-for="list in recommendList" :key="list.id">
            <div class="daily-date">{{ formatDay(list.date) }}</div>
             <Item v-for="item in list.stories" :key="item.id" :data="item" @click.native="handleClick(item.id)">
            </Item>
          </div>
        </template>
        <template v-if="type === 'daily'">
          <Item v-for="item in list" :data="item" :key="item.id" @click.native="handleClick(item.id)">
          </Item>
        </template>
      </div>
      <daily-article :id="articledId"></daily-article>
    </div>
</template>

<script>
import $ from "../libs/util";
// import Item from "./Item";
// import dailyArticle from "./DailyArticle";

// 按需加载（用于单个组件文件较大时）
const Item = resolve => require(["./Item"], resolve);
const dailyArticle = resolve => require(["./DailyArticle"], resolve);

export default {
  name: "index",
  components: {
    Item: Item,
    dailyArticle: dailyArticle
    // Item,
    // dailyArticle
  },
  data() {
    return {
      themes: [
        // {
        //   name: "日常心理学",
        //   id: 13,
        //   thumbnail: "http://pic3.zhimg.com/xxx.jpg",
        //   color: 15007,
        //   description: "了解自己和别人，了解彼此的欲望和局限。"
        // }
      ],
      showThemes: false,
      themeId: 0,
      // 中间栏文章列表
      list: [
        // {
        //   type: 0,
        //   id: 7097426,
        //   title:
        //     "人们在虚拟生活中投入的精力是否对现实生活的人际关系有积极意义？"
        // },
        // {
        //   type: 0,
        //   id: 7101963,
        //   title: "写给想成为心里咨询师的学生同仁",
        //   images: ["http://pic1.zhimg.com/xxx.jpg"]
        // }
      ],
      // 每日推荐
      type: "recommend",
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      articledId: 0
    };
  },
  methods: {
    getThemes() {
      // axios 发起 get 请求
      $.ajax.get("themes").then(res => {
        this.themes = res.others;
        console.log(this.themes);
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
        // console.log(res);
        // 过滤掉类型为 1 的文章，该类型下的文章为空
        this.list = res.stories.filter(item => item.type !== 1);
      });
    },
    handleToRecommend() {
      this.type = "recommend";
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList() {
      // 加载时设置为 true，加载完成后设置为 false
      this.isLoading = true;
      const prevDay = $.prevDay(this.dailyTime + 86400000); // 默认获取今天0点的时间戳，故请求时需要多加一天
      $.ajax.get("news/before/" + prevDay).then(res => {
        this.recommendList.push(res);
        this.isLoading = false;
      });
    },

    /**
     * formatDay() 转换为带汉字的月日
     * @param {String} date
     */
    formatDay(date) {
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      if (month.substr(0, 1) === "0") {
        month = month.substr(1, 1);
      }
      if (day.substr(0, 1) === "0") {
        day = day.substr(1, 1);
      }
      return `${month} 月 ${day} 日`;
    },
    handleScroll() {
      const $list = this.$refs.list;
      // 在“主题日报” 或正在加载推荐列表时停止操作
      if (this.type === "daily" || this.isLoading) {
        return;
      }
      // console.log(
      //   $list.scrollTop,
      //   document.body.clientHeight,
      //   $list.scrollHeight
      // );
      // 已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
      if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        // 时间相对减少一天
        this.dailyTime -= 86400000;
        this.getRecommendList();
      }
    },

    /**
     * handleClick() 处理文章项目单击
     * @param {Number} id 文章 id
     */
    handleClick(id) {
      this.articledId = id;
    }
  },
  mounted() {
    // 初始化时调用
    this.getThemes();
    this.getRecommendList();

    // // 获取到 DOM
    // const $list = this.$refs.list;
    // // 监听中栏的滚动事件
    // $list.addEventListener("scroll", () => {
    //   // 在“主题日报” 或正在加载推荐列表时停止操作
    //   if (this.type === "daily" || this.isLoading) {
    //     return;
    //   }
    //   // 已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
    //   if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
    //     // 时间相对减少一天
    //     this.dailyTime -= 86400000;
    //     this.getRecommendList();
    //   }
    // });
  }
};
</script>

<style lang="scss">
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

.daily-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;

  width: 300px;
  border-right: 1px solid #d7dde4;
}

.daily-date {
  text-align: center;
  margin: 10px 0;
}
</style>


<template>
  <div class="daily-article">
    <div class="daily-article-title">{{ data.title }}</div>
    <div class="daily-article-content" v-html="data.body"></div>
    <div class="daily-comments" v-show="comments.length">
      <span>评论 {{ comments.length }}</span>
      <div class="daily-comment" v-for="comment in comments" :key="comment.id">
        <div class="daily-comment-avatar">
          <img :src="comment.avatar" alt="" />
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment-name">{{ comment.author }}</div>
          <div class="daily-comment-time" v-time="comment.time">
            {{ comment.time }}
          </div>
          <div class="daily-comment-text">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import $ from "../libs/util";
import Time from "../directives/time";
// import Vue from "vue";
// import Component from "vue-class-component";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "DailyArticle",
  directives: { Time }
})
export default class DailyArticle extends Vue {
  private data: Object = {};
  private comments: Array<any> = [];
  @Prop({ default: 0 }) private id!: number;  // 必须加 !，否则报没初始化的错误 ，！表示以后一定赋值

  @Watch("id")
  private onIdChanged(val: number) {
    if (val) {
      this.getArticle();
      this.getComments();
    }
  }
  private getArticle(): void {
    $.ajax.get("news/" + this.id).then(
      (res: any): void => {
        // 将文章中的图片地址替换为代理的地址
        res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath + "http");
        res.body = res.body.replace(
          /src="https/g,
          'src="' + $.imgPath + "https"
        );
        this.data = res;

        // 返回文章顶端
        window.scrollTo(0, 0);
      }
    );
  }
  private getComments(): void {
    this.comments = [];
    $.ajax.get("story/" + this.id + "/short-comments").then(
      (res: any): any => {
        this.comments = res.comments.map(
          (comment: any): any => {
            // 将头像的图片地址转为代理地址
            comment.avatar = $.imgPath + comment.avatar;
            return comment;
          }
        );
      }
    );
  }
}
// export default {
//   name: "daily-article",
//   directives: { Time },
//   props: {
//     id: {
//       type: Number,
//       default: 0
//     }
//   },
//   data() {
//     return {
//       data: {},
//       comments: []
//     };
//   },
//   methods: {
//     getArticle(): void {
//       $.ajax.get("news/" + this.id).then(
//         (res: any): void => {
//           // 将文章中的图片地址替换为代理的地址
//           res.body = res.body.replace(
//             /src="http/g,
//             'src="' + $.imgPath + "http"
//           );
//           res.body = res.body.replace(
//             /src="https/g,
//             'src="' + $.imgPath + "https"
//           );
//           this.data = res;

//           // 返回文章顶端
//           window.scrollTo(0, 0);
//         }
//       );
//     },
//     getComments(): void {
//       this.comments = [];
//       $.ajax.get("story/" + this.id + "/short-comments").then(
//         (res: any): any => {
//           this.comments = res.comments.map(
//             (comment: any): any => {
//               // 将头像的图片地址转为代理地址
//               comment.avatar = $.imgPath + comment.avatar;
//               return comment;
//             }
//           );
//         }
//       );
//     }
//   },
//   watch: {
//     id(val) {
//       if (val) {
//         this.getArticle();
//         this.getComments();
//       }
//     }
//   }
// };
</script>
<style>
.daily-arctile {
  margin-left: 450px;
  padding: 20px;
}

.daily-arctile-title {
  padding: 10px 0;
  font-size: 28px;
  font-weight: bold;
  color: hsl(0, 0%, 13%);
}

.view-more a {
  display: block;
  padding: 4px 0;
  border-radius: 3px;

  cursor: pointer;
  background: hsl(210, 25%, 97%);
  color: inherit;
  text-align: center;
  text-decoration: none;
}
</style>

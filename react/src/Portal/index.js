import './index.scss';
import $ from '../utils/base'
import Item from "../components/Item/index";
import DailyArticle from "../components/DailyArticle/index";
import React, { Component } from 'react';
class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = { // this 指向类的实例
      themes: [], // 主题
      showThemes: false, // 显示主题
      themeId: 0, // 主题 id
      list: [],
      type: "recommend",
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      articledId: 0 // 文章 id
    }
  }
  getThemes() {
    // axios 发起 get 请求
    $.ajax.get("themes").then(
      res => {
        // this.state.themes = res.others;
        this.setState({
          themes: res.others
        })
      }
    );
  }
  handleToTheme(id) {
    // 改变菜单分类
    this.state.type = "daily";
    // 设置当前点击子类的主题日报 id
    this.state.themeId = id;
    // 清空中间栏的数据
    this.state.list = [];
    $.ajax.get("theme/" + id).then(res => {
      // console.log(res);
      // 过滤掉类型为 1 的文章，该类型下的文章为空
      this.state.list = res.stories.filter(item => item.type !== 1);
    });
  }
  handleToRecommend() {
    this.state.type = "recommend";
    this.state.recommendList = [];
    this.state.dailyTime = $.getTodayTime();
    this.getRecommendList();
  }
  getRecommendList() {
    // 加载时设置为 true，加载完成后设置为 false
    // this.state.isLoading = true;
    this.setState({
      isLoading: true
    });
    const prevDay = $.prevDay(this.state.dailyTime + 86400000); // 默认获取今天0点的时间戳，故请求时需要多加一天
    $.ajax.get("news/before/" + prevDay).then(
      res => {
        // this.state.recommendList.push(res);
        this.setState({
          recommendList: [res]
        })
        // this.state.isLoading = false;
        this.setState({
          isLoading: false
        })
      }
    );
  }

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
  }
  handleScroll() {
    // const $list = this.$refs.list;
    // 在“主题日报” 或正在加载推荐列表时停止操作
    if (this.state.type === "daily" || this.state.isLoading) {
      return;
    }
    // console.log(
    //   $list.scrollTop,
    //   document.body.clientHeight,
    //   $list.scrollHeight
    // );
    // 已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
    // if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
    //   // 时间相对减少一天
    //   this.dailyTime -= 86400000;
    //   this.getRecommendList();
    // }
  }

  /**
   * handleClick() 处理文章项目单击
   * @param {Number} id 文章 id
   */
  handleClick(id) {
    // this.state.articledId = id;
    this.setState({
      articledId: id
    })
  }
  componentWillMount() {
    // 初始化时调用
    this.getThemes();
    this.getRecommendList();
  }
  render() {
    return (
      <div className="daily">
        <div className="daily-menu">
          <div
            className={this.state.type === 'recommend'? "daily-menu-item on" : "daily-menu-item" }
            onClick={this.handleToRecommend.bind(this)}
          >
            每日推荐
          </div>
          <div
            className={this.state.type === 'daily'? "daily-menu-item on" : "daily-menu-item"}
            onClick={
              () => {
                this.state.showThemes = !this.state.showThemes;
              }
            }
          >
            主题日报
          </div>
            {
              this.state.showThemes 
                ? <ul>
                    {
                      this.state.themes.map((item) => (
                        <li key={item.id}>
                        <a
                          className={item.id === this.state.themeId && this.state.type === 'daily' ? "on": null}
                          onClick={this.handleToTheme(item.id).bind(this)}
                          >{item.name }</a>
                      </li> 
                      ))
                    }
                  </ul>
                : null
            }
        </div>
        <div className="daily-list" ref="list" onScroll={this.handleScroll.bind(this)}>
           {
            this.state.type === 'recommend'
              ? this.state.recommendList.map(list => 
                (
                  <div key={list.id}>
                    <div className="daily-date">{ this.formatDay(list.date) }</div>
                    {
                      list.stories.map(item => (
                        <Item
                          key={item.id}
                          data={item}
                          onClick={   // 传递 onClick 属性给组件
                            this.handleClick.bind(this, item.id)
                          }
                        >
                        </Item>
                      ))
                    }
                  </div>
                )
              )
              : null
          }
          {this.state.type === 'daily' 
            ? this.state.list.map(item => (
              <Item
              data={item}
              key={item.id}
             onClick={this.handleClick.bind(this, item.id)}
              >
              </Item>
            ))
            : null
          }
        </div>
        <DailyArticle id={this.state.articledId}></DailyArticle>
      </div>
    )
  }
}

export default Portal;

import React, { Component } from 'react';
import './index.scss';
import $ from '../../utils/base';
import { getFormatTime } from "../../utils/time";

class DailyArticle extends Component {
  static defaultProps = {
    id: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      comments: []
    }
  }

  // componentDidMount() {
  //   debugger; // todo 监听
  //   this.watch(this.props, function(prop, value) {
  //     if (prop === 'id' && value) {
  //       this.getArticle();
  //       this.getComments();
  //     }
  //   })
  // }
  // @Watch("id")
  // onIdChanged(val) {
  //   if (val) {
  //     this.getArticle();
  //     this.getComments();
  //   }
  // }
  // 监听 props 更改
  componentWillReceiveProps(props) {
    console.log(props.id);
    if (props.id) {
      this.getArticle(props.id);
      this.getComments(props.id);
    }
  }
  // /**
  //  * 监听函数
  //  * @param {*} target 
  //  * @param {*} callback 
  //  */
  // watch(target, callback) {
  //   const proxy = new Proxy(target, {
  //     get: function(target, prop) {
  //       return target[prop];
  //     },
  //     set: function(target, prop, value) {
  //       target[prop] = value;
  //       callback(prop, value)
  //     }
  //   })
  //   return proxy;
  // }
  
  getArticle(id) {
    $.ajax.get("news/" + id).then(
      res => {
        // 将文章中的图片地址替换为代理的地址
        res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath + "http");
        res.body = res.body.replace(
          /src="https/g,
          'src="' + $.imgPath + "https"
        );
        // this.state.data = res;
        this.setState({
          data: res
        })

        // 返回文章顶端
        window.scrollTo(0, 0);
      }
    );
  }
   getComments(id) {
    this.state.comments = [];
    $.ajax.get("story/" + id + "/short-comments").then(
      res => {
        const comments = res.comments.map(
          comment => {
            // 将头像的图片地址转为代理地址
            comment.avatar = $.imgPath + comment.avatar;
            return comment;
          }
        );
        this.setState({
          comments
        })
      }
    );
  }
  render() {
    return (
      <div className="daily-article">
        <div className="daily-article-title">{ this.state.data.title }</div>
        <div className="daily-article-content" dangerouslySetInnerHTML={{__html: this.state.data.body}}>
        {/* { this.state.data.body }; */} 
        </div>
        {
          this.state.comments.length > 0 
            ? <div className="daily-comments">
                <span>评论 {this.state.comments.length }</span>
                {this.state.comments.map(comment => (
                  <div className="daily-comment" key={comment.id}>
                    <div className="daily-comment-avatar">
                      <img src={comment.avatar} alt="" />
                    </div>
                    <div className="daily-comment-content">
                      <div className="daily-comment-name">{ comment.author }</div>
                      <div className="daily-comment-time">
                        { getFormatTime(comment.time) }
                      </div>
                      <div className="daily-comment-text">{ comment.content }</div>
                    </div>
                  </div>
                ))}
              </div>
            : null
        }
      </div>
    )
  }
}

export default DailyArticle;

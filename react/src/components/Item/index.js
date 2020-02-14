import './index.scss';
import $ from '../../utils/base'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Item extends Component {
  static defaultProps = {
    data: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      imgPath: $.imgPath
    }
  }
  componentDidMount() {
    // 获取当前真实 DOM 元素
    const thisDOM = ReactDOM.findDOMNode(this);
    thisDOM.addEventListener('click', this.props.onClick, false );
  }
  componentWillUnmount() {
    const thisDOM = ReactDOM.findDOMNode(this);
    thisDOM.removeEventListener('click', this.props.onClick );
  }
  render() {
    return (
      <a className="daily-item">
        {
          this.props.data.images 
            ? <div className="daily-img">
                <img src={this.state.imgPath + this.props.data.images[0]} />
              </div>
            : null
        }
        <div className="daily-title" className={ !this.props.data.images ? "noImg" : null }>
          {this.props.data.title }
        </div>
      </a>
    )
  }
}

export default Item;
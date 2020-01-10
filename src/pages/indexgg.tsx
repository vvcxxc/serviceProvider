import { PullToRefresh, Button } from 'antd-mobile';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

export default class QrCodePage extends Component {
  state = {
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [1,2,2,2,22,,2,33224,23,423,42,4,234,25,32524542,4,324,23,432,423,4,23,423,423,423],
  };
 

  componentDidMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    // setTimeout(() => this.setState({
    //   height: hei,
    //   data: genData(),
    // }), 0);
  }

  //上拉触发 请求下一页数据
  getMoreData = () => {
    console.log('触发了， ');
    this.setState({ refreshing:false})
  }

  render() {
    return (<div>
      <Button
        style={{ marginBottom: 25 }}
        onClick={() => this.setState({ down: !this.state.down })}
      >
        
      </Button>
      <PullToRefresh
        direction={'up'}
        distanceToRefresh={25}
        refreshing={this.state.refreshing}
        onRefresh={this.getMoreData}
        damping={70}
      >
        {this.state.data.map((i:any,index:number) => (
          <div key={index} style={{ textAlign: 'center', padding: 20 }}>
            {this.state.down ? 'pull down' : 'pull up'} {i}
          </div>
        ))}
      </PullToRefresh>
    </div>);
  }
}
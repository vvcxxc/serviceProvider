/**title: 数据 */
import React, { Component } from 'react'
import styles from './index.less'
import Filtrate from '../../components/Filtrate/index';
import { Flex, WingBlank, Icon } from 'antd-mobile'
import ReactEcharts from 'echarts-for-react';
import Request from '@/service/request';
import dayjs from 'dayjs'
import echarts from 'echarts'
import walden from './walden'
import echartsTheme from './echartsTheme'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
export default class DataPage extends Component {
  state = {
    countStats: {
      codeStats: 0,
      facilitatorStats: 0
    },
    data: {
      xAxis: [],
      value: []
    },
    closeNum: 1,
    total: 0,
    box1Show: true,
    box2Show: true
  }
  componentWillMount() {
    echarts.registerTheme('theme', echartsTheme);
    echarts.registerTheme('walden', walden)
  }
  componentDidMount() {
    let date = dayjs(now).format('YYYY-MM')
    let arr = date.split('-')
    Request({
      method: 'get',
      url: 'indexData',
      params: {
        month: arr[1],
        year: arr[0]
      }
    }).then(res => {
      let { days, countStats } = res.data
      let total = this.accAdd(countStats.codeStats, countStats.facilitatorStats)
      let xAxis = []
      let value = []
      for (let key in days) {
        xAxis.push(key)
        value.push(days[key])
      }
      let data = { xAxis, value }
      this.setState({ countStats, data, total })
    })
  }
  getOption() {
    const { data } = this.state
    var endPercent = (6 / data.xAxis.length) * 100;
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      dataZoom: [//给x轴设置滚动条
        {
          start: 0,//默认为0
          end: endPercent,
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0,//滑动条的 左右2个滑动条的大小
          height: 8,//组件高度
          left: 50, //左边的距离
          right: 40,//右边的距离
          bottom: 26,//右边的距离
          handleColor: '#ddd',//h滑动图标的颜色
          handleStyle: {
            borderColor: "#cacaca",
            borderWidth: "1",
            shadowBlur: 2,
            background: "#ddd",
            shadowColor: "#ddd",
          },
          backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
          showDataShadow: false,//是否显示数据阴影 默认auto
          showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
          filterMode: 'filter'
        },
        //下面这个属性是里面拖到
        {
          type: 'inside',
          show: true,
          xAxisIndex: [0],
          start: 0,//默认为1
          end: 50
        }],
      xAxis: {
        type: 'category',
        data: data.xAxis,
        nameTextStyle: {
          fontSize: 24
        }
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {
          fontSize: 21
        }
      },
      series: [{
        radius: '90%',
        data: data.value,
        type: 'line',
      }]
    }
  }
  /**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
  accAdd = (arg1: any, arg2: any) => {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  }
  getOption2() {
    const { countStats } = this.state
    return {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: '2%',
        top: '5%',
        data: ['二维码收益', '服务商分成'],
        textStyle: {
          fontSize: 25,
          fontWeight: 400
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          label: {
            normal: {
              show: true,
              position: 'outside', //标签的位置
              textStyle: {
                fontWeight: 800,
                fontSize: 23   //文字的字体大小
              },
              // formatter: '{d}%'
            }
          },
          labelLine: {
            show: true,

          },
          data: [
            { value: countStats.codeStats, name: '二维码收益' },
            { value: countStats.facilitatorStats, name: '服务商分成' },
          ],
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            fontSize: 23,
            fontWeight: 500
          }
        }
      ]
    }
  }
  getOption3() {
    const { countStats } = this.state
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        bottom: 0,
        data: ['服务商分成', '二维码'],
        textStyle: {
          fontSize: 25,
          fontWeight: 400
        }
      },
      series: [
        {
          name: '收入分类',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: countStats.codeStats, name: '二维码' },
            { value: countStats.facilitatorStats, name: '服务商分成' },
          ]
        }
      ]
    }
  }



  searchPayload = (a: any) => {
    let { date } = a
    let arr = date.split('-')
    Request({
      method: 'get',
      url: 'indexData',
      params: {
        month: arr[1],
        year: arr[0]
      }
    }).then(res => {
      let { days, countStats } = res.data
      let xAxis = []
      let value = []
      for (let key in days) {
        xAxis.push(key)
        value.push(days[key])
      }
      let total = this.accAdd(countStats.codeStats, countStats.facilitatorStats)
      let data = { xAxis, value }
      this.setState({ countStats, data, total })
    })

  }

  showBox1 = () => {
    this.setState({ box1Show: !this.state.box1Show })
  }
  showBox2 = () => {
    this.setState({ box2Show: !this.state.box2Show })
  }
  render() {
    return (
      <div className={styles.dataPage}>
        <div className={styles.dataPage_bg}>
          <Filtrate
            // background={'#ffffff'}
            onSearch={this.searchPayload}
            closeNum={this.state.closeNum}
            isDate={true}
          />
        </div>
        <div className={styles.dataPage_content}>
          <div className={styles.totals}>
            <div className={styles.totals_num}>收入<span style={{ color: '#738ed7', marginLeft: '15px' }}>￥{this.state.total} </span></div>
            {/* <div className={styles.totals_btn}>点此展开<Icon type="down" /> </div> */}
          </div>

          <div className={styles.dataPage_box1}>
            <div className={styles.dataPage_box1_titleBox}>
              <div className={styles.dataPage_box1_num}>每日收入<span style={{ color: '#738ed7', marginLeft: '15px' }}>￥{this.state.total} </span></div>

              {
                !this.state.box1Show ?
                  <div className={styles.dataPage_box1_btn} onClick={this.showBox1}>点此展开<Icon type="down" /> </div>
                  :
                  <div className={styles.dataPage_box1_btn} onClick={this.showBox1}>点此收起<Icon type="up" /> </div>
              }
            </div>
            {
              this.state.box1Show ? <div className={styles.dataPage_box1_contentBox}>
                <ReactEcharts
                  theme="walden"
                  option={this.getOption()}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ width: '100%', height: '500px' }}
                />
              </div> : null
            }
          </div>

          <div className={styles.dataPage_box2}>
            <div className={styles.dataPage_box2_titleBox}>
              <div className={styles.dataPage_box2_num}>收入分类<span style={{ color: '#738ed7', marginLeft: '15px' }}>￥{this.state.total} </span></div>
              {
                !this.state.box2Show ?
                  <div className={styles.dataPage_box2_btn} onClick={this.showBox2}>点此展开<Icon type="down" /> </div>
                  :
                  <div className={styles.dataPage_box2_btn} onClick={this.showBox2}>点此收起<Icon type="up" /> </div>
              }
            </div>
            {
              this.state.box2Show ? <div className={styles.dataPage_box2_contentBox}>
                <ReactEcharts
                  theme="theme"
                  option={this.getOption3()}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ width: '100%', height: '500px' }}
                />
              </div> : null
            }

          </div>
        </div>
      </div >
    )
  }
}

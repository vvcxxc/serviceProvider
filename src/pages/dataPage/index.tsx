/**title: 数据 */
import React, { Component } from 'react'
import styles from './index.less'
import Filtrate from '../../components/Filtrate/index';
import { Flex, WingBlank } from 'antd-mobile'
import ReactEcharts from 'echarts-for-react';
import Request from '@/service/request';
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
  }
  componentDidMount() {
    Request({
      method: 'get',
      url: 'indexData',
      params: {
        month: '10',
        year: '2019'
      }
    }).then(res => {
      let { days, countStats } = res.data
      let xAxis = []
      let value = []
      for (let key in days) {
        xAxis.push(key)
        value.push(days[key])
      }
      let data = { xAxis, value }
      this.setState({ countStats, data })
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
          data: [
            { value: countStats.codeStats, name: '二维码收益' },
            { value: countStats.facilitatorStats, name: '服务商分成' },
          ],
       
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              fontSize: 23,
              // fontWeight: 500
            }
          
        }
      ]
    }
  }

  searchPayload = (a: any) => {
    let { date } = a
    let arr = date.split('-')
    console.log(arr)
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
      let data = { xAxis, value }
      this.setState({ countStats, data })
    })


  }

  render() {
    return (
      <div className={styles.dataPage}>
        <Filtrate
          onSearch={this.searchPayload}
          closeNum={this.state.closeNum}
          isDate={true}
        />
        <div className={styles.totals}>
          收入￥999
        </div>
        <div className={styles.echart_box}>
          <div className={styles.echart_title}>每日收入</div>
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            style={{ width: '100%', height: '500px' }}
          />
        </div>
        <div className={styles.echart_box2}>
          <div className={styles.echart_title}>收入分类</div>
          <div className={styles.echart_content}>
            <ReactEcharts
              option={this.getOption2()}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: '100vw', height: '45vw' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

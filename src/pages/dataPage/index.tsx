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
    }
  }
  componentDidMount() {
    Request({
      method: 'get',
      url: 'indexData',
      params: {
        month: '01',
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
      // dataZoom: {
      //   type: 'inside',
      // },
      dataZoom: [//给x轴设置滚动条
        {
            start:0,//默认为0
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
            // fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            //     //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
            //     //给第一个设置0，第四个设置1，就是垂直渐变
            //     offset: 0,
            //     color: '#1eb5e5'
            // }, {
            //     offset: 1,
            //     color: '#5ccbb1'
            // }]),
            backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
            showDataShadow: false,//是否显示数据阴影 默认auto
            showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
            // handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
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
        data: data.xAxis
      },
      yAxis: {
        type: 'value'
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
        bottom: '50%',
        data: ['二维码收益', '服务商分成']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: [
            { value: countStats.codeStats, name: '二维码收益' },
            { value: countStats.facilitatorStats, name: '服务商分成' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  render() {
    return (
      <div className={styles.dataPage}>
        {/* <Flex className={styles.no_data} justify='around' align='center'>
          暂无图表数据统计
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            style={{width: '100%',height:'600px'}}
          />
        </Flex> */}
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
        <div className={styles.echart_box}>
          <div className={styles.echart_title}>每日收入</div>
          <ReactEcharts
            option={this.getOption2()}
            notMerge={true}
            lazyUpdate={true}
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      </div>
    )
  }
}

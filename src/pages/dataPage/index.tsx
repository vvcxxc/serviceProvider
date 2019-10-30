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
      dataZoom: {
        type: 'inside',
      },
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

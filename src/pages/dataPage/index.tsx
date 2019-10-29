/**title: 数据 */
import React, { Component } from 'react'
import styles from './index.less'
import Filtrate from '../../components/Filtrate/index';
import { Flex, WingBlank } from 'antd-mobile'
import ReactEcharts from 'echarts-for-react';
export default class DataPage extends Component {
  state = {

  }
  componentDidMount() {

  }
  getOption() {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [10, 30, 20, 100, 233, 30, 320],
        type: 'line',
      }]
    }
  }
  getOption2() {
    return {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: '2%',
        bottom: '50%',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '90%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
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
            style={{width: '100%',height:'500px'}}
          />
        </div>
        <div className={styles.echart_box}>
          <div className={styles.echart_title}>每日收入</div>
          <ReactEcharts
            option={this.getOption2()}
            notMerge={true}
            lazyUpdate={true}
            style={{width: '100%',height:'500px'}}
          />
        </div>
      </div>
    )
  }
}

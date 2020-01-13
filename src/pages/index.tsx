/**title: 二维码 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import Request from '@/service/request';
import { Toast, PullToRefresh } from 'antd-mobile';
// import ScrollBottom from '@/components/ScrollBottom';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录
import Filtrate from '../components/Filtrate/ql';//筛选组件
// import Search from './QRcode/ql'
import ReactDOM from 'react-dom'

export default class QrCodePage extends Component {
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,

    currentPrice: 1,
    is_show_loading: true,
    qrCodeList: [],
    qrCodeTitle:{},
    qrCodePage: 1,
    closeNum: 1,
    filter:{},
    dataList: [
      {
        key: 1,
        title: '排序',
        value: [
          { show: '今日收益', props: 'today_money' },
          { show: '本月收益', props: 'month_money' },
          { show: '总收益', props: 'total_money' }
        ],
        select: false
      },
      {
        key: 2,
        title: '铺设状态',
        value: [
          { show: '全部', props: 'all' },
          { show: '已铺设', props: 'layouted' },
          { show: '未铺设', props: 'notLayout' }
        ],
        select: false
      }
    ],

    packageList: [],
    packagePage: 1,

    queuePage: 1,
    queueList: [],
    queueTitle: {},

    record_list: [],
    recordPage: 1,
  }

  componentWillMount() {
    Toast.loading('');
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    const { options_index } = this.state
    const urls = ['qrCodes', 'Packages', 'Attacheds', 'LayoutLog']
    //orderBy 本月收益 month_money  今日收益 today_money 总收益total_money
    //status all全部 layouted 已铺设  notLayout 未铺设
    //codeSn
    let filter = {}
    if(!options_index){
      filter = {...this.state.filter}
    }
    Request({
      url: urls[options_index],
      method: "GET",
      params: {
        page: [this.state.qrCodePage, this.state.packagePage, 1, this.state.recordPage][options_index],
        ...filter
      }
    }).then(res => {
      if (res.code !== 200) return
      switch (options_index) {
        case 0://二维码
          this.setState({
            qrCodeTitle: {
              total: res.data.qrcode_count,//共n个码
              haved: res.data.total, //已铺设n
              money: res.data.money_total,//总收益
            },
            qrCodeList: this.state.qrCodePage > 1 ? [...this.state.qrCodeList, ...res.data.data]:res.data.data,
            is_show_loading: res.data.data.length < 1 ? false : true
          })
          break;
        case 1://码包
          const { data, currentPrice } = res.data
          this.setState({
            packageList: [...this.state.packageList, ...data], currentPrice,
            is_show_loading: data.length < 1 ? false : true
          })
          break;
        case 2://铺店队列
          const { self, Attacheds } = res.data
          this.setState({
            queueTitle: self,
            queueList: Attacheds,
            is_show_loading: Attacheds.length < 1 ? false : true
          })
          break;
        default://铺店记录
          this.setState({
            record_list: [...this.state.record_list, ...res.data.data],
            is_show_loading: res.data.data.length < 1 ? false : true
          })
          break;
      }
      Toast.hide();
    }).catch((err) => {

    })
  }

  scrollBottom = () => {
    const { options_index } = this.state
    switch (options_index) {
      case 0:
        this.setState({ qrCodePage: this.state.qrCodePage + 1 }, this.getMoreData)
        break;
      case 1:
        this.setState({ packagePage: this.state.packagePage + 1 }, this.getMoreData)
        break;
      case 3:
        this.setState({ recordPage: this.state.recordPage + 1 }, this.getMoreData)
        break;

      default:
        break;
    }

  }

  getMoreData = () => {
    if (this.state.is_show_loading) {
      Toast.loading('');
      this.requestList()
    } else {
      Toast.info('暂无更多数据', 1)
    }
  }

  getOptionsIndex = (options_index: number) => {
    Toast.loading('');

    // 切换的时候会多请求一次。。。。
    this.setState({
      qrCodeList: [],
      packageList: [],
      queueList: [],
      record_list: []
    })


    this.setState({ options_index, is_show_loading:true }, () => { this.requestList() })
  }

  //筛选组触发
  searchPayload = (filter: any) => {
    console.log(filter)
    this.setState({ filter, qrCodePage: 1, qrCodeList:[] }, () => {
      this.requestList()
    })
  }

  render() {
    const {
      options_index, options, packageList, currentPrice, is_show_loading,
      record_list, queueList, queueTitle, qrCodeList, qrCodeTitle
    } = this.state
    return (
      <div className={styles.qr_code}>
        <header>
          <ul>
            {
              options.map((value, options_index: number) => {
                return <li key={value} className={options_index === this.state.options_index ? styles.li_border : ''}
                  onClick={this.getOptionsIndex.bind(this, options_index)}>{value}</li>
              })
            }
          </ul>
        </header>
        {
          !options_index ? <Filtrate
            onChange={this.searchPayload}
            dataList={this.state.dataList}
          /> : null
        }
        {
          [
            { title: <ListCode list={qrCodeList} title={qrCodeTitle}/> },
            { title: <ListPackage list={packageList} price={currentPrice} /> },
            { title: <ListStoreQueue list={queueList} title={queueTitle} /> },
            { title: <ListStreRecord list={record_list} /> }
          ][this.state.options_index].title
        }
        {
          options_index !== 2 ? <div className={styles.more_data_ql} onClick={is_show_loading ? this.scrollBottom : () => { }}>{is_show_loading ? '更多数据' : '暂无更多数据'}</div>:null
        }
      </div>
    )
  }
}

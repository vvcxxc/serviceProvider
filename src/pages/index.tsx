/**title: 二维码 */
import React, { Component } from 'react';
import styles from './index.less';
// import router from 'umi/router';
import Request from '@/service/request';
import { Toast, PullToRefresh } from 'antd-mobile';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录
import Filtrate from '../components/Filtrate/ql';//筛选组件
// import ReactDOM from 'react-dom'

export default class QrCodePage extends Component {
  state = {

    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,

    currentPrice: 1,
    is_show_loading: true,

    //二维码数据
    codeList: [],
    codeTitle: {},
    codePage: 1,
    codeMore:true,

    //筛选组件
    filter: {},
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

    //码包数据
    packageList: [],
    packagePage: 1,
    packageMore: true,

    //铺店队列
    queuePage: 1,
    queueList: [],
    queueTitle: {},
    queueMore: true,

    //铺店记录
    record_list: [],
    recordPage: 1,
    recordMore: true,
  }

  componentWillMount() {
    Toast.loading('');
  }

  componentDidMount() {
    this.requestList('qrCodes', 1, 1)
    // this.requestList('Packages', 1, 2)
    // this.requestList('Attacheds', 1, 3)
    // this.requestList('LayoutLog', 1, 4)
  }

  requestList = (url?: any, page?: number, options?: number) => {
    const { options_index, codePage, packagePage, recordPage, codeList, packageList, record_list }
      = this.state 
    // const urls = url ? url : ['qrCodes', 'Packages', 'Attacheds', 'LayoutLog'][options_index]//请求地址
    // const pages = page ? page : [codePage, packagePage, 1, recordPage][options_index] //请求页数
    // let options_total = options ? options - 1 : options_index  //存在的意义是？
    const urls =  ['qrCodes', 'Packages', 'Attacheds', 'LayoutLog'][options_index]//请求地址
    const pages = [codePage, packagePage, 1, recordPage][options_index] //请求页数
    // let options_total =  options_index  //存在的意义是？
    let filter = {}

    if (!options_index) {
      filter = { ...this.state.filter }
    }

    Request({
      url: urls,
      method: "GET",
      params: {
        page: pages,
        ...filter
      }
    }).then(res => {
      const { data,code } = res
      if (code !== 200) return
      switch (options_index) {
        case 0://二维码
          this.setState({
            codeTitle: {
              total: data.qrcode_count,   //共n个码
              haved: data.layouted,       //已铺设
              money: data.money_total,    //总收益
            },
            codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
            codeMore:data.data.length? true :false
          })
          break;
        case 1://码包
          this.setState({
            // packageList: [...this.state.packageList, ...data.data], currentPrice,
            // packageList: [...this.state.packageList, ...data.data],
            packageList: packagePage > 1 ? [...packageList, ...data.data] : data.data,
            packageMore: data.data.length? true : false
          })
          break;
        case 2://铺店队列
          const { self, Attacheds } = data
          this.setState({
            queueTitle: self,
            queueList: Attacheds,
            queueMore: Attacheds.length ? true:false 
          })
          break;
        default://铺店记录
          this.setState({
            record_list: [...record_list, ...data.data],
            recordMore: data.data.length? true:false
          })
          break;
      }
      Toast.hide();
    }).catch((err) => {

    })
  }


  // getMoreData = () => {
  //   if (this.state.is_show_loading) {
  //     Toast.loading('');
  //     this.requestList()
  //   } else {
  //     Toast.info('暂无更多数据', 1)
  //   }
  // }

  getOptionsIndex = (options_index: number) => {
    
    switch (options_index) {
      case 0:
        this.setState({ codePage:  1 })
        break;

      case 1:
        this.setState({ packagePage: 1 })
        break;

      case 3:
        this.setState({ recordPage:  1 })
        break;

      default:
        break;
    }
    this.setState({ options_index }, () => { this.requestList() })
  }

  //筛选组触发
  searchPayload = (filter: any) => {
    this.setState({ filter, qrCodePage: 1, qrCodeList: [] }, () => {
      this.requestList()
    })
  }

  //点击加载更多 
  getWantMore = (_: number) => {

    switch (_) {
      case 0:
        this.setState({ codePage: this.state.codePage + 1 })
        break;
      
      case 1:
        this.setState({ packagePage: this.state.packagePage + 1 })
        break;
      
      case 3:
        this.setState({ recordPage: this.state.recordPage + 1 })
        break;
    
      default:
        break;
    }
    this.setState({ options_index: _ }, () => { this.requestList() })
    
  }

  render() {
    const {
      options_index, options, packageList, currentPrice,
      record_list, queueList, queueTitle, codeList, codeTitle,
      codeMore, packageMore, queueMore,recordMore
    } = this.state
    return (
      <div className={styles.qr_code}>
        <header>
          <ul>
            {
              options.map((value, options_index: number) => {
                return <li key={value}
                  className={options_index === this.state.options_index ? styles.hit : styles.no_hit}
                  onClick={this.getOptionsIndex.bind(this, options_index)}>{value} <span></span> </li>
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
            <ListCode list={codeList} title={codeTitle} have_more={codeMore} getWantMore={this.getWantMore}/>,
            <ListPackage list={packageList} price={currentPrice} have_more={packageMore} getWantMore={this.getWantMore}/>,
            <ListStoreQueue list={queueList} title={queueTitle} have_more={queueMore} getWantMore={this.getWantMore}/>,
            <ListStreRecord list={record_list} have_more={recordMore} getWantMore={this.getWantMore}/>][this.state.options_index]
        }
        {/* {
          options_index ? options_index !== 2 ? <div className={styles.more_data_ql} onClick={is_show_loading ? this.scrollBottom : () => { }}>{is_show_loading ? '更多数据' : '暂无更多数据'}</div> : null:null
          
        } */}
      </div>
    )
  }
}

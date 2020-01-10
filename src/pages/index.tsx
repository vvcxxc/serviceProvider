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
import ReactDOM from 'react-dom'

export default class QrCodePage extends Component {
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,
    
    currentPrice: 1,
    is_show_loading: true,
    qrCodeList: [],
    qrCodePage:1,
    
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

  requestList = () => {
    const { options_index } = this.state
    const urls = ['qrCodeList', 'Packages', 'Attacheds', 'LayoutLog']
    Request({
      url: urls[options_index],
      method:  "GET",
      params: {
        page: [this.state.qrCodePage, this.state.packagePage, this.state.queuePage, this.state.recordPage][options_index]
      }
    }).then(res => {
      if (res.code !== 200) return
      switch (options_index) {
        case 0://二维码
          break;
        case 1://码包
          const { data, currentPrice } = res.data
          this.setState({
            packagePage: 1 + this.state.packagePage,
            packageList: [...this.state.packageList, ...data], currentPrice,
            is_show_loading: data.length < 1 ? false : true
          })
          break;
        case 2://铺店队列
          const { self, Attacheds } = res.data
          this.setState({
            queuePage: 1 + this.state.queuePage,
            queueTitle: self,
            queueList: [...this.state.queueList, ...Attacheds],
            is_show_loading: Attacheds.length < 1 ? false : true 
          })
          break;
        default://铺店记录
          this.setState({
            recordPage: 1 + this.state.recordPage ,
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

    if (this.state.is_show_loading) {
      Toast.loading('');
      this.requestList()
    } else {
      Toast.info('暂无更多数据', 1)
    }

  }

  getOptionsIndex = (options_index: number) => {
    Toast.loading('');
    this.setState({ options_index }, () => { this.requestList()})
  }
 
  render() {
    let els:any 
    const { options, packageList, currentPrice, is_show_loading, record_list, queueList, queueTitle } = this.state
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
        {/* <PullToRefresh
          direction={'up'}
          style={{
            height: '100%',
            overflow:'hidden'
          }}
          ref={el=>els = el}
          distanceToRefresh={25}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.getMoreData, console.log(els,'els');
          }}
          damping={190}
        > */}
          {
            [
              { title: <ListCode /> },
              { title: <ListPackage list={packageList} price={currentPrice} /> },
              { title: <ListStoreQueue list={queueList} title={queueTitle} /> },
              { title: <ListStreRecord list={record_list} /> }
            ][this.state.options_index].title
          }
        {/* </PullToRefresh> */}
          <div style={{
            height: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} onClick={is_show_loading ? this.scrollBottom : () => { }}>{is_show_loading ? '更多数据' : '暂无更多数据'}</div>
        
        {/* <ScrollBottom onChange={this.scrollBottom} isShow={is_show_loading} /> */}
      </div>
    )
  }
}
/**title: 二维码 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import Request from '@/service/request';
import { Toast } from 'antd-mobile';
import ScrollBottom from '@/components/ScrollBottom';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录

export default class QrCodePage extends Component {
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,

    
    currentPrice: 1,
    is_show_loading: true,
    
    packageList: [],
    packagePage: 1,
    // packageLoading:true,

    queuePage: 1,
    queueList: [],
    queueTitle: {},
    // queueLoading: true,

    record_list: [],
    recordPage: 1,
    // recordLoading:true,
  }

  requestList = () => {
    const { options_index } = this.state
    const urls = ['hh', 'Packages', 'Attacheds', 'LayoutLog']
    // const pages = ['', this.state.packagePage, this.state.queuePage, this.state.recordPage] 
    Request({
      url: urls[options_index],
      method:  "GET",
      params: {
        page: [99, this.state.packagePage, this.state.queuePage, this.state.recordPage][options_index]
      }
    }).then(res => {
      if (res.code !== 200) return
      switch (options_index) {
        case 0://二维码
          console.log(1);
          break;
        case 1://码包
          const { data, currentPrice } = res.data
          console.log('dddd');
          
          this.setState({
            is_show_loading: true,
            packagePage: 1 + this.state.packagePage,
            packageList: [...this.state.packageList, ...data], currentPrice,
            
          })
          // this.setState({ is_show_loading: false, })
          // if (data.length < 1) {
          //   this.setState({ is_show_loading: false, })
          // }
          break;
        case 2://铺店队列
          const { self, Attacheds } = res.data
          this.setState({
            queuePage: 1 + this.state.queuePage,
            queueTitle: self,
            queueList: [...this.state.queueList, ...Attacheds],
            is_show_loading: true
          })
          // if (Attacheds.length < 1) {
          //   this.setState({ is_show_loading: false, })
          // }
          break;
        default://铺店记录
          this.setState({
            recordPage: 1 + this.state.recordPage ,
            record_list: [...this.state.record_list, ...res.data.data],
            is_show_loading: true

          })
          // if (res.data.data.length < 1) {
          //   this.setState({ is_show_loading: false, })
          // }
          break;
      }
      Toast.hide();
    }).catch((err) => {

    })
  }

  scrollBottom = () => {
    console.log(this.state.is_show_loading,'totototo');
    
    if (this.state.is_show_loading) {
      Toast.loading('');
      this.requestList()
    } else {
      Toast.info('暂无更多数据', 1)
      // this.setState({ is_show_loading: true })
    }

  }

  getOptionsIndex = (options_index:number) => {
    this.setState({ options_index }, () => { this.requestList()})
    // this.setState({ is_show_loading: true })
  }
  render() {
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
        {
          [
            { title: <ListCode /> },
            { title: <ListPackage list={packageList} price={currentPrice} /> },
            { title: <ListStoreQueue list={queueList} title={queueTitle} /> },
            { title: <ListStreRecord list={record_list}/> }
          ][this.state.options_index].title
        }

        <ScrollBottom onChange={this.scrollBottom} isShow={is_show_loading} />
      </div>
    )
  }
}
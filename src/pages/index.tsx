/**title: 二维码 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import Request from '@/service/request';
import {  Toast } from 'antd-mobile';
import ScrollBottom from '@/components/ScrollBottom';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录

export default class QrCodePage extends Component { 
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 1,
    packageList: [],
    currentPrice: 1,
    is_show_loading: true,
    packagePage:0
  }

  requestList = () => {
    Request({
      url: 'Packages',
      method: 'GET',
      params: {
        page: this.state.packagePage
      }
    }).then(res => {
      if(res.code !==200 ) return 
      const { data, current_page, currentPrice } = res.data
      this.setState({ packageList: [...data, ...this.state.packageList], currentPrice })
      if (data.length < 1) {
        this.setState({ is_show_loading: false, })
      }
      Toast.hide();
    }).catch((err) => {
    })
  }

  scrollBottom = () => {
    if (this.state.is_show_loading) {
      Toast.loading('');
      this.setState({ packagePage: 1 + this.state.packagePage }, () => {
        this.requestList()
      })
    } else {
      Toast.info('暂无更多数据',1)
    }
    
  }
  render() {
    const { options, packageList, currentPrice, is_show_loading} = this.state
    return (
      <div className={styles.qr_code}>
        <header>
          <ul>
            {
              options.map((value, options_index:number)=>{
                return <li key={value} className={options_index === this.state.options_index ? styles.li_border : ''}
                  onClick={() => this.setState({ options_index })}>{value}</li>
              })
            }
          </ul>
        </header>
        {
          [
            { title: <ListCode /> },
            { title: <ListPackage list={packageList} price={currentPrice}/> },
            { title: <ListStoreQueue /> },
            { title: <ListStreRecord /> }
          ][this.state.options_index].title
        }

        <ScrollBottom onChange={this.scrollBottom} isShow={is_show_loading} />
      </div>
    )
  }
}
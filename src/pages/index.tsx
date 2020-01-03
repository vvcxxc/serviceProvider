/**title: 二维码 */
import React, { Component } from 'react';
// import Filtrate from '../../components/Filtrate/index';
// import Invitation from '../../components/Invitation/index';
// import Request from '@/service/request'
import styles from './index.less';
import router from 'umi/router';
// import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录

export default class QrCodePage extends Component { 
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index:2
  }
  render() {
    const { options } = this.state
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
            { title: <ListPackage /> },
            { title: <ListStoreQueue /> },
            { title: <ListStreRecord /> }
          ][this.state.options_index].title
        }
      </div>
    )
  }
}
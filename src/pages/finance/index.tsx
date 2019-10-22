import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile'
import Item from './item'
import Filtrate from '@/components/Filtrate/index';
export default class Finance extends Component {
  state = {
    dataList: [
      {
        key: '排序',
        value: ['筛选', '二维码收入', '邀请人分成', '提现'],
        select: false
      },
    ],
    invitationShow: false,
    closeNum: 1
  }
  searchPayload = (a: Array<string>) => {
    console.log(a)
  }

  render() {
    return (
      <div className={styles.finance_page}>
        <Filtrate
          dataList={this.state.dataList}
          onSearch={this.searchPayload}
          closeNum={this.state.closeNum}
        />
        <Flex className={styles.finance_header}>
          <WingBlank style={{ width: '100%' }}>
            <Flex justify='between' style={{ width: '100%' }}>
              <div>收款￥1000</div>
              <div>提现￥800</div>
            </Flex>
          </WingBlank>
        </Flex>
        <Item money='+10' name='大声道d' date='2019-10-18 10:00:00' />
      </div>
    )
  }
}

import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile'
import Item from './item'
export default class Finance extends Component {
  state = {

  }

  render (){
    return (
      <div className={styles.finance_page}>
        <Flex className={styles.finance_header}>
          <WingBlank style={{width: '100%'}}>
            <Flex justify='between' style={{width: '100%'}}>
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

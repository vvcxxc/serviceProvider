import React, { Component } from 'react'
import styles from './index.less'
import { Flex, WingBlank } from 'antd-mobile'

interface Props {
  money: string;
  name: string;
  date: string;
  valid: number;
}

export default class Item extends Component<Props> {
  state = {

  }

  render (){
    const { money, date, name, valid } = this.props
    return (
      <div className={styles.item_box}>
        <WingBlank>
          <Flex className={styles.item_text} direction='column' align='start' justify='between' >
            <div className={styles.item_name}>{name}</div>
            <div className={styles.item_time}>{date}</div>
          </Flex>
          {
            valid ? null : <div className={styles.valid}>入账中</div>
          }
          <div className={styles.item_money}>+{money}</div>
        </WingBlank>
      </div>
    )
  }
}

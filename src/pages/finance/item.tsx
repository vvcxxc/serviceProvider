import React, { Component } from 'react'
import styles from './index.less'
import { Flex, WingBlank } from 'antd-mobile'

interface Props {
  money: string;
  name: string;
  date: string;
  qrCode: number
}

export default class Item extends Component<Props> {
  state = {

  }
  render (){
    const { money, date, name, qrCode } = this.props
    return (
      <div className={styles.item_box}>
        <WingBlank>
          <Flex className={styles.item_text} direction='column' align='start' justify='between' >
    <div className={styles.item_name}>收入— {qrCode} ({name})</div>
            <div className={styles.item_time}>{date}</div>
          </Flex>
          <div className={styles.item_money}>+{money / 10000}</div>
        </WingBlank>
      </div>
    )
  }
}

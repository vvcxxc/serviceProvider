import React, {Component} from 'react'
import styles from './index.less'
import { Flex, WingBlank, Button } from 'antd-mobile'
import router from "umi/router";
export default class MyBank extends Component {
  state = {

  }
  toChangeBank = () => {
    router.push('/submitQua/BankCard')
  }
  render (){
    return (
      <div className={styles.bank_page}>
        <WingBlank>
          <div className={styles.bank_info}>
            <div className={styles.bank_box}>
              <div className={styles.bank_name}>招商银行</div>
              <div className={styles.card_type}>储蓄卡</div>
              <div className={styles.card_num}>123456789123</div>
            </div>
          </div>
          <Button style={{background: '#1AAD19', color: '#fff', position: 'fixed', bottom: '60px', width: '92%'}} onClick={this.toChangeBank}>
            更改银行卡
          </Button>
        </WingBlank>
      </div>
    )
  }
}

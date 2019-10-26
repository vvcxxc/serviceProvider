/**title: 我的银行卡 */
import React, { Component } from 'react'
import styles from './index.less'
import { Flex, WingBlank, Button } from 'antd-mobile'
import router from "umi/router";
import Request from '@/service/request';
import Cookies from 'js-cookie';
export default class MyBank extends Component {
  state = {
    is_show: false,
    bank_info: {
      bank_name: '',
      bankcard_no: '',

    }
  }
  componentDidMount() {
    Request({
      method: 'get',
      url: 'auth/getBankInfo',
    }).then(res => {
      if (res.data) {
        // 存在银行卡
        this.setState({ is_show: true, bank_info: res.data.userBankinfo })
      } else {
        // 没有银行卡
        console.log(123)
        this.setState({ is_show: false })
      }
    })
  }
  toChangeBank = () => {
    Cookies.remove("bussiness_type");
    Cookies.remove("ImgUrlFront");
    Cookies.remove("ImgUrlBehind");
    Cookies.remove("User");
    Cookies.remove("bankCard");
    Cookies.remove("bankName");
    Cookies.remove("subBranchBank");
    router.push('/submitQua/BankCard')
  }
  render() {
    const { bank_info } = this.state
    return (
      <div className={styles.bank_page}>
        <WingBlank>

          {
            this.state.is_show ? (
              <div className={styles.bank_info}>
                <div className={styles.bank_box}>
                  <div className={styles.bank_name}>{bank_info.bank_name}</div>
                  <div className={styles.card_type}>储蓄卡</div>
                  <div className={styles.card_num}>{bank_info.bankcard_no}</div>
                </div>
              </div>
            ) : (
                <div className={styles.no_data}>
                  暂无绑定银行卡
              </div>
              )
          }
          <Button style={{ background: '#1AAD19', color: '#fff', position: 'fixed', bottom: '60px', width: '92%' }} onClick={this.toChangeBank}>
            {/* 更改银行卡 */}
            {
              this.state.is_show ? '更改银行卡' : '+添加银行卡'
            }
          </Button>
        </WingBlank>
      </div>
    )
  }
}

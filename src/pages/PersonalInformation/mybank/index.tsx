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
    router.push('/submitQua/EditBankCard')
  }
  bindPhoneNumber = () => {
    router.push({ pathname: '/PersonalInformation/bindPhoneNumber' })
  }

  render() {
    const { bank_info } = this.state
    return (
      <div className={styles.bank_page}>
        <WingBlank>

          {/* {
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
          } */}

          {
            this.state.is_show ? (
              <div className={styles.bank_info}>
                <div className={styles.bank_box_left}>
                  <div className={styles.bank_box_left_img}></div>
                </div>
                <div className={styles.bank_box_middle}>
                  <div className={styles.bank_name}>{bank_info.bank_name}</div>
                  <div className={styles.card_type}>储蓄卡</div>
                  <div className={styles.card_num}>
                    <img className={styles.card_num_icon} src="http://oss.tdianyi.com/front/WzyjXwbRQGEWFWT76FXSDTJ7Nfnpf5sk.png" />
                    <img className={styles.card_num_icon} src="http://oss.tdianyi.com/front/WzyjXwbRQGEWFWT76FXSDTJ7Nfnpf5sk.png" />
                    <img className={styles.card_num_icon} src="http://oss.tdianyi.com/front/WzyjXwbRQGEWFWT76FXSDTJ7Nfnpf5sk.png" />
                    <div className={styles.card_num_end}>{bank_info.bankcard_no.slice(12)}</div>
                  </div>
                </div>
                <div className={styles.bank_box_right}>
                  <div className={styles.bank_box_right_bind} onClick={this.bindPhoneNumber.bind(this)}>去绑定</div>
                </div>
              </div>
            ) : (

                <div className={styles.no_bank_info_box}>
                  <img className={styles.bank_info_img} src="http://oss.tdianyi.com/front/e3pjjfpdme7MjDWPATJiMG84W7NB55AA.png" />
                  <div className={styles.no_bank_info_words}> 暂无绑定银行卡</div>
                </div>
              )
          }

          <Button style={{ background: '#557ae6', color: '#fff', position: 'fixed', bottom: '60px', width: '92%', fontSize: '30px' }} onClick={this.toChangeBank}>
            {/* 更改银行卡 */}
            {
              this.state.is_show ? '更改银行卡' : '添加银行卡'
            }
          </Button>
        </WingBlank>
      </div>
    )
  }
}

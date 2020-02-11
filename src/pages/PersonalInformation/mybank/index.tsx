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
    },
    maskShow: false
  }
  componentDidMount() {
    if (this.props.location.query.submitType) { this.setState({ maskShow: true }) }
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
    router.push({ pathname: '/PersonalInformation/bindPhoneNumber', query: { bankCode: this.state.bank_info.bankcard_no } })
  }

  render() {
    const { bank_info } = this.state
    return (
      <div className={styles.bank_page}>

        {
          this.state.maskShow ?
            <div className={styles.maskContent}>
              <div className={styles.contentBox}>
                <div className={styles.contentTitle}>温馨提示</div>
                <div className={styles.contentInfo}>
                  {this.props.location.query.submitType == 1 ? '绑卡成功' : '绑卡失败'}
                </div>
                <div className={styles.contentBtn} onClick={() => { this.setState({ maskShow: false }) }}>
                  {this.props.location.query.submitType == 1 ? '已阅' : '重新绑定'}
                </div>
              </div>
            </div>
            : null
        }

        <WingBlank>
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
                    {/* 招商银行16位，交通银行17位，其他银行19位 */}
                    {
                      bank_info.bankcard_no.length > 16 ?
                        <img className={styles.card_num_icon} src="http://oss.tdianyi.com/front/WzyjXwbRQGEWFWT76FXSDTJ7Nfnpf5sk.png" /> : null
                    }
                    {
                      bank_info.bankcard_no.length > 16 ? <div className={styles.card_num_end}>{bank_info.bankcard_no.slice(16)}</div> : (
                        <div className={styles.card_num_end}>{bank_info.bankcard_no.slice(12)}</div>
                      )
                    }
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

          <Button className={styles.bindBtn} onClick={this.toChangeBank}>
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

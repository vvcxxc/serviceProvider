import React, { Component } from 'react';
import styles from './index.less';
import { Flex, InputItem, Button, WingBlank, Toast, Modal } from 'antd-mobile'
import router from 'umi/router';
import Request from '@/service/request';
import qs from 'qs';
const alert = Modal.alert;
export default class WithDraw extends Component {
  state = {
    money: '',
    is_show: true,
    is_bind: false,
    all_money: '',
    is_hint: true,
    data: {}
  }

  componentDidMount = async () => {

    await Request({
      url: '/v1/user/getSqStatus',
      method: 'GET'
    }).then(res => {
      // console.log(res);
      if (res.code == 200) {
        if (!res.data.status) {
          router.push('/PersonalInformation')
        }
      }
    })

    Request({
      url: 'userBankInfo',
      method: 'get'
    }).then(res => {
      const { code, data } = res
      switch (code) {
        case 200:
          this.setState({
            is_bind: true,
            data,
            all_money: data.usable_money
          })
          break;

        default:
          break;
      }
    })

  }
  moneyChange = (v: any) => {
    if (v * 1 > Number(this.state.all_money)) {
      this.setState({ is_show: false })
    } else {
      this.setState({ is_show: true })
    }
    if (v * 1 >= 1) {
      this.setState({ is_hint: false })
    } else {
      this.setState({ is_hint: true })
    }
    this.setState({
      money: v
    })
  }

  // 去上传
  goUpload = () => {
  }

  // 申请提现
  withDraw = () => {
    if (this.state.is_bind) {
      if (this.state.is_show) {
        this.destoonFinanceCash()
      } else {
        Toast.info('金额超限')
      }
    } else {
      alert('提现失败', '您还没有验证身份信息，快去完善资料吧', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '去验证', onPress: () => console.log('ok') },
      ])
    }

  }
  allMoney = () => {
    if (Number(this.state.all_money) >= 100) {
      this.setState({ is_hint: false })
    } else {
      this.setState({ is_hint: true })
    }
    this.setState({
      money: this.state.all_money
    })
  }

  goWithDrawRecord = () => {
    router.push({ pathname: '/PersonalInformation/withDrawRecord' })
  }

  destoonFinanceCash = () => {
    const { all_money, money } = this.state
    if (Number(all_money) < Number(money) && money) {
      Toast.fail('金额超过可提现金额', 1)
      return
    }

    if (Number(money) < 100) {
      Toast.fail('单笔提现金额需要大于等于100元', 1)
      return
    }
    if (!money || !Number.isFinite(money - 1)) {
      Toast.fail('请输入正确金额数字', 1)
      return
    }
    Toast.loading('')
    Request({
      url: 'fetchMoney',
      method: 'post',
      data: qs.stringify({
        fetch_money: this.state.money
      })
    }).then(res => {
      Toast.hide()
      const { message, code } = res
      switch (code) {
        case 200:
          // Request({
          //   url: 'userBankInfo',
          //   method: 'get'
          // }).then(res => {
          //   const { code, data } = res
          //   switch (code) {
          //     case 200:
          //       this.setState({
          //         is_bind: true,
          //         data, 
          //         all_money: data.usable_money
          //       })
          //       break;
          //     default:
          //       break;
          //   }
          // })
          Toast.success(message, 1)
          this.setState({ money: '' })
          setTimeout(() => {
            // router.goBack()
            router.push('/PersonalInformation')
          }, 1500)
          break;

        default:
          Toast.fail(message, 1)
          break;
      }

    })
  }

  render() {
    const { data } = this.state
    // 提示字样
    const show_tips = this.state.is_show ? (
      <div className={styles.tips}>
        可提现金额 ¥{this.state.all_money}
      </div>
    ) : (
        <div className={styles.tips_err}>
          金额超过可提现额度
        </div>
      )

    // 是否绑定银行卡
    const bind = this.state.is_bind ? (
      // justify = 'around'
      <Flex className={styles.withdraw_header} >
        <div className={styles.bank_img}>
          <img src="http://oss.tdianyi.com/front/SXmhiHQhNDn65fHR2Q3cmAtXjnB6WQdm.png" />
        </div>

        <div className={styles.bank_name}>
          <div className={styles.name}>{data.bank_name}</div>
          <div className={styles.phoneNumber_end}>
            **** **** **** {data.bankcard_no ? data.bankcard_no.substr(data.bankcard_no.length - 4) : null + '储蓄卡'}
          </div>
        </div>

        <div className={styles.go_right}>
          {/* 909090 */}
          <img src={require('../../../assets/right_arro.png')} alt="" />
        </div>

      </Flex>
    ) : (
        <Flex className={styles.withdraw_header_no_bind}>
          您还没有绑定银行卡<span style={{ color: '#00BFFF', paddingLeft: 40 }} onClick={this.goUpload}>去上传</span>
        </Flex>
      );

    const hint = this.state.is_hint ? (
      <div className={styles.hint}>单笔提现金额需要大于等于100元</div>
    ) : (
        <div className={styles.hint}>每笔提现收2%的手续费</div>
      )

    return (
      <div className={styles.pages}>
        {bind}
        <div className={styles.withdraw_main}>
          <div className={styles.title}>提现金额</div>
          <Flex className={styles.input_box} justify='between'>
            <div className={styles.money_icon}>￥</div>
            <InputItem
              value={this.state.money}
              onChange={this.moneyChange}
            />
            <div className={styles.all} onClick={this.allMoney}>全部</div>
          </Flex>
          <div>
            {show_tips}
          </div>
        </div>
        {/* {hint} */}
        <WingBlank size='lg' style={{ paddingTop: 133 }}>
          <Button type='primary' style={{ marginTop: 100, background: '#547BE7', fontSize: '.3rem' }} onClick={this.withDraw}>申请提现</Button>
        </WingBlank>
        <WingBlank size='lg' style={{ paddingTop: 100 }}>
          <Button type='primary' style={{ background: '#1AAD19' }} onClick={this.goWithDrawRecord}>提现记录</Button>
        </WingBlank>
      </div>
    )
  }
}

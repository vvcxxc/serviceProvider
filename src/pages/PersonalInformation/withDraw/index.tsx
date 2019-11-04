import React, { Component } from 'react';
import styles from './index.less';
import { Flex, InputItem, Button, WingBlank, Toast, Modal  } from 'antd-mobile'
import router from 'umi/router';
const alert = Modal.alert;
export default class WithDraw extends Component  {
    state = {
      money: '',
      is_show: true,
      is_bind: false,
      all_money: '100.00',
      is_hint: true
    }
    moneyChange = (v: any) => {
      // console.log(v)
      if (v*1 > Number(this.state.all_money)){
        this.setState ({is_show: false})
      }else{
        this.setState ({is_show: true})
      }
      if (v*1 >= 100){
        this.setState({is_hint: false})
      }else{
        this.setState({is_hint: true})
      }
      this.setState({
        money: v
      })
    }

    // 去上传
    goUpload = () => {
      console.log(2)
    }

    // 申请提现
    withDraw = () => {
      console.log(22)
      if(this.state.is_bind){
        if(this.state.is_show){
          console.log(333)
        }else{
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
      if (Number(this.state.all_money) >= 100){
        this.setState({is_hint: false})
      }else{
        this.setState({is_hint: true})
      }
      this.setState({
        money: this.state.all_money
      })
    }

    goWithDrawRecord = () => {
      router.push({pathname: '/PersonalInformation/withDrawRecord'})
    }


    render (){
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
        <Flex className={styles.withdraw_header} justify='around'>
          <div className={styles.bank_img}>
            <img src=""/>
          </div>
          <div className={styles.bank_name}>
            中国交通银行
          </div>
          <div>
            ****1234
          </div>
        </Flex>
      ) : (
        <Flex className={styles.withdraw_header_no_bind}>
          您还没有绑定银行卡<span style={{color: '#00BFFF', paddingLeft: 40}} onClick={this.goUpload}>去上传</span>
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
                {hint}
                <WingBlank size='lg' style={{paddingTop: 100}}>
                  <Button type='primary' style={{background: '#1AAD19'}} onClick={this.withDraw}>申请提现</Button>
                </WingBlank>
                <WingBlank size='lg' style={{paddingTop: 100}}>
                  <Button type='primary' style={{background: '#1AAD19'}} onClick={this.goWithDrawRecord}>提现记录</Button>
                </WingBlank>
            </div>
        )
    }
}

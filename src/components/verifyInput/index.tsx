import React, { Component } from 'react';
import styles from './index.less'
import { connect } from 'dva';
import Request from '@/service/request';
import qs from 'qs';
import { Toast } from 'antd-mobile';

interface Props {
  // 需要传递给手机号码进来  ， 
  //然后这里要给一个是否允许进行下一步操作  
  onclick?: () => void,
  phone: number | string,
  
}
export default class VerifyInput extends Component {

  state = {
    time: false,
    count: 60
  }

  //点击验证码
  onClickVerify = (phone: any) => {
    if (!phone) {//排除无手机号码
      Toast.fail('请输入手机号', 1)
      return
    }

    Request({
      url: 'verifyCode',
      method: 'post',
      data: qs.stringify({
        phone
      })
    }).then(res => {
      const { code, message } = res
      if (code !== 200) {//排除发送失败
        Toast.fail(res.message)
        return
      }
      this.Swordsmanship()//发送成功后执行
    })
  }

  //减法
  Swordsmanship = () => {
    if (this.state.count <= 1) {
      this.setState({
        count: 60,
        time: false
      })
      return
    }

    this.setState({ time: true })
    this.setState({ count: this.state.count - 1 }, () => {
      setTimeout(() => {
        this.Swordsmanship()
      }, 1000);
    })
  }

  render() {
    const { time, count } = this.state
    return (
      <div className={styles.verificationCode}>
        <input type="text" placeholder="请输入验证码" />
        <div onClick={this.onClickVerify}>
          {time ? count : '发送验证码'}</div>
      </div>
    )
  }
}
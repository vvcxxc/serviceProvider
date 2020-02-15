/**title: 二维码转让 */
import React, { Component } from 'react'
import Request from '@/service/request';
import { Toast, List, InputItem, WhiteSpace } from 'antd-mobile';
import router from 'umi/router'
import styles from './index.less'
import qs from 'qs';

let timer = null;
export default class Rules extends Component {
  state = {
    checked: false,
    phone: '',
    name: "",
    num: "",
    // 验证码
    code: "",
    is_ok: true,
    wait: ""
  }
  componentDidMount() {
    console.log('3432499')
    Toast.loading('');
    Request({
      url: 'user/info',
      method: 'get',
    }).then(res => {
      Toast.hide();
      if (res.code == 200) {
        this.setState({ phone: res.data.phone })
      } else {
        Toast.fail('请求错误', 1)
      }
    }).catch((err) => {
      Toast.hide();
      Toast.fail('请求失败', 1)
    })
  }

  onclickSelected = () => {
    this.setState({ checked: !this.state.checked })
  }

  routerAdress = () => {
    router.push({ pathname: 'protocol_detail' })
  }

  handleSendCode = () => {
    let phone = this.state.phone;
    let wait = 60;
    if (phone) {
      let _this = this;
      function resend() {
        if (wait == 0) {
          _this.setState({ is_ok: true });
          clearInterval(timer)
        } else {
          wait--;
          _this.setState({ is_ok: false, wait });
          clearInterval();
        }
      }
      resend();
      timer = setInterval(() => {
        resend()
      }, 1000);
      Request({
        url: 'verifyCode',
        method: 'post',
        data: qs.stringify({
          phone
        })
      }).then(res => {
        console.log('13213')
        if (res.code == 200) {
          Toast.success('验证码已发送');
        } else {
          _this.setState({ is_ok: true });
          clearInterval(timer);
          Toast.fail(res.message);
        }
      })
    } else {
      Toast.fail('请输入手机号', 1)
    }
  }
  handleChangeName = (e: any) => {
    this.setState({
      name: e.target.value
    })
  }
  handleChangeNum = (e: any) => {
    this.setState({
      num: e.target.value
    })
  }

  handleChangeCode = (e: any) => {
    this.setState({
      code: e.target.value
    })
  }
  handleSubmit = () => {
    console.log(this.state)
  }

  render() {
    // const { packageList } = this.state
    const { name, num, code, is_ok, wait, checked } = this.state
    return (
      <main className={styles.main}>
        {/* <List>
          <InputItem
            placeholder="请输入承让人"
            data-seed="logId"
          >承让人</InputItem>
          <InputItem
            placeholder="请输入转让数量"
            data-seed="logId"
          >转让数量</InputItem>
          <InputItem
            placeholder="请输入验证码"
            // data-seed="logId"
          >手机验证码</InputItem>
        </List> */}

        <div className={styles.content}>
          <div className={styles.items1}>
            <div className={styles.keyWords}>承让人 </div>
            <input className={styles.input1} type="text" placeholder="请输入承让人" onChange={this.handleChangeName} value={name} />
          </div>
          <div className={styles.items1}>
            <div className={styles.keyWords}>转让数量 </div>
            <input className={styles.input1} type="text" placeholder="请输入转让数量" onChange={this.handleChangeNum} value={num} />
          </div>
          <div className={styles.items2}>
            <div className={styles.keyWords}>验证码 </div>
            <input className={styles.input2} type="text" placeholder="请输入验证码" onChange={this.handleChangeCode} value={code} />
            {
              is_ok ? (
                <div className={styles.sendButton} onClick={this.handleSendCode}>发送验证码</div>
              ) : (
                  <div className={styles.sendButton}> {wait}s后重新获取</div>
                )
            }
          </div>
        </div>
        <div className={styles.rate}>转让费=5000=500x200x5%，转让费请联系代理商进行支付</div>
        <div className={styles.protocol}>
          <img onClick={this.onclickSelected} src={require(checked ? '../../../assets/ql_code/checked.png' : '../../../assets/ql_code/no_checked.png')} alt="" />
          <span onClick={this.routerAdress.bind(this)}>二维码转让协议</span>
        </div>
        <div className={styles.sure} onClick={this.handleSubmit}>确定</div>
      </main>
    )
  }
}
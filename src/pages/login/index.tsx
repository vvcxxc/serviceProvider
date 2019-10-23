/**title: 登陆 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button, Icon } from 'antd-mobile';
import { success, error } from "../../components/Hint";
import router from "umi/router";
import Request from '@/service/request';
import qs from 'qs';
import MyInput from "@/components/Input";
export default class PageIndex extends Component {

  state = {
    weekTime: ['一', '二', '三', '四', '五', '六', '日'],
    day: '',
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    inpText: '',
    inpPassword:''
  }


  

  landingData = (e:any) => {
    //  router.push({ pathname: '/InvitationServiceProvider/search', query: query })
    Request({
      url: 'auth/login',
      method: 'post',
      data: qs.stringify({
        account: this.state.inpText,
        password: this.state.inpPassword
      })
    }).then(res => {
      const { code, access_token, message } = res
      
      if (code !== 200 ) {
        error('登录失败', message)
        return
      }
      success('登录成功')
      setTimeout(() => {
        router.push({ pathname: '/' })
      }, 1000);
     
      // setTimeout(() => {
      //   // localStorage.setItem('token', access_token)
      //   router.push({ pathname: './' })
      // }, 1000);
      // code !== 200 ?
      //   error('登录失败') : success('登录成功')

    })  
  }

  delete = () => {
    console.log('chufa ');
    
    this.setState({
      inpText:''
    })
  }

  //账号输入
  onChangeText = (value: any) => {
    console.log(1);
    this.setState({
      inpText: value
    })
  }
  //账号删除
  onDeleteText = () => {
    console.log(1);
    
    this.setState({
      inpText: ''
    })
  }

  // 密码输入
  onChangePassword = (value: any) => {
    
    console.log(2);
    this.setState({
      inpPassword: value
    })
  }

  // 密码删除
  onDeletePassword = () => {
    console.log(2);
    this.setState({
      inpPassword: ''
    })
  }

  


  render() {
    const { day, showMounthTitle} = this.state
    return (
      <div className={styles.pageIndex}>
        <div className={styles.pageContent}>
          
          <div className={styles.inputBox}>
            <MyInput
              placeholder="请输入账号"
              type="text"
              onDelete={this.onDeleteText}
              onChange={this.onChangeText}
              mb={56}
            />
            <MyInput
              placeholder="请输入密码"
              type="password"
              onDelete={this.onDeletePassword}
              onChange={this.onChangePassword}
              mb={26}
            />
            <div className={styles.forgotten}>忘记密码</div>
          </div>
          <div className={styles.operation}>
            <div className={styles.landing} onClick={this.landingData.bind(this)}>登录</div>
            <div className={styles.registered} onClick={this.delete}>注册</div>
          </div>
       </div>
        <div id="my_success"></div>
      </div>

    )
  }
}


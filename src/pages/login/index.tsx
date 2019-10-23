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
    inpPassword: ''
  }




  landingData = () => {
    // error('登录失败|??', '2333')
    // router.push({ pathname: '/InvitationServiceProvider/search', query: query })
    Request({
      url: 'auth/login',
      method: 'post',
      data: qs.stringify({
        account: this.state.inpText,
        password: this.state.inpPassword
      })
    }).then(res => {
      const { code, access_token, message } = res
      if (code !== 200) {
        error('登录失败', '45345')
        return
      }
      success('登录成功')

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
      inpText: ''
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
    const { day, showMounthTitle } = this.state
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
            <div className={styles.forgotten} >忘记密码</div>
          </div>
          <div className={styles.operation}>
            <div className={styles.landing} onClick={this.landingData.bind(this)}>登录</div>
            <div className={styles.registered} onClick={this.delete}>注册</div>
          </div>
        </div>
        <div id="success"></div>
      </div>


      // <div className={styles.Page}> 
      //   <div className={styles.calendar}>

      //     <div className={styles.title}>
      //       <div className={styles.titleLeft}>活动时间</div>
      //       <div className={styles.titleCenter}>
      //         <div className={styles.showTime}>2019/10/22</div>
      //         <div className={styles.division}>_</div>
      //         <div className={styles.showTime}>2019/10/22</div>
      //       </div>
      //       <div className={styles.titleRight}>
      //         <img src={require('../assets/error.png')} alt=""/>
      //       </div>
      //     </div>
      //     <div className={styles.hint}>
      //       <div>
      //         <span className={styles.dot}></span>
      //         <span>已开设满减活动的日期不可选取</span>
      //       </div>
      //       <div>
      //         <span className={styles.dot}></span>
      //         <span>选取的时间段内不可包含已开设活动的日期</span>
      //       </div>
      //     </div>

      //     <div className={styles.header}>
      //       <div className={styles.headerTitle}>
      //         <div>上个月</div>
      //         <div className={styles.headerCenter}>2019年10月</div>
      //         <div>下个月</div>
      //       </div>
      //       <div className={styles.headerContent}>
      //         {
      //           this.state.mounthTitle.map((item:string,index:number) => {
      //             return <div onClick={this.onClickMounthTitle.bind(this, index)} className={showMounthTitle === index ? styles.showMounthTitle:null}>{item}</div>
      //           })
      //         }
      //       </div>
      //     </div>
      //     <div className={styles.content}>
      //       <div className={styles.weekTime}>
      //         {
      //           this.state.weekTime
      //         }
      //       </div>
      //     </div>
      //     <div className={styles.foot}></div>
      //   </div>
      // </div> 
    )
  }
}


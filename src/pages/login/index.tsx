/**title: 登陆 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error } from "../../components/Hint";
import router from "umi/router";
import Request from '@/service/request';
import qs from 'qs';
export default class PageIndex extends Component {

  state = {
    weekTime: ['一', '二', '三', '四', '五', '六', '日'],
    day: '',
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    inpText: '',
    inpPassword:''
  }


  forgetPassword = () => {
    // router.push({ pathname:'/changePassword/retrieve_password'})
    // router.push({ pathname: '/changePassword/change_password' })
    // router.push({ pathname: '/changePhoneNumber/new_phoneNumber' })
    // let data = new Date(year, month, day).getDay();

    // 根据获取到的年 ， 然后获取到每个月，再根据每天 获取到周几
    // 如果根据年数，算到实际月
    // let data = new Date
    // console.log(data.getDay(),'333');//今天是周几的意思么 0代表是星期天
    // console.log(data.getMonth()+1);//获取到月份
    // console.log(data.getDate(), '333')//获取到今天是多少号
    // console.log(data.toLocaleDateString());
    // let dd = data.setFullYear(20)

    // console.log(data.getMonth() );//获取到月份
    // let mounth = data.getMonth()

    // data.setMonth(mounth + 1);
    // // let meta:any = data.getMonth() + 1
    // data.setDate(0);//获取上个月的最大一天，即上个月的天数
    // // data.setDate(0);
    // console.log(data.getDate());
    // 已知每月多少天  每年多少月， 但是如何对应每天对应星期几
    this.calculateYear()
  }

  // 应该要设置一个最长的时间，也就是最多显示多少年
  // 如何将毫秒转换成2019-3-03

  //计算年
  calculateYear = () => {
    let data = new Date()
    let year = data.getFullYear()
    console.log(data.getMilliseconds(),'豪迈o');

    this.calculateMonth(year,data)
  }

  //计算月
  calculateMonth = (year:number,data:any) => {
    // let data = new Date()
    data.setFullYear(year)
    // console.log('yuefen ', data.getMonth());
    data.setMonth(data.getMonth()+1)//正确的月份
    // data.setMonth(0)
    // data.setDate(0)
    // console.log(data.getDate());

    // this.calculateDay()
    // console.log(data.getMonth());//错的月份
    // new Date('2015-09-27').getDay()
    let meta = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()
    // let meta =
    // console.log(meta,',eta');

    console.log(new Date(meta).getDay(),'444');
    this.calculateDay();
  }

  // 计算天数
  calculateDay = () => {
    let data = new Date()
    data.setMonth(data.getMonth() + 1)//正确的月份
    data.setDate(0);
    this.setState({
      day: data.getDate()
    })
  }

  onClickMounthTitle = (index:number) => {
    console.log(index,'e3');
    this.setState({ showMounthTitle:index})
  }

  handelChange=(e:any)=> {
    this.setState({
      inpText: e.target.value
    })
    // console.log(e.target.value,'333');

  }

  handelChangePassword = (e: any) => {
    this.setState({
      inpPassword: e.target.value
    })
    // console.log(e.target.value,'333');
  }

  landingData = () => {

     // router.push({ pathname: '/InvitationServiceProvider/search', query: query })
    Request({
      url: 'auth/login',
      method: 'post',
      data: qs.stringify({
        account: this.state.inpText,
        password: this.state.inpPassword
      })
    }).then(res => {
      const { code } = res
      this.setState({
        inpText: null,
        inpPassword: ''
      })

      if (code !== 200 ) {
        error('登录失败')
        return
      }
      success('登录成功')
      setTimeout(() => {
        router.push({ pathname: './' })
      }, 800);
      // code !== 200 ?
      //   error('登录失败') : success('登录成功')

    })

  }


  render() {
    const { day, showMounthTitle} = this.state
    return (
      <div className={styles.pageIndex}>
        <div className={styles.pageContent}>
          <div className={styles.inputBox}>
            <div className={styles.inputBox_text}>
              <input type="text" placeholder="请输入账号" onChange={this.handelChange.bind(this)} defaultValue={this.state.inpText}/>
            </div>
            <div className={styles.inputBox_password}>
              <input type="password" placeholder="请输入密码" onChange={this.handelChangePassword.bind(this)} defaultValue={this.state.inpPassword}/>
            </div>
            <div className={styles.forgotten} onClick={this.forgetPassword}>忘记密码</div>
          </div>
          <div className={styles.operation}>
            <div className={styles.landing} onClick={this.landingData}>登录</div>
            <div className={styles.registered} onClick={()=> router.push('/register')}>注册</div>
          </div>
       </div>

        <div id="success"></div>
      </div>
    )
  }
}


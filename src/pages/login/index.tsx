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
    console.log(data.getMilliseconds(), '豪迈o');

    this.calculateMonth(year, data)
  }

  //计算月
  calculateMonth = (year: number, data: any) => {
    // let data = new Date()
    data.setFullYear(year)
    // console.log('yuefen ', data.getMonth());
    data.setMonth(data.getMonth() + 1)//正确的月份
    // data.setMonth(0)
    // data.setDate(0)
    // console.log(data.getDate());

    // this.calculateDay()
    // console.log(data.getMonth());//错的月份
    // new Date('2015-09-27').getDay()
    let meta = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()
    // let meta =
    // console.log(meta,',eta');

    console.log(new Date(meta).getDay(), '444');
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

  onClickMounthTitle = (index: number) => {
    console.log(index, 'e3');
    this.setState({ showMounthTitle: index })
  }

  // handelChange=(e:any)=> {
  //   this.setState({
  //     inpText: e.target.value
  //   })
  //   // console.log(e.target.value,'333');

  // }

  // handelChangePassword = (e: any) => {
  //   this.setState({
  //     inpPassword: e.target.value
  //   })
  //   // console.log(e.target.value,'333');
  // }

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
      const { code, access_token } = res
      this.setState({
        inpText: null,
        inpPassword: ''
      })

      if (code !== 200) {
        error('登录失败')
        return
      }
      success('登录成功')

      setTimeout(() => {
        // localStorage.setItem('token', access_token)
        router.push({ pathname: './' })
      }, 1000);
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
    this.setState({
      inpText: value
    })
  }
  //账号删除
  onDeleteText = () => {
    this.setState({
      inpText: ''
    })
  }

  // 密码输入
  onChangePassword = (value: any) => {
    this.setState({
      inpPassword: value
    })
  }

  // 密码删除
  onDeletePassword = () => {
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
            <div className={styles.forgotten} onClick={this.forgetPassword}>忘记密码</div>
          </div>
          <div className={styles.operation}>
            <div className={styles.landing} onClick={this.landingData}>登录</div>
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


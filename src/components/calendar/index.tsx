import React, { Component } from 'react';
import styles from './index.less'
export default class Calendar extends Component {

  state = {
    weekTime: ['日', '一', '二', '三', '四', '五', '六'],
    
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    year: 0,//显示的年
    mounth: 0,//显示的月
    day: '',//显示的天
    totalDay: [],//总共的天数
    nowWeek:''//一周的某天
  }

  componentDidMount() {
    
    this.count(2019)
  }

  count = (year?: number, mounth?: number, day?: number) => {
    // getDay()
    let date = new Date()
    year && date.setFullYear(year) && this.setState({year:date.getFullYear()})
    !mounth && mounth != 0 ?  date.setMonth(date.getMonth() + 1): date.setMonth(mounth)
    this.setState({ mounth: date.getMonth() })
    
    console.log(date.getFullYear(), date.getMonth(), date.getDate(), '3333');
    date.setDate(0) && this.setState({ day: date.getDay() })
    let total = []
    for (let i = 1; i <= date.getDate(); i++){
      total.push(i)
    }
    this.setState({ totalDay: total })
    
  }

  forgetPassword = () => {
    //最开始应该获取到当年，当月月份 和 天数


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
    // console.log(data.getMilliseconds(), '豪迈o');
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

  //月份切换
  onClickMounthTitle = (index: number) => {
    this.setState({ showMounthTitle: index })
  }

  //前一个月
  monthBefore = () => {
    //为0 就是下一年 ， 年数减一 ， 月数重置12
    const { year, mounth } = this.state
    console.log(mounth,'333');
    if (mounth < 1) {
      this.setState({ year: year - 1 }, () => {
        this.count(this.state.year, 12)
      })
      return
    }
    this.count(year,mounth-1)
  }

  //下一个月
  monthNext = () => {
    const { year, mounth } = this.state
    if (mounth >= 12) {
      this.setState({ year: year + 1 }, () => {
        this.count(year, mounth + 1)
      })
      return
    }
    this.count(year, mounth + 1)
  }

  render() {
    const { showMounthTitle, weekTime, totalDay } = this.state
    return (
      <div className={styles.Page}>
        <div className={styles.calendar}>
          <div className={styles.title}>
            <div className={styles.titleLeft}>活动时间</div>
            <div className={styles.titleCenter}>
              <div className={styles.showTime}>2019/10/22</div>
              <div className={styles.division}>_</div>
              <div className={styles.showTime}>2019/10/22</div>
            </div>
            <div className={styles.titleRight}>
              <img src={require('../../assets/error.png')} alt="" />
            </div>
          </div>
          <div className={styles.hint}>
            <div>
              <span className={styles.dot}></span>
              已开设满减活动的日期不可选取
              </div>
            <div>
              <span className={styles.dot}></span>
              选取的时间段内不可包含已开设活动的日期
              </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <div onClick={this.monthBefore}>上个月</div>
              <div className={styles.headerCenter}>2019年10月</div>
              <div onClick={this.monthNext}>下个月</div>
            </div>
            <div className={styles.headerContent}>
              {
                this.state.mounthTitle.map((item: string, index: number) => {
                  return <div key={index} onClick={this.onClickMounthTitle.bind(this, index)} className={showMounthTitle === index ? styles.showMounthTitle : null}>{item}</div>
                })
              }
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.weekTime}>
              {
                weekTime.map((item: string, index: number) => {
                  return <div key={index}>{item}</div>
                })
              }
            </div>
            <div className={styles.dayBox}>
              <div className={styles.totalDay}>
                {
                  totalDay.map((item: number, index: number) => {
                    return <div key={index}>{item}</div>
                  })
                }
              </div>
              
            </div>
          </div>
          <div className={styles.foot}></div>
        </div>
      </div>

    )
  }
}
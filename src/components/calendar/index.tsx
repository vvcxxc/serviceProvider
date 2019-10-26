import React, { Component } from 'react';
import styles from './index.less'

interface timestampType {
  start: number,
  end:number
}
interface Props {
  timestamp: timestampType,//点击确定的时候会传递时间戳和日期
  confirm:()=>void
}
export default class Calendar extends Component<Props> {

  state = {
    weekTime: ['日', '一', '二', '三', '四', '五', '六'],
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    year: 0,      //显示的年
    mounth:0,     //显示的月
    day: 0,       //显示当月所在日
    totalDay: [], //当月的总天数
    // total
    nowWeek:0,//一周的某天
    dayIndex: 0,//日历天数高亮得索引
    start: 0,
    end: 0,
    distinguish: 1,
    
  }

  componentDidMount() {
    this.firstRender()
  }

  //首次渲染
  firstRender = () => {
    localStorage.removeItem('start')
    localStorage.removeItem('end')
    let date = new Date()
    this.setState({
      mounth: date.getMonth(),
      year: date.getFullYear(),
      day: date.getDate()
    })
    this.count(date.getFullYear(),date.getMonth(),date.getDate())
  }

  forgetPassword = () => {
    // this.calculateYear()
  }

  //月份切换
  onClickMounthTitle = (index: number) => {
    this.setState({ showMounthTitle: index })
  }

  //前一个月
  monthBefore = () => {
    if (this.state.mounth ===0) {
      this.setState({
        mounth: 11,
        year: this.state.year-1
      }, () => {
        this.count(this.state.year, this.state.mounth,this.state.day)
      })
    } else {
      this.setState({
        mounth: this.state.mounth-1
      }, () => {
          this.count(this.state.year, this.state.mounth, this.state.day)
      })
    }
  }

  //下一个月 外国月份 0 是首月, 11年末
  monthNext = () => {
    if (this.state.mounth === 11) {
      this.setState({
        mounth: 0,
        year: this.state.year + 1
      }, () => {
        this.count(this.state.year, this.state.mounth, this.state.day)
      })
    } else {
      this.setState({
        mounth: this.state.mounth + 1
      }, () => {
        this.count(this.state.year, this.state.mounth, this.state.day)
      })

    }
  }

  count = (year: number, mounth: number, day?: number) => {
    let date = new Date()
    date.setFullYear(year)
    this.setState({ year: date.getFullYear() })
    this.setState({ day: day })
    date.setMonth(mounth)
    this.setState({ mounth: date.getMonth() })                                                
    this.countTotalDay(year, mounth)//计算总天数
    this.locationEarly(year, mounth)//定位每月1号在周几
  }

  //计算总天数
  countTotalDay = (year: number, mounth: number)=>{
    let date = new Date()
    date.setMonth(mounth+1)
    date.setDate(0) //上个月最大一天                                                       
    let total = []
    for (let i = 1; i <= date.getDate(); i++) {
      total.push(i)
    }
    this.setState({ totalDay: total })
  }

  //定位每月1号在周几
  locationEarly = (year:number,mounth:number) => {
    let date = new Date()
    date.setFullYear(year)
    date.setMonth(mounth)
    date.setDate(1)
    this.setState({ nowWeek: date.getDay() })
  }

  onClickDate = (index: number, mounth: number, year: number) => {
    let date = new Date()
    date.setFullYear(year)
    date.setMonth(mounth)
    const { start, end, distinguish } = this.state
    console.log('jinru ', start, end);
    // if (start && end && start > end) {
      
      
    //   let big = this.state.start
    //   let small = this.state.end
    //   this.setState({
    //     start: small,
    //     end:big
    //   })
    //   localStorage.setItem('start', JSON.stringify(small))
    //   localStorage.setItem('end', JSON.stringify(big))
    //   return
    // }
    if (distinguish ==1 && index != start && index!=end) { //true赋值给start  false赋值给end
      this.setState({ distinguish: 2 })
      localStorage.setItem('start', JSON.stringify(index))
       this.setState({
        start: localStorage.getItem('start'),
       })
      date.setDate(index)
      localStorage.setItem('start111', JSON.stringify(1))
      
      return
    }
    if (distinguish == 2 && index != start && index != end) {
      localStorage.setItem('start111', JSON.stringify(2))
      if (index < this.state.start) {//开始的值已经有了,然后在第二次点击的时候,要比较谁大
        let bigNumber = this.state.start
        this.setState({
          start:index ,
          end: bigNumber
        
      })
        localStorage.setItem('start', JSON.stringify(index))
        localStorage.setItem('end', JSON.stringify(bigNumber))
        localStorage.setItem('start111', JSON.stringify(3))
      return
      }
      this.setState({ distinguish: 3 })
      localStorage.setItem('end', JSON.stringify(index))
      date.setDate(index)
      this.setState({
        end: localStorage.getItem('end')
      })
      return
    }

    if (distinguish == 3) {
      localStorage.setItem('start111', JSON.stringify(4))
      // console.log(start, end,'开始到结束');
      
      if (start < end) {
        // localStorage.setItem('start', JSON.stringify(index))
        // this.setState({
        //   start: localStorage.getItem('start'),
        // })
        // date.setDate(index)
        // this.setState({ end: null })
        // localStorage.removeItem('end')
        // this.setState({ distinguish: 2 })
      } else {
        // localStorage.setItem('start', JSON.stringify(index))
        // this.setState({
        //   start: localStorage.getItem('start'),
        // })
        // date.setDate(index)
        // this.setState({ end: null })
        // localStorage.removeItem('end')
        // this.setState({ distinguish: 2 })
      }
      
     
     
      return
    }

    // this.setState({ distinguish:1})

    if (index == this.state.start) {
      localStorage.setItem('start111', JSON.stringify(5))
      this.setState({ start: null })
      localStorage.removeItem('start')
      date.setDate(1)
      return
    }
    
    //第二次点击相同天数, 重置所选天数
    if (index == this.state.end) {
      localStorage.setItem('start111', JSON.stringify(6))
      this.setState({ end: null })
      localStorage.removeItem('end')
      date.setDate(1)
      return
    }

    
    


  }

  render() {
    const { start, end, dayIndex, nowWeek,showMounthTitle, weekTime, totalDay, year, mounth, day } = this.state
    return (
      <div className={styles.Page}>
        <div className={styles.calendar}>
          <div className={styles.title}>
            <div className={styles.titleLeft}>活动时间</div>
            <div className={styles.titleCenter}>
              <div className={styles.showTime}>{year}/{mounth !== 0 ? mounth+1 : 1}/{day}</div>
              <div className={styles.division}>_</div>
              <div className={styles.showTime}></div>
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
              <div className={styles.headerCenter}>{year}年{mounth !== 0 ? mounth + 1 : 1}月  </div>
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
              <div className={styles.weekTimeContent}>
                {// 周末时间
                  weekTime.map((item: string, index: number) => {
                    return <div key={index}>{item}</div>
                  })
                }
              </div>
              
            </div>
            <div className={styles.dayBox}>
              <div className={styles.totalDay}>
                {
                  totalDay.map((item: number, index: number) => {
                    return <div
                      className={start == item || end == item ?styles.tallLight:''}
                      onClick={this.onClickDate.bind(this, item, mounth, year)}
                      style={{
                        backgroundColor: start < item && item < end &&start &&end
                          || start > item && item > end && start && end ? '#e9eaf3' :'',
                        marginLeft: index == 0 ? nowWeek * 14 + 'vw' : 0 + 'px',
                      }} key={index}>
                      {
                        start != item && end != item ? item : <div className={styles.test}>
                          {/* {
                            JSON.parse(start) > JSON.parse(end) ? <div key={index}>
                              <div className={styles.tallLeft}></div>
                              <div className={styles.tallRight}></div>
                            </div> : <div key={index} >
                                <div className={styles.tallRight}></div>
                                <div className={styles.tallLeft}></div>
                            </div>
                          } */}
                          {
                            start == item && end && JSON.parse(start) < JSON.parse(end) ? <div className={styles.tallRight}></div>:null
                          }
                          {
                            end == item && start && JSON.parse(start) < JSON.parse(end) ? <div className={styles.tallLeft}></div> : null
                          }
                          {/* <div className={styles.tallLeft}></div>
                          <div className={styles.tallRight}></div> */}
                          <div className={styles.showLayer}>{item}</div>
                        </div>
                      }
                    </div>
                  })
                }
              </div>
              
            </div>
          </div>
          <div className={styles.foot}>
            确定
          </div>
        </div>
      </div>

    )
  }
}
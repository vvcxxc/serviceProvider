/**title: 账单 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, List, DatePickerView } from 'antd-mobile'
import Item from './item'
import Filtrate from '@/components/Filtrate/index';
import Request from '@/service/request'
import dayjs from 'dayjs'
import ScrollBottom from '@/components/ScrollBottom';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
export default class Finance extends Component {
  state = {
    dataList: [
      {
        key: '排序',
        value: ['筛选', '二维码收入', '邀请人分成'],
        select: false
      },
    ],
    invitationShow: false,
    closeNum: 1,
    list: [],
    data: {
      page: 1,
      date: dayjs(now).format('YYYY-MM')
    },
    is_show_loading: true,
    expenditure: 0,
    income: 0
  }
  searchPayload = (a: any) => {
    // 筛选
    let type = 0
    let params = {}
    let { List, date } = a;
    if (List.length) {
      for (let i in List) {
        switch (List[i]) {
          case '二维码收入':
            type = 1
            break
          case '邀请人分成':
            type = 2
            break
          case '提现':
            type = 4
            break
          default:
            type = 0
        }
      }
    }
    if (type) {
      params = { type, date, page: 1 }
    } else {
      params = { date, page: 1 }
    }
    this.setState({ data: params })
    Request({
      method: 'get',
      url: 'getBill',
      params
    }).then(res => {
      if (res.code == 200) {
        this.setState({ list: res.data.boot.data,expenditure: res.data.expenditure, income: res.data.income})
        if(this.state.data.page < res.data.boot.last_page){
          this.setState({is_show_loading: true})
        }else{
          this.setState({is_show_loading: false})
        }
      }
    })
  }
  componentDidMount() {
    Request({
      method: 'get',
      url: 'getBill',
      params: {
        date: dayjs(now).format('YYYY-MM')
      }
    }).then(res => {
      if (res.code == 200) {
        this.setState({ list: res.data.boot.data, expenditure: res.data.expenditure, income: res.data.income })
        console.log(this.state.data.page <= res.data.boot.last_page)
        if(this.state.data.page < res.data.boot.last_page){
          this.setState({is_show_loading: true})
        }else{
          this.setState({is_show_loading: false})
        }
      }
    })
  }
  // 触底
  scrollBottom = () => {
    console.log('触发了')
    if(this.state.is_show_loading){
      let data = this.state.data;
      data.page += 1;
      Request({
        method: 'get',
        url: 'getBill',
        params: data
      }).then(res => {
        if (res.code == 200) {
          // let list = this.state.list;
          this.setState({is_show_loading: false})
          let list = [...this.state.list,...res.data.boot.data]
          this.setState({ list,data,})
          if(this.state.data.page < res.data.boot.last_page){
            this.setState({is_show_loading: true})
          }else{
            this.setState({is_show_loading: false})
          }
        }
      })
    }
  }

  render() {
    const { list, is_show_loading } = this.state
    const listView = (
      <div>
        {
          list.map((item: any, index) => {
            return <Item money={item.money} name={item.describe} date={item.created_at} valid={item.is_valid} key={index} />
          })
        }
      </div>
    )
    return (
      <div className={styles.finance_page}>
        <Filtrate
          dataList={this.state.dataList}
          onSearch={this.searchPayload}
          closeNum={this.state.closeNum}
          isDate={true}
        />
        <Flex className={styles.finance_header}>
          <WingBlank style={{ width: '100%' }}>
            <Flex justify='between' style={{ width: '100%' }}>
              <div>收款￥{String(this.state.income)}</div>
              <div>提现￥{String(this.state.expenditure)}</div>
            </Flex>
          </WingBlank>
        </Flex>

        {
          list.length ? (
            (
              <div>
                {listView}
                <ScrollBottom onChange={this.scrollBottom} isShow={is_show_loading}/>
              </div>
            )

          ) : (
              <div className={styles.no_data}>
                暂无账单数据统计
              </div>
            )
        }
      </div>
    )
  }
}

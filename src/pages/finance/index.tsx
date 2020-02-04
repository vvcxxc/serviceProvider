/**title: 账单 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, NavBar, Icon, DatePickerView } from 'antd-mobile'
import Item from './item'
import Filtrate from '@/components/Filtrate/index';
import Request from '@/service/request'
import dayjs from 'dayjs'
import ScrollBottom from '@/components/ScrollBottom';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
export default class Finance extends Component {
  state = {
    invitationShow: false,
    closeNum: 1,
    list: [],
    page: 1,
    is_show_loading: true,
    expenditure: 0,
    income: 0,
    dataList: [
      {
        key: '全部',
        value: ['全部', '二维码收入', '邀请人分成'],
        select: false
      },
    ],
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
    // Request({
    //   method: 'get',
    //   url: 'getBill',
    //   params
    // }).then(res => {
    //   if (res.code == 200) {
    //     this.setState({ list: res.data.boot.data, expenditure: res.data.expenditure, income: res.data.income })
    //     if (this.state.data.page < res.data.boot.last_page) {
    //       this.setState({ is_show_loading: true })
    //     } else {
    //       this.setState({ is_show_loading: false })
    //     }
    //   }
    // })
  }
  componentDidMount() {
    Request({
      method: 'get',
      url: 'qrcodeLog',
      params: {
        page: 1
      }
    }).then(res => {
      if (res.code == 200 && res.data.data) {
        this.setState({ list: res.data.data })
      }
    })
  }
  // 触底
  scrollBottom = () => {
    // if (this.state.is_show_loading) {
    //   Request({
    //     method: 'get',
    //     url: 'qrcodeLog',
    //     params: { page: this.state.page + 1 }
    //   }).then(res => {
    //     if (res.code == 200 && res.data.data) {
    //       // let list = this.state.list;
    //       this.setState({ is_show_loading: false })
    //       let list = [...this.state.list, ...res.data.data]
    //       this.setState({ list, page: this.state.page + 1 }, () => {
    //         if (this.state.page < res.data.last_page) {
    //           this.setState({ is_show_loading: true })
    //         } else {
    //           this.setState({ is_show_loading: false })
    //         }
    //       })
    //     }
    //   })
    console.log('12312')
    // }
  }

  render() {
    const { list, is_show_loading } = this.state
    const listView = (
      <div>
        {
          list.length && list.map((item: any, index) => {
            return <Item money={item.money} name={item.shop_name} date={item.created_at} qrCode={item.qrcode_id} key={index} />
          })
        }
      </div>
    )
    return (
      <div className={styles.finance_page}>
        <div className={styles.bj}></div>
        <div className={styles.finance_main}>
          <NavBar
            icon={<Icon type="left" size='lg' />}
            onLeftClick={() => console.log('onLeftClick')}
          >账单</NavBar>
          <div className={styles.main_box}>
            <div className={styles.filtrate}>
              <Filtrate
                dataList={this.state.dataList}
                onSearch={this.searchPayload}
                closeNum={this.state.closeNum}
                isDate={true}
              />
            </div>

            {
              list.length ? (
                <div className={styles.list}>
                  <Flex className={styles.total} justify='between' align='center'>
                    <div>
                      收款￥100
              </div>
                    <div>
                      提现￥600d
              </div>
                  </Flex>
                  <div className={styles.list_box}>
                    <div>
                      {listView}
                      <ScrollBottom onChange={this.scrollBottom} isShow={is_show_loading} />
                    </div>
                  </div>
                </div>
              ) : (
                  <div className={styles.no_data}>
                    <div className={styles.text}>暂无图表数据统计</div>
                  </div>
                )
            }

          </div>


        </div>

      </div>
    )
  }
}

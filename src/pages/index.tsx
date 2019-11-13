/**title: 我的码 */
import React, { Component } from 'react';
import Filtrate from '../components/Filtrate/index';
import Invitation from '../components/Invitation/index';
import Request from '@/service/request';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';
// declare global {
//   interface Window { api: string; }
// }
// const host = window.api
let timer = null
export default class QRcode extends Component {
  state = {
    dataList: [
      {
        index: 0,
        key: '排序',
        title: '排序',
        value: ['收益', '邀请人数', '邀请时间'],
        select: false
      },
      {
        index: 1,
        key: '铺设状态',
        title: '铺设状态',
        value: ['全部', '已铺设', '未铺设'],
        select: false
      }
    ],
    invitationShow: false,
    closeNum: 1,
    listPage: 1,
    data: {
      layout: 0,
      list: {
        current_page: 1,
        data: [
        ],
        last_page: 99,
        path: "",
        per_page: 0,
        total: 0,
      },
      money_total: 0
    },
    data_r: {},
    resDataList_r: [],
    resDataList: [],
    is_show: false,
    rem: '1.4rem'
  }

  componentDidMount() {
    Toast.loading('');
    Request({
      url: 'qrCodeList',
      method: 'GET',
      params: {
        page: 1
      }
    }).then(res => {
      Toast.hide();
      let tempList = this.state.resDataList.concat(res.data.list.data);
      this.setState({ data: res.data, resDataList: tempList, listPage: 2 })
    }).catch((err) => {
      console.log(err)
    })
    timer = setInterval(() => {
      this.verifyTheNumber()
    }, 10000)
  }

  // 验证数量是否更新
  verifyTheNumber = () => {
    Request({
      url: 'qrCodeList',
      method: 'GET',
      params: {
        page: 1
      }
    }).then(res => {
      console.log('刷新了')
      let money_total = res.data.money_total;
      if (money_total != this.state.data.money_total) {
        let tempList = res.data.list.data;
        this.setState({
          is_show: true,
          data_r: res.data,
          resDataList_r: tempList,
          listPage_r: 1,
          rem: '2rem'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  refresh = () => {
    this.setState({
      data: this.state.data_r,
      resDataList: this.state.resDataList_r,
      listPage: 1
    }, () => {
      clearInterval(timer)
      this.setState({ is_show: false })
    })
  }

  requestList = () => {
    if (this.state.listPage - 1 > this.state.data.list.last_page) {
      return
    }
    Toast.loading('');
    Request({
      url: 'qrCodeList',
      method: 'GET',
      params: {
        page: this.state.listPage
      }
    }).then(res => {
      Toast.hide();
      let tempList = this.state.resDataList.concat(res.data.list.data);
      this.setState({ data: res.data, resDataList: tempList, listPage: Number(this.state.listPage) + 1 })
    }).catch((err) => {
      console.log(err)
    })
  }


  searchPayload = (query: any) => {
    console.log('lll', query)
    // router.push({ pathname: '/QRcode/search', query: query })
  }

  handleclose = (query: any) => {
    this.setState({ invitationShow: false })
  }
  componentWillUnmount() {
    clearInterval(timer)
  }

  render() {
    return (
      <div className={styles.QRcode} onClick={() => { this.setState({ closeNum: this.state.closeNum + 1 }) }}>
        <div className={styles.headers}>
          <Filtrate
            // dataList={this.state.dataList}
            dataList={[]}
            onSearch={this.searchPayload}
            closeNum={this.state.closeNum}
            searchPath={'/QRcode/search'}
          />

          <div className={styles.QRcode_total}>
            <div className={styles.totalPeople}>共{this.state.data.list.total}个码，{this.state.data.layout}个已铺设</div>
            <div className={styles.totalMoney}>带来总收益￥{this.state.data.money_total}</div>
          </div>

          {
            this.state.is_show ? <div className={styles.refresh}>有新数据来源，请点击刷新</div> : null
          }
        </div>

        <div className={styles.mains} style={{ marginTop: this.state.rem }}>


          {
            this.state.resDataList && this.state.resDataList.length > 0 ? <div className={styles.QRcode_content}>
              {
                this.state.resDataList.map((item: any, index: any) => {
                  return (
                    <div className={styles.QRcode_item} key={index}>
                      <div className={styles.QRcode_item_left}>
                        <div className={styles.QRcode_item_name}>二维码序列号：{item.qrcode_sn}</div>
                        {
                          item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_date}>店铺：{item.shop_name}</div> : null
                        }
                      </div>
                      <div className={styles.QRcode_item_right}>
                        {
                          item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_toDay}>今日收益{item.today_money}</div> : null
                        }

                        {
                          item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_toMonth}>本月收益{item.month_money}</div> : null
                        }
                        {
                          item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_total}>总收益{item.total_money}</div> : null
                        }

                      </div>
                    </div>
                  )
                })
              }
              <div className={styles.loadingMore_button_box} onClick={this.requestList}>
                {
                  this.state.listPage - 1 <= this.state.data.list.last_page ? ' 点击加载更多' : '暂无更多数据'
                }
              </div>
            </div> : null
          }
          {
            this.state.resDataList && this.state.resDataList.length == 0 ? <div className={styles.on_list} >无记录</div> : null
          }

        </div>

      </div>
    )
  }

}

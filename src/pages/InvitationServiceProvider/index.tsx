/**title: 我邀请的服务商 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';
import Request from '@/service/request'
import styles from './index.less';
import router from 'umi/router';
import wx from 'weixin-js-sdk';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class InvitationServiceProvider extends Component {
  state = {
    dataList: [
      {
        key: '排序',
        value: ['收益', '邀请人数', '邀请时间'],
      }
    ],
    invitationShow: false,
    closeNum: 1,
    listPage: 1,
    invitationData: {
      book:
      {
        current_page: 1,
        data: [],
        from: 1,
        last_page: 1,
        per_page: 10,
        prev_page_url: null,
        to: 2,
        total: 2
      },
      incomeTotal: 0
    },
    invitationList: [],
    status: 0,
  }


  componentDidMount() {
    let userAgent = navigator.userAgent;
    let isIos = userAgent.indexOf('iPhone') > -1;
    let url: any;
    if (isIos) {
      url = sessionStorage.getItem('url');
    } else {
      url = location.href;
    }
    Request({
      url: 'wechat/getShareSign',
      method: 'get',
      params: {
        url
      }
    }).then(res => {
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['updateAppMessageShareData']
      });
    }).catch(err => {
    });
    window.scrollTo(0, 0);
    this.requestInfo();
    Toast.loading('');
    Request({
      url: 'facilitatorIncome',
      method: 'GET',
      params: {
        page: 1
      }
    }).then(res => {
      Toast.hide();
      let tempList = res.data.book.data
      this.setState({ invitationData: res.data, invitationList: tempList, listPage: 2 })
    }).catch((err) => {
      console.log(err)
    })
  }

  requestInfo() {
    Request({
      url: 'user/info'
    }).then(res => {
      if (res.code == 200) {
        this.setState({
          status: res.data.status
        })
      }
    })
  }

  searchPayload = (query: any) => {
    // router.push({ pathname: '/InvitationServiceProvider/search', query: query })
  }

  handleclose = (query: any) => {
    this.setState({ invitationShow: false })
  }

  requestList = () => {
    if (this.state.listPage - 1 > this.state.invitationData.book.last_page) {
      return
    }
    Toast.loading('');
    Request({
      url: 'facilitatorIncome',
      method: 'GET',
      params: {
        page: this.state.listPage
      }
    }).then(res => {
      Toast.hide();
      let tempList = this.state.invitationList.concat(res.data.book.data);
      this.setState({ invitationData: res.data, invitationList: tempList, listPage: Number(this.state.listPage) + 1 })
    }).catch((err) => {
    })
  }
  requestList1 = () => {
    Toast.loading('');
    Request({
      url: 'facilitatorIncome',
      method: 'GET',
      params: {
        page: 1
      }
    }).then(res => {
      Toast.hide();
      let tempList = res.data.book.data
      this.setState({ invitationData: res.data, invitationList: tempList, listPage: Number(this.state.listPage) + 1 })
    }).catch((err) => {
    })
  }

  render() {
    return (
      <div className={styles.InvitationServiceProvider} onClick={() => { this.setState({ closeNum: this.state.closeNum + 1 }) }} >
        <Filtrate
          dataList={[]}
          // dataList={this.state.dataList}
          onSearch={this.searchPayload}
          closeNum={this.state.closeNum}
          searchPath={'/InvitationServiceProvider/search'}
        />
        <div className={styles.InvitationServiceProvider_total}>
          <div className={styles.totalPeople}>共{this.state.invitationData.book.total}人</div>
          <div className={styles.totalMoney}>带来收益￥{this.state.invitationData.incomeTotal}</div>
        </div>
        {
          this.state.invitationList.length && this.state.invitationList.length > 0 ? <div className={styles.InvitationServiceProvider_content}>
            {this.state.invitationList.map((item: any, index: any) => {
              return (
                <div className={styles.InvitationServiceProvider_item} key={index}>
                  <div className={styles.InvitationServiceProvider_item_left}>
                    <div className={styles.InvitationServiceProvider_item_name}>{item.name}</div>
                    <div className={styles.InvitationServiceProvider_item_date}>{item.created_at}</div>
                  </div>
                  <div className={styles.InvitationServiceProvider_item_right}>带来收益：{item.invite_total_money}</div>
                </div>
              )
            })
            }

            <div className={styles.loadingMore_button_box} onClick={this.requestList}>
              {
                this.state.listPage - 1 <= this.state.invitationData.book.last_page ? ' 点击加载更多' : '暂无更多数据'
              }
            </div>
          </div> : null
        }
        {
          this.state.invitationList.length == 0 ? <div className={styles.on_list} >无记录</div> : null
        }

        {
          this.state.status == 1 ? (
            <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
          ) : ""
        }

        {
          this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

      </div>
    )
  }

}

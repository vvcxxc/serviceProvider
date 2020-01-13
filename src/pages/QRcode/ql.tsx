/**title: 搜索 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';
import Request from '@/service/request'
import styles from './search.less';
import styles_ql from './ql.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class Search extends Component {
  state = {
    invitationShow: false,
    searchKey: '',
    page: 1,
    resDataList: [],
    have_more:''
  }


  handleWrite = (e: any) => {
    this.setState({ searchKey: e.target.value, page: 1, have_more:'', resDataList: [] }, () => {
      this.handleSearch();
    })
  }


  handleSearch = () => {
    const { page, searchKey} =this.state
    if (searchKey == '') {
      return;
    }
    Toast.loading('');
    Request({
      url: 'qrCodes',
      method: 'GET',
      params: {
        name: searchKey,
        page
      }
    }).then(res => {
      Toast.hide();
      if (res.code !== 200) return
      this.setState({
        have_more: res.data.data.length < 10 ? '暂无更多数据' : '点击加载更多' ,
        resDataList: page > 1 ? [...this.state.resDataList, ...res.data.data] : res.data.data
      })
    })
  }


  handleCancle = (e: any) => {
      router.goBack();
  }

  getMoreData = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.handleSearch()
    })
  }



  render() {
    const { have_more, resDataList} = this.state
    return (
      <div className={styles.QRcode_search} >
        <div className={styles.ServiceProvider} >
          <div className={styles.ServiceProvider_searchBox}>
            <div className={styles.ServiceProvider_searchBox_icon}>
              <Icon type="search" />
            </div>
            <input type="text"
              className={styles.ServiceProvider_input}
              placeholder='输入店铺名称'
              value={this.state.searchKey}
              onChange={this.handleWrite.bind(this)}
            />
          </div>
          <div className={styles.ServiceProvider_searchBox_cancle} onClick={this.handleCancle.bind(this)}>取消</div>
        </div>
        {
         resDataList.map((item: any, index: any) => {
            return <ul className={styles.ql_box} key={index}>
              <li><span></span> 今日收益{item.today_money}</li>
              <li><span>序列号 {item.qrcode_sn}</span> <span>本月收益 {item.month_money}</span> </li>
              <li><span></span> 总收益{item.total_money}</li>
            </ul>
         })}

        <div className={styles.more_data_ql} onClick={this.getMoreData}>
          {
            have_more
          }
        </div>
        {
          this.state.resDataList && this.state.resDataList.length == 0 ? <div className={styles.on_list} >无记录</div> : null
        }

      </div>
    )
  }

}

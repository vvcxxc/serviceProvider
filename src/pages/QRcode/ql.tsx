/**title: 搜索 */
import React, { Component } from 'react';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import Api from '@/api'
import { connect } from 'dva';
import styles from './ql.less';

interface Props {
  homePage: any,
  dispatch:()=>null
}
export default connect((homePage: any) => homePage)(class Search extends Component<Props> {
  state = {
    invitationShow: false,
    searchKey: '',
    page: 1,
    resDataList: [],
    have_more: true
  }


  handleWrite = (e: any) => {
    this.setState({ searchKey: e.target.value, page: 1, have_more: '', resDataList: [] }, () => {
      this.handleSearch();
    })
  }


  handleSearch = () => {
    const { page, searchKey } = this.state
    if (searchKey == '') {
      return;
    }
    Toast.loading('');
    Api.getSearchData({
      name: searchKey,
        page
    })
      .then(res => {
        this.setState({
        resDataList: page > 1 ? [...this.state.resDataList, ...res.data.data] : res.data.data
      })
        Toast.hide()
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
    const { have_more, resDataList } = this.state
    return (
      <div className={styles.qrcode_search} >
        <div className={styles.servicep_rovider} >
          <img onClick={() => router.goBack()} src={require('../../assets/ql_code/left.png')} alt="" />
          <div className={styles.input_box}>
            <img src={require('../../assets/ql_code/search.png')} alt="" />
            <input type="text"
              placeholder='输入店铺名称'
              value={this.state.searchKey}
              onChange={this.handleWrite.bind(this)}
            />
          </div>
          <div className={styles.ServiceProvider_searchBox_cancle} onClick={this.handleCancle.bind(this)}>取消</div>
        </div>
        {
          resDataList.map((value: any, _: number) => {
            return <ul key={_} className={styles.listdata}>
              <li className={styles.listdata_l}>
                <span className={styles.my_margin}>序列号 {value.qrcode_sn ? value.qrcode_sn.split('-')[1] ? value.qrcode_sn.split('-')[1] : value.qrcode_sn : null}
                </span>
                {
                  value.shop_name ? <span className={styles.constrol_place}>{value.shop_name.split('有限公司', 1)}</span> : null
                }

              </li>
              <li className={styles.listdata_r}>
                <div>今日收益 <span>{value.today_money ? value.today_money : 0}</span></div>
                <div>本月收益 <span>{value.month_money ? value.month_money : 0}</span></div>
                <div>总收益 <span>{value.total_money ? value.total_money : 0}</span></div>
              </li>
            </ul>
          })
        }

        <div className={styles.more_data_ql} onClick={this.getMoreData}>
        </div>
        {
          !resDataList.length ? <div className={styles.no_data_box}>
            <div className={styles.no_data} >
              <img src={require('../../assets/no-finance.png')} alt="" />
              <div>无记录</div>
            </div>
          </div> : null
        }

      </div>
    )
  }

})

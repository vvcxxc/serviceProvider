import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon, DatePickerView } from 'antd-mobile';


interface Props {
  dataList: Array<object>,
  onSearch: any,
  closeNum?: any,
  searchPath?: any,
  isDate?: boolean
}

/**
 * 使用须知
 * 传入标题———二级标题dataList,没做超出屏幕左右滑动处理，传个两三个筛选条件就好，不要太过分
 * @onSearch : 按搜索按钮触发，返回选中条件文本
 * @closeNum 触发关闭选中状态，写啥都可以能有变化就行，值变化触发componentWillReceiveProps生命周期
 * @searchPath 可选，跳转路径
 * @isDate {boolean} : 是否使用日期筛选，默认false(还没写)
 * */
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
export default class Filtrate extends Component<Props>{
  state = {
    dataList: [
      // {
      //     key: '排序',
      //     value: ['排序', '收益', '邀请人数', '邀请时间'],
      // },
      // {
      //     key: '铺设状态',
      //     value: ['排序', '收益', '邀请人数', '邀请时间'],
      // }
    ],
    date: now
  }

  componentWillReceiveProps() {
    let tempList = this.state.dataList;
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].select = false;
    }
  }

  componentDidMount() {
    let FiltrateList = this.props.dataList;
    for (let i = 0; i < FiltrateList.length; i++) {
      FiltrateList[i].index = i;
      FiltrateList[i].title = '';
      FiltrateList[i].select = false;
    }
    this.setState({ dataList: FiltrateList })
  }


  submit = () => {
    let tempList = this.state.dataList;
    let returntList = [];
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].title != "") {
        returntList.push(tempList[i].title);
      }
    }
    // console.log(returntList);
    this.props.onSearch && this.props.onSearch(returntList);
  }

  selectKey = (index: any, e: any) => {
    let tempList = this.state.dataList;
    let tempstyle = tempList[index].select;
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].select = false;
      // tempList[i].title = tempList[i].key;
    }
    if (e.target.nodeName == 'LI') {
      // console.log(e.target.innerText)
      tempList[index].title = e.target.innerText;
      this.submit();
    } else {
      tempList[index].select = !tempstyle;
    }
    this.setState({ dataList: tempList });
    e.stopPropagation();
  }

  selectDate = (date:any) => {
    console.log(date)
  }

  datePicker = () => {
    // this.setState
  }

  routerGo = (e: any) => {
    router.push({ pathname: this.props.searchPath })
    e.stopPropagation();
  }
  render() {
    return (
      <div className={styles.filtrate}>
        {
          this.state.dataList && this.state.dataList.length > 0 ? this.state.dataList.map((item: any, index: any) => {
            return (
              <div key={index} className={styles.filtrate_key} onClick={this.selectKey.bind(this, item.index)} >{item.title ? item.title : item.key}
                {item.select ? <Icon className={styles.filtrate_icon} type="up" /> : <Icon className={styles.filtrate_icon} type="down" />}
                <div className={styles.filtrate_value_box} style={{ display: item.select ? 'block' : 'none' }}>
                  <ul className={styles.filtrate_value_ul} onClick={this.selectKey.bind(this, item.index)} >
                    {
                      item.value.map((_li: any, _index: any) => {
                        return (
                          <li key={_index} className={styles.filtrate_value_li}>{_li}</li>
                        )
                      })
                    }
                  </ul>
                </div>
                {
                  this.props.searchPath ? <div className={styles.filtrate_search_btn} onClick={this.routerGo.bind(this)}> 搜索</div> : null
                }
              </div>
            )
          }) : null
        }

        {
          this.props.isDate ? (
            <div className={styles.filtrate_key} onClick={this.datePicker}>
            月份
            <div className={styles.picker}>
              <DatePickerView
                mode='month'
                value={this.state.date}
                onChange={this.selectDate}
              />
            </div>

          </div>
          ) : null
        }

      </div>
    )
  }

}

import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon, DatePickerView, Flex } from 'antd-mobile';
import dayjs from 'dayjs'

interface Props {
  dataList?: Array<object>,
  onSearch: any,
  closeNum?: any,
  searchPath?: any,
  isDate?: boolean,
  background?: String,
  color?: String,
}

/**
 * 使用须知
 * 传入标题———二级标题dataList,没做超出屏幕左右滑动处理，传个两三个筛选条件就好，不要太过分
 * @onSearch : 按搜索按钮触发，返回选中条件对象
 * @closeNum 触发关闭选中状态，写啥都可以能有变化就行，值变化触发componentWillReceiveProps生命周期
 * @searchPath 可选，跳转路径
 * @isDate {boolean} : 是否使用日期筛选，默认false(还没写)
 * */
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
export default class Filtrate extends Component<Props>{
  state = {
    dataList: [],
    date: now,
    show_date: '',
    is_show_date: false
  }

  componentWillReceiveProps() {
    let tempList = this.state.dataList;
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].select = false;
    }
  }

  componentDidMount() {
    let FiltrateList = this.props.dataList;
    if (FiltrateList) {
      for (let i = 0; i < FiltrateList.length; i++) {
        FiltrateList[i].index = i;
        FiltrateList[i].title = '';
        FiltrateList[i].select = false;
      }
      this.setState({ dataList: FiltrateList })
    }

  }


  submit = () => {
    let tempList = this.state.dataList;
    let returntList = [];
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].title != "") {
        returntList.push(tempList[i].title);
      }
    }

    let date = dayjs(this.state.date).format('YYYY-MM')
    this.props.onSearch && this.props.onSearch({
      List: returntList,
      date
    });
  }

  selectKey = (index: any, e: any) => {
    let tempList = this.state.dataList;
    let tempstyle = tempList[index].select;
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].select = false;
      // tempList[i].title = tempList[i].key;
    }
    if (e.target.nodeName == 'LI') {
      tempList[index].title = e.target.innerText;
      this.submit();
    } else {
      tempList[index].select = !tempstyle;
    }
    this.setState({ dataList: tempList, is_show_date: false });
    e.stopPropagation();
  }

  selectDate = (date: any) => {
    this.setState({ date })
  }

  datePicker = () => {
    // 打开时间选择器
    let tempList = this.state.dataList;
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].select = false;
      // tempList[i].title = tempList[i].key;
    }
    this.setState({
      is_show_date: true,
      dataList: tempList
    })
  }
  cancelPicker = () => {
    // 关闭时间选择器
    this.setState({
      is_show_date: false
    })
  }
  confirm = () => {
    // 确认时间
    let tempList = this.state.dataList;
    let returntList = [];
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].title != "") {
        returntList.push(tempList[i].title);
      }
    }
    let date = dayjs(this.state.date).format('YYYY-MM')
    this.setState({ show_date: date })
    this.props.onSearch && this.props.onSearch({ List: returntList, date });
    this.setState({
      is_show_date: false
    })
  }

  routerGo = (e: any) => {
    router.push({ pathname: this.props.searchPath })
    e.stopPropagation();
  }
  render() {
    return (
      <div className={styles.filtrate} style={{ background: this.props.background ? String(this.props.background) : 'unset' }}>
        {
          this.state.dataList && this.state.dataList.length > 0 ? this.state.dataList.map((item: any, index: any) => {
            return (

              <div key={index}
                style={{ color: this.props.color ? String(this.props.color) : '#fff' }}
                className={styles.filtrate_key} onClick={this.selectKey.bind(this, item.index)} >{item.title ? item.title : item.key}
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

              </div>
            )
          }) : null
        }

        {
          this.props.searchPath ? <div className={styles.filtrate_search_btn} onClick={this.routerGo.bind(this)}
            style={{ color: this.props.color ? String(this.props.color) : '#fff' }}
          >
            <div className={styles.search_btn}>
            搜索
            <Icon type='search' size='sm' className={styles.search} />
              </div>

          </div> : null
        }

        {
          this.props.isDate ? (
            <div className={styles.filtrate_key}>
              <span onClick={this.datePicker}
                style={{ color: this.props.color ? String(this.props.color) : '#fff' }}
              >{this.state.show_date ? this.state.show_date : '月份'}</span>
              <Icon className={styles.filtrate_icon} type="down" onClick={this.datePicker} style={{ color: this.props.color ? String(this.props.color) : '#fff' }} />
              {
                this.state.is_show_date ? (
                  <div className={styles.picker}>
                    <Flex className={styles.picker_buttons} justify='between'>
                      <div className={styles.picker_button} onClick={this.cancelPicker}>取消</div>
                      <div className={styles.picker_button} onClick={this.confirm}>确定</div>
                    </Flex>
                    <DatePickerView
                      className={styles.picker_date}
                      mode='month'
                      value={this.state.date}
                      onChange={this.selectDate}
                    />
                  </div>
                ) : null
              }
            </div>
          ) : null
        }

      </div>
    )
  }

}

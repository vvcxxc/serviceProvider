import React, { Component } from 'react';
import router from 'umi/router';
import { Icon, DatePickerView, Flex } from 'antd-mobile';
import styles from './ql.less';
interface Props {
  // list: Array<Object>,
  dataList: Array<Object>,
  searchPath?: any,//路由跳转路径
  onChange:(value:any)=>void
}
export default class Filtrate extends Component<Props>{
  state = {
    dataList: [],
    showIndex: 0,
    title: [
      { show: '排序',props: 'total_money' },
      { show: '已铺设', props: 'layouted'  }
    ]
  }

  componentDidMount() {
    const { dataList } = this.props
    const { title} = this.state
    this.setState({ dataList })
    this.props.onChange({ status: 'layouted' })
  }

  //搜索跳转
  routerGo = (e: any) => {
    router.push({ pathname: '/QRcode/ql'})
    e.stopPropagation();
  }


  //控制列表显示
  controlShow = (index: number) => {
    if (index === this.state.showIndex) {
      this.setState({ showIndex: 0 })
    } else {
      this.setState({ showIndex: index })
    }
  }

  //点击对应索引触发
  getOnclickData = (item: any, index: number, _index: number) => {
    let title = this.state.title
    title[index] = item[_index]
    this.setState({ title })
    this.props.onChange({ orderBy: title[0].props, status: title[1].props })
  }

  render() {
    const { showIndex,title } = this.state
    return (
      <div className={styles.filtrate} style={{marginBottom:'-1px'}}>
        {
          this.state.dataList.map((item: any, index: any) => {
            return (
              <div key={index} className={styles.filtrate_key}
                onClick={this.controlShow.bind(this, item.key)}>
                {
                  title[index].show
               }
                <Icon className={styles.filtrate_icon} type={item.select ?  "up":"down"} />
                {
                  showIndex === item.key ? <div className={styles.filtrate_value_box} >
                    <ul className={styles.filtrate_value_ul} >
                      {
                        item.value.map((_li: any, _index: any) => {
                          return (
                            <li key={_index} className={styles.filtrate_value_li}
                              onClick={this.getOnclickData.bind(this, item.value, index, _index)} >{_li.show}</li>
                          )
                        })
                      }
                    </ul>
                  </div> : null
                }
              </div>
            )
          })
        }
        <div className={styles.filtrate_search_btn} onClick={this.routerGo.bind(this)}><span>搜索</span> <Icon type="search" color="#B5B5B5" size="xs" /></div>
      </div>
    )
  }
}

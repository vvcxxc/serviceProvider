/**title: 二维码 */
import React, { Component } from 'react';
import Request from '@/service/request';
import { Toast } from 'antd-mobile';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录
import Filtrate from '../components/Filtrate/ql';//筛选组件
import Api from '@/api'
import { connect } from 'dva';
import styles from './index.less';
let time: any;
export default connect((homePage: any) => homePage)(class QrCodePage extends Component<any> {
  state = {

    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,
    currentPrice: 1,//码包单价

    //二维码数据
    clickMore: false,//根据定时器刷新判断有无数据更新
    codeList: [],
    codeTitle: {
      money: ''
    },
    codePage: 1,
    codeMore: true,

    //筛选组件
    filter: {
      orderBy: '',
      status: ''
    },
    dataList: [
      {
        key: 1,
        title: '排序',
        value: [
          { show: '今日收益', props: 'today_money' },
          { show: '本月收益', props: 'month_money' },
          { show: '总收益', props: 'total_money' }
        ],
        select: false
      },
      {
        key: 2,
        title: '铺设状态',
        value: [
          { show: '全部', props: 'all' },
          { show: '已铺设', props: 'layouted' },
          { show: '未铺设', props: 'notLayout' }
        ],
        select: false
      }
    ],

    //码包数据
    packageList: [],
    packagePage: 1,
    packageMore: true,

    //铺店队列
    queuePage: 1,
    queueList: [],
    queueTitle: {},
    queueMore: true,

    //铺店记录
    record_list: [],
    recordPage: 1,
    recordMore: true,
  }

  componentWillMount() {
    // Toast.loading('');
  }

  async componentDidMount() {
    await Api.getTotalData().then(({ data, code }) => {//请求当前页汇总数据
      this.dvaProps('homePage/setListData', {
        codeTitle: {
          total: data.qrcode_count,   //共n个码
          haved: data.layouted,       //已铺设
          money: data.money_total,    //总收益 
        }
      })
    })
    await this.managementRequests() //请求列表数据
  }

  componentWillUnmount() {
    // clearTimeout(time)
  }

  // 每10秒检测 有无新数据
  dtectNewData = () => {
    // time = setTimeout(() => {
    //   clearTimeout(time)
    //   this.dtectNewData()
    //   Request({
    //     url: 'qrCodes',
    //     method: "GET",
    //     params: {
    //       page: 1,
    //     }
    //   }).then(res => {
    //     const { data, code } = res
    //     if (code !== 200) return
    //     this.setState({
    //       clickMore: Number(data.money_total) != Number(this.state.codeTitle.money) ? true : false
    //     })
    //   })

    // }, 30000);
  }

  requestList = (ban?: boolean, url?: any, page?: number, options?: number, filters?: Object) => {
    // const {
    //   options_index, codePage, packagePage, recordPage, queuePage,
    //   codeList, packageList, record_list
    // }
    //   = this.state
    // const urls = ['qrCodes', 'Packages', 'Attacheds', 'LayoutLog'][options_index]//请求地址
    // const pages = [codePage, packagePage, 1, recordPage][options_index] //请求页数
    // let filter = {}

    // if (!options_index) {
    //   filter = filters ? filters : { ...this.state.filter }
    // }

    // Request({
    //   url: urls,
    //   method: "GET",
    //   params: {
    //     page: pages,
    //     ...filter
    //   }
    // }).then(res => {
    //   const { data, code } = res
    //   if (code !== 200) return
    //   switch (options_index) {
    //     case 0://二维码
    //       console.log(res,'这个')
    //       if (codePage > 1 && !ban) return

    // this.setState({
    //   codeTitle: {
    //     total: data.qrcode_count,   //共n个码
    //     haved: data.layouted,       //已铺设
    //     money: data.money_total,    //总收益
    //   },
    //   codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
    //   codeMore: data.data.length ? true : false,
    // clickMore: Number(data.money_total) != Number(this.state.codeTitle.money) ? true : false
    // })
    //       break;
    //     case 1://码包
    //       if (packagePage > 1 && !ban) return
    //       this.setState({
    //         currentPrice: data.currentPrice,
    //         packageList: packagePage > 1 ? [...packageList, ...data.data] : data.data,
    //         packageMore: data.data.length ? true : false
    //       })
    //       break;
    //     case 2://铺店队列
    //       const { self, Attacheds } = data
    //       console.log(data,'data')
    //       if (queuePage > 1 && !ban) return
    //       this.setState({
    //         queueTitle: self,
    //         queueList: Attacheds,
    //         queueMore: Attacheds.length ? true : false
    //       })
    //       break;
    //     default://铺店记录
    //       if (recordPage > 1 && !ban) return
    //       this.setState({
    //         record_list: recordPage > 1 ? [...record_list, ...data.data] : data.data,
    //         recordMore: data.data.length ? true : false
    //       })
    //       break;
    //   }
    //   Toast.hide();
    // }).catch((err) => {

    // })
  }

  //筛选组触发
  searchPayload = async (filter: any, showFilter: any) => {// 传递后台格式， 负责让组件默认显示
    console.log(filter, 'filter66666')
    await this.dvaProps('homePage/setListData', { filter, showFilter, codePage: 1 })
    await this.getQrcodeList()
  }

  //点击加载更多
  getWantMore = (_: number) => {
    this.managementRequests()
    // switch (_) {
    //   case 0:
    //     this.setState({ codePage: this.state.codePage + 1 }, () => {
    //       this.getQrcodeList()
    //     })
    //     break;

    //   case 1:
    //     this.setState({ packagePage: this.state.packagePage + 1 })
    //     break;

    //   case 3:
    //     this.setState({ recordPage: this.state.recordPage + 1 })
    //     break;

    //   default:
    //     break;
    // }
    // this.setState({ options_index: _ }, () => { this.requestList(true) })

  }

  // 记录4个页面的索引
  recordIndex = async (Index: number) => {
    await this.dvaProps('homePage/setListData', {
      Index
    })
    await this.managementRequests()
  }
  // 管理当前页请求接口
  managementRequests = () => {
    const { Index } = this.props.homePage
    switch (Index) {
      case 0://二维码页
        this.getQrcodeList()
        break;
      case 1://码包页
        this.getCodePackageData()
        break;
      case 2://铺店队列
        this.getQueue()
        break;
      case 3://铺店记录
        this.getRecord()
        break;
    }
  }

  // 请求二维码页面数据
  getQrcodeList = () => {
    const { orderBy, status } = this.props.homePage.filter// 收益时间  铺设状态
    const { codePage, codeList } = this.props.homePage
    switch (status) {
      case 'layouted':   //已铺设
        Api.getAlreadyLayingData({ orderBy, page: codePage })
          .then(({ data, code }) => {
            this.dvaProps('homePage/setListData',
              {
                codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
                codePage: codePage + 1
              })
          })
        break;
      case 'notLayout': //未铺设
        Api.getNoLayingData({ orderBy, page: codePage })
          .then(({ data, code }) => {
            this.dvaProps('homePage/setListData', {
              codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
              codePage: codePage + 1
            })
          })
        break;
      case 'all':       //全部
        Api.getAllListData({ orderBy, page: codePage })
          .then(({ data, code }) => {
            this.dvaProps('homePage/setListData', {
              codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
              codePage: codePage + 1
            })
          })
        break;
    }

    // this.setState({
    //   codeList: codePage > 1 ? [...codeList, ...res.data.data] : res.data.data,
    //   codeMore: res.data.data.length ? true : false,
    //   clickMore: Number(res.data.money_total) != Number(this.state.codeTitle.money) ? true : false
    // })
    // })
  }

  // 码包页数据
  getCodePackageData = () => {
    Api.getCodePackageData({ page: 1 })
      .then(({ data, code }) => {
        this.dvaProps('homePage/setListData', {
          packageList: data.data
        })
      })
  }

  // 铺店队列页数据
  getQueue = () => {
    Api.getQueueData({ page: 1 })
      .then(({data}) => {
        this.dvaProps('homePage/setListData', {
          queueList: data.Attacheds,
          queueTitle: data.self
        })

      })
  }  

  // 铺店记录
  getRecord = () => {
    Api.getRecordData({ page: 1 })
      .then(({ data }) => {
        this.dvaProps('homePage/setListData', {
          record_list:data.data
        })

      })
  }

  // 只负责传值给dva
  dvaProps = (type: string, payload: Object) => {
    this.props.dispatch({
      type,
      payload
    })
  }

  render() {
    // const {
    //   options_index, options, packageList, currentPrice,
    //   record_list, queueList, queueTitle, codeList, codeTitle,
    //   codeMore, packageMore, queueMore, recordMore,
    //   clickMore
    // } = this.state
    const { options, } = this.state
    const {
      Index,
      codeList,
      codeTitle,
      packageList,
      queueList,
      record_list,
      filter,
      showFilter,
      queueTitle
    } = this.props.homePage

    return (
      <div className={styles.qr_code}>
        <header>
          <div onClick={() => {
            console.log(this.props.homePage, '得到改变的值')
          }}>
            console.log(this.props,'得到改变的值')
          </div>
          <ul>
            {
              options.map((value, options_index: number) => {
                return <li key={value}
                  className={options_index === Index ? styles.hit : styles.no_hit}
                  onClick={this.recordIndex.bind(this, options_index)}>{value} <span></span> </li>
              })
            }
          </ul>
        </header>
        {
          !Index ? <Filtrate
            onChange={this.searchPayload}
            dataList={this.state.dataList}
            showFilter={showFilter}
          /> : null
        }
        {/* have_more={codeMore} */}
        {/* clickMore={clickMore} */}
        {
          [
            <ListCode list={codeList} title={codeTitle} have_more={true} getWantMore={this.getWantMore} onchange={() => { console.log('点击了') }} />,
            <ListPackage
              list={packageList}
              // price={currentPrice}
              // have_more={packageMore}
              getWantMore={this.getWantMore}
            />,
            <ListStoreQueue
              list={queueList}
              title={queueTitle}
              // have_more={queueMore}
              getWantMore={this.getWantMore} />,
            
            <ListStreRecord
              list={record_list}
              // have_more={recordMore}
              getWantMore={this.getWantMore} />
          ][Index]
        }
      </div>
    )
  }
})

/**title: 二维码 */
import React, { Component } from 'react';
import { ListCode } from './qr_code_page/component/code'//二维码列表组件
import { ListPackage } from './qr_code_page/component/package'//列表组码包件
import { ListStoreQueue } from './qr_code_page/component/store_queue'//铺店队列
import { ListStreRecord } from './qr_code_page/component/store_record'//铺店记录
import Filtrate from '../components/Filtrate/ql';//筛选组件
import Api from '@/api'
import { connect } from 'dva';
import styles from './index.less';

interface Props {
  homePage: any,
  dispatch: (data:any) => null
}

let time: any;
export default connect((homePage: any) => homePage)(class QrCodePage extends Component<Props> {
  state = {
    options: ['二维码', '码包', '铺店队列', '铺店记录'],
    options_index: 0,
    haveUpdate:false,
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
  }

  async componentDidMount() {
    //请求当前页汇总数据
    await Api.getTotalData().then(({ data, code }) => {
      this.dvaProps('homePage/setListData', {
        codeTitle: {
          total: data.qrcode_count,   //共n个码
          haved: data.layouted,       //已铺设
          money: data.money_total,    //总收益 
        }
      })
    })

    this.getQrcodeList()//
    this.getCodePackageData()
    this.getQueue()
    this.getRecord()
    this.dtectNewData()
  }

  componentWillUnmount() {//实例即将销毁
    clearTimeout(time)
  }

  // 每10秒检测 有无新数据
  dtectNewData = () => {
    const { Index, codeTitle } = this.props.homePage
    if (!Index) {       //保证是二维码页面
      time = setTimeout(() => {
        clearTimeout(time)
        this.dtectNewData()
        Api.getTotalData().then(({ data, code }) => {
          if (data.money_total != codeTitle.money) {//有更新
            this.setState({ haveUpdate:true })
          } else {
            this.setState({ haveUpdate: false })
          }
        })
      }, 30000);
    }
  }

  //筛选组触发 传递后台格式， 负责让组件默认显示
  searchPayload = async (filter: any, showFilter: any) => {
    await this.dvaProps('homePage/setListData', {
      filter, showFilter, codePage: 1
    })
    await this.getQrcodeList()
  }

  // 加载更多
  getWantMore = async (_: number) => {
    const {
      Index,
      codePage,
      packagePage,
      queuePage,
      recordPage
    } = this.props.homePage
    switch (Index) {
      case 0://二维码页
       await this.dvaProps('homePage/setListData', {
          codePage: codePage + 1
        })
        break;
      case 1://码包页
        await this.dvaProps('homePage/setListData', {
          packagePage: packagePage + 1
        })
        break;
      case 2://铺店队列
        await this.dvaProps('homePage/setListData', {
          queuePage: queuePage + 1
        })
        break;
      case 3://铺店记录
        await this.dvaProps('homePage/setListData', {
          recordPage: recordPage + 1
        })
        break;
    }

    await this.managementRequests()
  }

  // 记录4个页面的索引
  recordIndex = async (Index: number) => {
    await this.dvaProps('homePage/setListData', {
      Index,
    })
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
                codeMore: data.data.length ? true : false
              })
          })
        break;
      case 'notLayout': //未铺设
        Api.getNoLayingData({ orderBy, page: codePage })
          .then(({ data, code }) => {
            this.dvaProps('homePage/setListData', {
              codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
              codeMore: data.data.length ? true : false
            })
          })
        break;
      case 'all':       //全部
        Api.getAllListData({ orderBy, page: codePage })
          .then(({ data, code }) => {
            this.dvaProps('homePage/setListData', {
              codeList: codePage > 1 ? [...codeList, ...data.data] : data.data,
              codeMore: data.data.length ? true : false
            })
          })
        break;
    }
  }

  //有更新数据， 点击重置
  updateQrcodeList = async () => {
    this.setState({ haveUpdate:false})
    await this.dvaProps('homePage/setListData', {
      codePage: 1
    })
    await this.getQrcodeList()
  }

  // 码包页数据
  getCodePackageData = () => {
    const { packagePage, packageList } = this.props.homePage
    Api.getCodePackageData({ page: packagePage })
      .then(({ data, code }) => {
        this.dvaProps('homePage/setListData', {
          currentPrice: data.currentPrice,
          packageList: packagePage > 1 ? [...packageList, ...data.data] : data.data,
          packageMore: data.data.length ? true : false
        })
      })
  }


  // 铺店队列页数据
  getQueue = () => {
    const { queuePage, queueList } = this.props.homePage
    Api.getQueueData({ page: queuePage })
      .then(({ data }) => {
        if (queuePage <= 1) {
          this.dvaProps('homePage/setListData', {
            queueTitle: data.self
          })
        }
        this.dvaProps('homePage/setListData', {
          queueList: queuePage > 1 ? [...queueList,...data.Attacheds]:data.Attacheds ,
          queueMore: data.Attacheds.length ? true : false
        })
      })
  }

  // 铺店记录
  getRecord = () => {
    const { recordPage, record_list } = this.props.homePage
    Api.getRecordData({ page: recordPage })
      .then(({ data }) => {
        this.dvaProps('homePage/setListData', {
          record_list: recordPage>1? [...record_list, ...data.data]:data.data,
          recordMore: data.data.length ? true : false
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
    const { options, haveUpdate} = this.state
    const {
      Index,//页面索引
      codeList,
      codeTitle,
      codeMore,
      packageList,
      packageMore,// 判断是否可获取更多的数据
      currentPrice,
      queueList,
      queueMore,
      record_list,
      showFilter,
      queueTitle,
      recordMore
    } = this.props.homePage

    return (
      <div className={styles.qr_code}>
        <header>
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
        {
          [
            <ListCode
              list={codeList}
              title={codeTitle}
              have_more={codeMore}
              clickMore={haveUpdate}
              getWantMore={this.getWantMore}
              onchange={this.updateQrcodeList} />,
            <ListPackage
              list={packageList}
              price={currentPrice}
              have_more={packageMore}
              getWantMore={this.getWantMore}
            />,
            <ListStoreQueue
              list={queueList}
              title={queueTitle}
              have_more={queueMore}
              getWantMore={this.getWantMore} />,

            <ListStreRecord
              list={record_list}
              have_more={recordMore}
              getWantMore={this.getWantMore} />
          ][Index]
        }
      </div>
    )
  }
})

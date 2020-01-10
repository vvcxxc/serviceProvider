

import React, { Component } from 'react'
import Filtrate from '../../../../components/Filtrate/index';
import styles from './index.less'

export function ListCode(params: any) {
  let options: Array<any> = [1, 2, 3]
  let searchPayload = (query: any) => {
    // router.push({ pathname: '/QRcode/search', query: query })
  }
  let closeNum = 1
  let dataList= [
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
  ]
  return (
    <main>
      <Filtrate
        dataList={dataList}
        onSearch={searchPayload}
        closeNum={closeNum}
        searchPath={'/QRcode/search'}
      />
      <div className={styles.total_revenue}>
        <div>共{'30'}个码，{'10'}个已铺设</div>
        <div>带来总收益，￥{'89898'}</div>
      </div>
      {
        options.map((value, options_index: number) => {
          return <ul key={value} className={styles.listdata}>
            <li><span>二维码序列号</span><span>今日收益 100</span></li>
            <li><span></span><span>本月收益 23133</span></li>
            <li><span>店铺名</span><span>总收益 343434</span></li>
          </ul>
        })
      }
    </main>
  )
}
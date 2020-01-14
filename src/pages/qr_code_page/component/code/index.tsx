

import React, { Component } from 'react'
import Filtrate from '../../../../components/Filtrate/index';
import styles from './index.less'

export function ListCode(params: any) {
  const { list, title } = params
  return (
    <main>
      <div className={styles.total_revenue}>
        <div>共{title.total}个码，{title.haved}个已铺设</div>
        <div>带来总收益，￥{title.money}</div>
      </div>
      {
        list.map((value: any, index: number) => {
          return <ul key={index} className={styles.listdata}>
            <li>
              <span>序列号 {value.qrcode_sn ? value.qrcode_sn.split('-')[1] ? value.qrcode_sn.split('-')[1] : value.qrcode_sn : null}</span>
              <span>今日收益 {value.today_money}</span>
            </li>
            <li><span></span><span>本月收益 {value.month_money}</span></li>
            <li><span>
              店铺名 {value.shop_name}</span><span>总收益 {value.total_money}</span></li>
          </ul>
        })
      }
    </main>
  )
}

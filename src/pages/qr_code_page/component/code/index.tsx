

import React, { Component } from 'react'
import Filtrate from '../../../../components/Filtrate/index';
import styles from './index.less'

export function ListCode(params: any) {
  const { list, title } = params
  return (
    <main className={styles.code_main}>
      <div className={styles.total_revenue}>
        <div>共{title.total}个码，{title.haved}个已铺设</div>
        <div>带来总收益￥{title.money}</div>
      </div>

      <div className={styles.refresh_box}>
        <div className={styles.refresh}>
          <img src={require("../../../../assets/ql_code/bulb.png")} alt="" />
          <div>有新的数据来源，请点击刷新</div>
        </div>
      </div>
      {
        list.map((value: any, index: number) => {
          return <ul className={styles.listdata}>
            <li className={styles.listdata_l}>
              <span>序列号 {value.qrcode_sn ? value.qrcode_sn.split('-')[1] ? value.qrcode_sn.split('-')[1] : value.qrcode_sn : null}
              </span>
              <span>店铺名 {value.shop_name.split('有限公司',1)}</span>
            </li>
            <li className={styles.listdata_r}>
              <div>今日收益 <span>{value.today_money}</span></div>
              <div>本月收益 <span>{value.month_money}</span></div>
              <div>总收益 <span>{value.total_money}</span></div>
            </li>
          </ul>
        })
      }
    </main >
  )
}

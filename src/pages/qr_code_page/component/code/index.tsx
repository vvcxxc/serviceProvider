

import React, { Component } from 'react'
import styles from './index.less'

export function ListCode(params: any) {
  const { list, title, have_more, clickMore } = params

  return (
    <main className={styles.code_main}>
      <div className={styles.total_revenue}>
        <div>共{title.total}个码，{title.haved}个已铺设</div>
        <div>总收益￥{title.money}</div>
      </div>
      {
        clickMore ? <div className={styles.refresh_box}>
          <div className={styles.refresh} onClick={()=>params.onchange()}>
            <img src={require("../../../../assets/ql_code/bulb.png")} alt="" />
            <div>有新的数据来源，请点击刷新</div>
          </div>
        </div>:null
      }
      {
        list.map((value: any, _: number) => {
          return <ul key={_} className={styles.listdata}>
            <li className={styles.listdata_l}>
              <span>序列号 {value.qrcode_sn ? value.qrcode_sn.split('-')[1] ? value.qrcode_sn.split('-')[1] : value.qrcode_sn : null}
              </span>
              {
                value.shop_name ? <span className={styles.constrol_place}>
                  {/* 店铺名 */}
                   {value.shop_name.split('有限公司', 1)}</span> : null
              }
              
            </li>
            <li className={styles.listdata_r}>
              <div>今日收益 <span>{value.today_money ? value.today_money:0}</span></div>
              <div>本月收益 <span>{value.month_money ? value.month_money:0}</span></div>
              <div>总收益 <span>{value.total_money ? value.total_money:0}</span></div>
            </li>
          </ul>
        })
      }
      {
        have_more ? <div className={styles.getmore} onClick={() => params.getWantMore(0)}>加载更多</div> : <div className={styles.getmore} >暂无更多数据</div>
      }
    </main >
  )
}

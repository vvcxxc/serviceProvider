

import React from 'react'
import router from 'umi/router';
import styles from './index.less'
import { routerRedux } from 'dva/router';

export function ListStoreQueue(params:any) {
  const { list, title } = params
  return (
    <main>
      <div className={styles.prompt}>
        <div>
          <span>下一次铺码排名：{title.Ranking}</span>
          <span>预计铺店日期：{title.LayoutDates}</span>
        </div>
        <div>
          <span>下一次预计铺店：{title.NextLayoutNum}</span>
          <span className={styles.improve_button} onClick={()=>router.push({ pathname: 'qr_code_page/rules' })}>提高排名</span>
          <span className={styles.change_record} onClick={() => router.push({ pathname: 'qr_code_page/change_record' })}>贡献值变更记录</span>
        </div>
      </div>
      <ul className={styles.preview_queue}>
        <li className={styles.show_title}>
          <span>顺序</span>
          <span>姓名</span>
          <span>下阶段铺店数</span>
          <span>贡献值</span>
        </li>
        {
          list.map((value:any,index: number) => {
            return <li key={index} className={styles.list_children} style={{ lineHeight: '1rem'}}>
              <span>{index+1}</span>
              <span className={styles.constrol_place}>{value.FacilitatorName}</span>
              <span>+{value.next_layout_num}</span>
              <span>{value.now_score_num}%</span>
            </li>
          })
        }
      </ul>
      
        <ul className={styles.preview_queue}>
        {
          title.row.length ? <li className={styles.omit}>....</li>:null
         }
        {
          title.row.map((item: any, index_: number) => {
            return <li className={styles.list_children} style={{ lineHeight: '1rem' }}>
              <span>{list.length + 1 + index_}</span>
              <span className={styles.constrol_place}>{item.FacilitatorName}</span>
              <span>+{item.next_layout_num}</span>
              <span>{item.now_score_num}%</span>
            </li>
            })
          }
        </ul>
      
      <div className={styles.store_help} onClick={() => router.push({ pathname:'qr_code_page/rules'})}>帮助</div>
    </main>
  )
}
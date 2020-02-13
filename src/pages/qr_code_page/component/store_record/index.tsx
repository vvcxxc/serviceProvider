

import React from 'react'
import styles from './index.less'

export function ListStreRecord(params:any) {//记录
  const { list, have_more } = params
  return (
    <main className={styles.store_record}>
      {
        list.map((value: any, index: number) => {
          return <div key={index} className={styles.record_box}>
            <span>{value.created_at}</span>
            <span>
              {/* {value.package_sn ? value.package_sn.split('-')[1] ? value.package_sn.split('-')[1] : value.package_sn : null} */}
            </span>
            <span>+{value.stage_qrcode_num}</span>
          </div>
        })
      }
      {
        have_more ? <div className={styles.getmore} onClick={() => params.getWantMore(3)}>加载更多</div> : <div className={styles.getmore} >暂无更多数据</div>
      }
    </main>
  )
}


import React from 'react'
import styles from './index.less'

export function ListStreRecord(params:any) {//记录
  const { list } = params
  return (
    <main className={styles.store_record}>
      {
        list.map((value: any, index: number) => {
          return <div key={index} className={styles.record_box}>
            <span>{value.created_at}</span>
            <span>
              {value.package_sn ? value.package_sn.split('-')[1] ? value.package_sn.split('-')[1] : value.package_sn : null}
            </span>
            <span>+{value.stage_qrcode_num}</span>
          </div>
        })
      }
    </main>
  )
}
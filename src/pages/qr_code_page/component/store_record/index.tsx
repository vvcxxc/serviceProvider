

import React from 'react'
import styles from './index.less'

export function ListStreRecord(params:any) {//记录
  let options: Array<any> = []
  return (
    <main>
      <div className={styles.record_box}>
        <span>2019-12-12</span>
        <span>码包1</span>
        <span>+100</span>
      </div>
    </main>
  )
}
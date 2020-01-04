/**title: 码包贡献值变更记录 */
import React, { Component } from 'react'
import styles from './index.less'
export default class Rules extends Component {

  render() {
    return (
      <main>
        <div className={styles.change_record}>
          <span>2019-12-12</span>
          <span>码包1</span>
          <span>每日增长</span>
          <span>+100</span>
        </div>
      </main>
    )
  }
}
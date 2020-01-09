/**title: 码包贡献值变更记录 */
import React, { Component } from 'react'
import Request from '@/service/request';
import { Toast } from 'antd-mobile';
import styles from './index.less'
export default class Rules extends Component {
  state = {
    packagePage: 1,
    packageList: []
  }
  componentWillMount() {
    Toast.loading('')
  }
  componentDidMount() {
    Request({
      url: 'scoreLog',
      method: 'GET'
    }).then(res => {
      if (res.code !== 200) return
      const { data, code } = res
      this.setState({
        packageList: data
      })
      Toast.hide();
    }).catch((err) => {
    })
  }
  render() {
    const { packageList } = this.state
    return (
      <main>
        {
          packageList.map((value: any) => {
            return <div key={value.id} className={styles.change_record}>
              <span>{value.created_at}</span>
              <span>{value.package_sn.split('-')[1]}</span>
              <span>
                {['每日增长', '附加增值', '够店增长'][value.type]}
                </span>
              <span>+{value.score}</span>
            </div>
          })
        }

      </main>
    )
  }
}
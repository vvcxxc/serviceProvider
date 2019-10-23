import React, { Component } from 'react';
import styles from './index.less';
interface Props {
  onClick?:()=>void
}
export default class GreenButton extends Component<Props> {
  landingData = () => {
    // this.props.onClick()
  }
  render() {
    return (
      <div className={styles.landing} onClick={this.landingData}>登录</div>
    )
  }
} 
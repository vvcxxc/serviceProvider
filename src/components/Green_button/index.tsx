import React, { Component } from 'react';
import styles from './index.less';
interface Props {
  data: number | string,
  onClick?: () => void,
  mb?:string|number
}
export default class GreenButton extends Component<Props> {
  landingData = () => {
    this.props.onClick&& this.props.onClick()
  }
  render() {
    const {data,mb} = this.props
    return (
      <div className={styles.custom_landing} onClick={this.landingData} style={{
        marginBottom:mb?mb+'px':'0px'
      }}>{data}</div>
    )
  }
} 
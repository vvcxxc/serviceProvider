import React, { Component } from 'react';
import styles from './index.less'

interface Props {
  showTwo?:boolean|false
}
export default class ArticleInput extends Component<Props> {
  componentDidMount() {
    console.log(this.props,'ror ');
    
  }
  render() {
    return (
      <div className={styles.articleBox}>
        <div className={styles.articleContent}>
          <div className={styles.articleLeft}></div>
          <div className={styles.articleCenter}></div>
          {
            this.props.showTwo ? <div className={styles.articleLeft}></div> : <div className={styles.articleRight}></div>
          }
          
        </div>
        <div className={styles.articleFoot}>
          <div className={styles.footLeft}>验证身份</div>
          <div className={styles.footRight}>验证新手机</div>
        </div>
      </div>
    )
  }
}
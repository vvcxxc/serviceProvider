import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

// 使用方法
// import { success } from "../components/Hint";  1：引入
// <div id="success"></div>   2： 这个id一定要放入当前页面
// success('登录成功',1)   3：调用

interface hintType {
  describe?: string | number, //弹框的描述
  time?: number,//弹框的时间

}

export let success = (text: string | number, timeout?: number) => {

  let data = <div className={styles.hint}>
    <div className={styles.hintBoxs}>
      <img src={require('../../assets/correct.png')} alt="" />
      <div>{text ? text :'登录成功'}</div>
    </div>
  </div>

  ReactDOM.render(
    data, document.getElementById('success'), () => {
      setTimeout(() => {
        let dom: any = document.getElementById('success')
        ReactDOM.unmountComponentAtNode(dom)
      }, timeout ? timeout*1000:1000);
    }
  )
}

export let error = (text: string | number, timeout?: number) => {

  let data = <div className={styles.hint}>
    <div className={styles.errorBox}>
      <div>{text ? text : '登录失败'}</div>
    </div>
  </div>

  ReactDOM.render(
    data, document.getElementById('success'), () => {
      setTimeout(() => {
        let dom: any = document.getElementById('success')
        ReactDOM.unmountComponentAtNode(dom)
      }, timeout ? timeout * 1000 : 1000);
    }
  )
}


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

export let success = (text: string | number, text2?: string | number, timeout?: number) => {

  let data = <div className={styles.hint}>
    <div className={styles.hintBoxs}>
      <img src={require('../../assets/correct.png')} alt="" />
      <div>{text ? text : '登录成功'}</div>
      <div style={{
        paddingTop: 5 + 'px'
      }}>{text2 ? text2 : null}</div>
    </div>
  </div>

  ReactDOM.render(
    data, document.getElementById('my_success'), () => {
      setTimeout(() => {
        let dom: any = document.getElementById('my_success')
        ReactDOM.unmountComponentAtNode(dom)
      }, timeout ? timeout * 900 : 900);
    }
  )
}

export let error = (text: string | number, text2?: string, timeout?: number) => {

  let data = text2 ? <div className={styles.hint}>
    <div className={styles.errorBox}>
      <div className={styles.rowOne}>{text}</div>
      <div className={styles.rowTwo}>{text2}</div>
    </div>
  </div> :
    <div className={styles.hint}>
      <div className={styles.errorBox}>
        <div>{text ? text : '登录失败'}</div>
      </div>
    </div>

  ReactDOM.render(
    data, document.getElementById('my_success')
    , () => {
      setTimeout(() => {
        let dom: any = document.getElementById('my_success')
        ReactDOM.unmountComponentAtNode(dom)
      }, timeout ? timeout * 900 : 900);
    }
  )
}

export let sigh = (text: string | number, timeout?: number) => {

  let data = <div className={styles.hint}>
    <div className={styles.hintBox}>
      <div>
        <img src={require('../../assets/sigh.png')} alt="" />
      </div>
      <div>{text ? text : '两次输入的密码不一致'}</div>
    </div>
  </div>

  ReactDOM.render(
    data, document.getElementById('my_success'), () => {
      setTimeout(() => {
        let dom: any = document.getElementById('my_success')
        ReactDOM.unmountComponentAtNode(dom)
      }, timeout ? timeout * 900 : 900);
    }
  )
}


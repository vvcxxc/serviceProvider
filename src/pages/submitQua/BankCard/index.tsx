import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button } from 'antd-mobile';
import styles from './index.less';

class BankCard extends Component {

    state = {
        // 银行卡正面
        frontFiles: [],
        img_url_front: "",
        isHaveImgFront: false,

        // 银行卡反面
        behindFiles: [],
        img_url_behind: "",
        isHaveImgBehind: false,
    }

    /**
     * 上传银行卡正面
     */
    handleBankCardFrontChange = (file: any) => {
        // let e = file[0].file;
        let reader = new FileReader();
        reader.readAsArrayBuffer(file[0].file);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                // frontFiles: e,  // 给后台的图片
                img_url_front: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImgFront: true
            })
        };
    }

    /**
     * 删除正面照按钮
     */
    handleCloseBankCardFront = () => {
        this.setState({
            isHaveImgFront: false
        })
    }


    /**
     * 上传银行卡反面
     */
    handleBankCardBehindChange = (file: any) => {
        // let e = file[0].file;
        let reader = new FileReader();
        reader.readAsArrayBuffer(file[0].file);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                // behindFiles: e,  // 给后台的图片
                img_url_behind: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImgBehind: true
            })
        };
    }

    /**
     * 删除正面照按钮
     */
    handleCloseBankCardBehind = () => {
        this.setState({
            isHaveImgBehind: false
        })
    }

    render() {
        const { frontFiles,isHaveImgFront,img_url_front,isHaveImgBehind,img_url_behind,behindFiles } = this.state;
        return (
            <div className={styles.bankcard_wrap}>
                <div className={styles.bankcard_title}>
                    <span>请绑定持卡人本人的银行卡</span>
                </div>

                <div className={styles.bankcard_imagepicker}>
                    {/* 银行卡正面 */}
                    {
                        isHaveImgFront ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_front} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardFront} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBankCardFrontChange}
                                    selectable={frontFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>拍摄银行卡正面</div>
                            </div>
                    }
                    {
                        isHaveImgBehind ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_behind} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardBehind} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBankCardBehindChange}
                                    selectable={behindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>拍摄银行卡反面</div>
                            </div>
                    }

                </div>

                {/* 数据项 */}
                <List>
                    <InputItem placeholder='请输入姓名' clear>开户人</InputItem>
                    <InputItem placeholder='请输入身份证号' clear>银行卡号</InputItem>
                </List>


                <div className={styles.next_step_wrap}>
                    <div className={styles.next_step}>
                    <Button className={styles.next_step_btn}>下一步</Button>
                    </div>
                </div>

                <div className={styles.later_fill}>稍后填写</div>
            </div>
        )
    }
}

export default BankCard;
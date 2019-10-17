import React, { Component } from 'react';
import { ImagePicker, Icon } from 'antd-mobile';
import styles from './index.less';

class IDCard extends Component {

    state = {
        // 身份证正面
        frontFiles: [],
        img_url_front: "",
        isHaveImgFront: false,

        // 身份证反面
        behindFiles: [],
        img_url_behind: "",
        isHaveImgBehind: false,
    }

    componentDidMount() {
        window.localStorage.getItem('IdCardFront') ?
            this.setState({
                isHaveImgFront: true,
                img_url_front: window.localStorage.getItem('IdCardFront')
            }) : null
    }

    /**
     * 上传身份证正面
     */
    handleIdCardFrontChange = () => {
        let e = document.getElementById('front_file');
        let reader = new FileReader();
        reader.readAsArrayBuffer(e.files[0]);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                frontFiles: e,  // 给后台的图片
                img_url_front: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImgFront: true
            })
        };
    }

    /**
     * 删除正面照按钮
     */
    handleCloseIdCardFront = () => {
        this.setState({
            isHaveImgFront: false
        })
    }


    /**
     * 上传身份证反面
     */
    handleIdCardBehindChange = () => {
        let e = document.getElementById('behind_file');
        let reader = new FileReader();
        reader.readAsArrayBuffer(e.files[0]);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                behindFiles: e,  // 给后台的图片
                img_url_behind: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImgBehind: true
            })
        };
    }

    /**
     * 删除正面照按钮
     */
    handleCloseIdCardBehind = () => {
        this.setState({
            isHaveImgBehind: false
        })
    }


    render() {
        const { isHaveImgFront, img_url_front, isHaveImgBehind, img_url_behind } = this.state;
        return (
            <div className={styles.idcard_wrap}>
                <div className={styles.idcard_title}>
                    <span>请拍照上传你的二代身份证</span>
                </div>

                <div className={styles.idcard_imagepicker}>
                    {
                        isHaveImgFront ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_front} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFront} />
                            </div>
                            :
                            <div className={styles.image_picker} onChange={this.handleIdCardFrontChange}>
                                <input type="file" id="front_file" className={styles.file_upload} capture="camera" accept="image/*"/>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>身份证正面照</div>
                            </div>
                    }
                    {
                        isHaveImgBehind ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_behind} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardBehind} />
                            </div>
                            :
                            <div className={styles.image_picker} onChange={this.handleIdCardBehindChange}>
                                <input type="file" id="behind_file" className={styles.file_upload} capture='camcorder'/>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>身份证反面照</div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default IDCard;

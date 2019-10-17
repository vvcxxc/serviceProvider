import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button } from 'antd-mobile';
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


        // 身份证正反面
        frontBehindFiles: [],
        img_url_front_behind: "",
        isHaveImgFrontBehind: false,

        isShowModal: false
    }

    componentDidMount() {
        // window.localStorage.getItem('IdCardFront') ?
        //     this.setState({
        //         isHaveImgFront: true,
        //         img_url_front: window.localStorage.getItem('IdCardFront')
        //     }) : null
    }

    /**
     * 上传身份证正面
     */
    handleIdCardFrontChange = (file: any) => {
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
    handleCloseIdCardFront = () => {
        this.setState({
            isHaveImgFront: false
        })
    }


    /**
     * 上传身份证反面
     */
    handleIdCardBehindChange = (file: any) => {
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
     * 删除反面照按钮
     */
    handleCloseIdCardBehind = () => {
        this.setState({
            isHaveImgBehind: false
        })
    }


    /**
     * 展示身份证示例
     */
    showModal = () => {
        this.setState({
            isShowModal: true
        })
    }


    /**
     * 上传身份证正反面
     */
    handleIdCardFrontBehindChange = (file: any) => {
        // let e = file[0].file;
        let reader = new FileReader();
        reader.readAsArrayBuffer(file[0].file);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                // frontBehindFiles: e,  // 给后台的图片
                img_url_front_behind: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImgFrontBehind: true,
                isShowModal: false
            })
        };
    }

    /**
     * 删除正反面照按钮
     */
    handleCloseIdCardFrontBehind = () => {
        this.setState({
            isHaveImgFrontBehind: false
        })
    }


    render() {
        const { isHaveImgFront, img_url_front, isHaveImgBehind, img_url_behind, frontFiles, behindFiles, frontBehindFiles, isHaveImgFrontBehind, isShowModal, img_url_front_behind } = this.state;
        return (
            <div className={styles.idcard_wrap}>
                <div className={styles.idcard_title}>
                    <span>请拍照上传你的二代身份证</span>
                </div>

                <div className={styles.idcard_imagepicker}>
                    {/* 身份证正面照 */}
                    {
                        isHaveImgFront ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_front} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFront} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    files={frontFiles}
                                    onChange={this.handleIdCardFrontChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={frontFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>身份证正面照</div>
                            </div>
                    }
                    {/* 身份证反面照 */}
                    {
                        isHaveImgBehind ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_behind} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardBehind} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    files={behindFiles}
                                    onChange={this.handleIdCardBehindChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={behindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>身份证反面照</div>
                            </div>
                    }
                    {/* 身份证正反面 */}
                    {
                        isHaveImgFrontBehind ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url_front_behind} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFrontBehind} />
                            </div>
                            :
                            (<div className={styles.image_picker} onClick={this.showModal}>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>手持身份证照</div>
                            </div>)
                    }
                </div>


                {/* IDModal */}
                {
                    isShowModal ? (<div className={styles.modal_wrap}>
                        <div className={styles.modal_container}>
                            <div className={styles.modal_exeample}>
                                <div className={styles.modal_title}>证件上传示例</div>
                                <div className={styles.modal_pic}></div>
                                <div className={styles.modal_desc}>四角完整，亮度均匀，照片清晰</div>
                            </div>
                            <div className={styles.modal_btn_tool}>
                                <div className={styles.modal_btn}>知道了</div>
                                <ImagePicker
                                    onChange={this.handleIdCardFrontBehindChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={frontBehindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_front_behind}
                                />
                            </div>
                        </div>
                    </div>) : null
                }



                {/* 数据项 */}
                <List>
                    {/* <InputItem placeholder='请输入姓名' value={this.props.contact_name} onChange={this.handleName} clear>姓名</InputItem> */}
                    <InputItem placeholder='请输入姓名' clear>姓名</InputItem>
                    <InputItem placeholder='请输入身份证号' clear>身份证号</InputItem>
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

export default IDCard;

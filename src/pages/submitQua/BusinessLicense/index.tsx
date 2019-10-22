import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button } from 'antd-mobile';
import styles from './index.less';

class BusinessLicense extends Component {

    state = {
        businessLicenseFiles: [],
        img_url: "",
        isHaveImg: false
    }

    /**
     * 上传营业执照
     */
    handleBusinessLicenseChange = (file: any) => {
        // let e = file[0].file;
        let reader = new FileReader();
        reader.readAsArrayBuffer(file[0].file);
        let _this = this;
        reader.onloadend = function () {
            let bf = this.result;
            let blob = new Blob([bf], { type: "text/plain" });
            _this.setState({
                // businessLicenseFiles: e,  // 给后台的图片
                img_url: URL.createObjectURL(blob), // 自己本地预览的
                isHaveImg: true
            })
        };
    }

    /**
     * 删除营业执照
     */
    handleCloseBusinessLicense = () => {
        this.setState({
            isHaveImg: false
        })
    }

    render() {
        const { businessLicenseFiles, isHaveImg, img_url } = this.state;
        return (
            <div className={styles.businesslicense_wrap}>
                <div className={styles.businesslicense_title}>
                    <span>请上传您的营业执照</span>
                </div>

                <div className={styles.businesslicense_imagepicker}>
                    {/* 营业执照 */}
                    {
                        isHaveImg ?
                            <div className={styles.preview_wrap}>
                                <img src={img_url} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBusinessLicense} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBusinessLicenseChange}
                                    selectable={businessLicenseFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571227609035&di=c295506efa7eddae0ec2a1554cec2d4c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F22%2F84%2F5922466411644_610.jpg" alt="" />
                                <div className={styles.image_desc}>上传文字清晰照片，露出边框和国徽</div>
                            </div>
                    }
                </div>


                {/* 数据项 */}
                <List>
                    <InputItem placeholder='请输入注册号' clear>注册号</InputItem>
                    <InputItem placeholder='请输入执照名称' clear>执照名称</InputItem>
                    <InputItem placeholder='请输入法人姓名' clear>法人姓名</InputItem>
                    <InputItem placeholder='请输入有效期' clear>有效期</InputItem>
                </List>

                <div className={styles.businesslicense_operation}>
                    <div className={styles.next_step_wrap}>
                        <div className={styles.next_step}>
                            <Button className={styles.next_step_btn}>完成</Button>
                        </div>
                    </div>

                    <div className={styles.later_fill}>稍后填写</div>
                </div>

            </div>
        )
    }
}

export default BusinessLicense;
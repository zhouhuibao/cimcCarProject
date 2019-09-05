import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

function getBase64(file) {
  console.log(file);
  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // });
}

class UploadImg extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    // fileList: [
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-2',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-3',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-4',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-5',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    // ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log(file);

    this.setState({
      previewImage: file.thumbUrl || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const payload = {
      // action:"http://vue.wclimb.site/vi/uploadAvator",
      action: 'https://upload-z2.qiniup.com',
      listType: 'picture-card',
      // data:{
      //     token:'wTHrpmk-brD6l5rJzKci9xLK_SMhjFePhRogGm9a:6YwpBURuqUhX3eYUuIbPeYbbLNc=:eyJmc2l6ZUxpbWl0IjoyMDk3MTUyLCJtaW1lTGltaXQiOiJpbWFnZVwvanBlZztpbWFnZVwvcG5nIiwic2NvcGUiOiJlc3BpZXItaW1hZ2U6MjFcLzIwMTlcLzA5XC8wNFwvNmQzYjU1NDFhMTQ4ODg2MDY4YWVhYjI3YjQ1MDJhZjVtNTdnSGg2cjFMSE5vdVZOQlcyQ2daNXdtazNodHYzdiIsImRlYWRsaW5lIjoxNTY3NTY4MDI4fQ==',
      //     key: "21/2019/09/04/6d3b5541a148886068aeab27b4502af5m57gHh6r1LHNouVNBW2CgZ5wmk3htv3v",
      //     fname:'111.jpg'
      // },
      data: file => {
        console.log(file);
        return {
          token:
            'wTHrpmk-brD6l5rJzKci9xLK_SMhjFePhRogGm9a:6YwpBURuqUhX3eYUuIbPeYbbLNc=:eyJmc2l6ZUxpbWl0IjoyMDk3MTUyLCJtaW1lTGltaXQiOiJpbWFnZVwvanBlZztpbWFnZVwvcG5nIiwic2NvcGUiOiJlc3BpZXItaW1hZ2U6MjFcLzIwMTlcLzA5XC8wNFwvNmQzYjU1NDFhMTQ4ODg2MDY4YWVhYjI3YjQ1MDJhZjVtNTdnSGg2cjFMSE5vdVZOQlcyQ2daNXdtazNodHYzdiIsImRlYWRsaW5lIjoxNTY3NTY4MDI4fQ==',
          key: '21/2019/09/04/6d3b5541a148886068aeab27b4502af5m57gHh6r1LHNouVNBW2CgZ5wmk3htv3v',
          fname: file.name,
        };
      },
      // headers:{
      //     "Content-Type":"application/json;charset=UTF-8",
      //     "Accept": "application/json, text/plain, */*",
      //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjEyMzExMSIsImlhdCI6MTU2NzU2MjYyNiwiZXhwIjoxNTcwMTU0NjI2fQ.uLmPwcFle1TFNaolRabjjvslbSxBgI8pW7nYYlCVVu8"
      // }
    };
    return (
      <div className="clearfix">
        <Upload
          {...payload}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <p>
          1. 最多可上传9个图片，文件格式为bmp、png、jpeg、jpg或gif，大小不超过2M（建议尺寸：500px *
          500px）
        </p>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadImg;

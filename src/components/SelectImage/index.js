import React, { Component, Fragment } from 'react';
import {
  Modal,
  Pagination,
  Upload,
  Button,
  Icon,
  Row,
  Col,
  Input,
  message,
  Empty,
  Spin,
} from 'antd';
import { connect } from 'dva';
import { dataType } from '@/utils/utils';
import styles from './styles.less';
import imgJson from './imgjson.json';

const { Search } = Input;

/**
 * 参数说明
 * @param {Boolean}  multiple   是否多选
 * @param {Function} onChange   选择完图片的回调
 * @param {Function} onCancel   关闭
 * @param {Function} onOk   确定
 * @param {Boolean} isRequest   是否请求数据
 */

@connect(({ common, loading }) => ({
  common,
  listLoading: loading.effects['common/queryPicture'],
}))
class SelectImage extends Component {
  state = {
    imgArr: imgJson,
    selectedImages: this.props.multiple ? [] : this.props.defaultValue,
    uploading: false,
    visible: false,
    radioImageUrl: this.props.multiple ? '' : this.props.defaultValue,
  };

  componentDidMount() {
    console.log(this);
    const { imgArr } = this.state;
    imgArr.forEach(item => {
      item.id = item.image_id;
    });
    this.setState({
      imgArr,
    });
    this.getPicList();
  }

  getPicList = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/queryPicture',
      payload: obj,
      callBack: res => {
        console.log(res);

        if (res.success) {
          this.setState({
            imgArr: res.data || [],
          });
        }
      },
    });
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过2M');
    }
    return isJpgOrPng && isLt2M;
  };

  selectImg = props => {
    const { multiple, onChange } = this.props;
    const { imgArr } = this.state;
    let obj = {};
    // 如果是多选
    if (multiple) {
      imgArr.forEach((item, index) => {
        if (item.id === props.id) {
          obj = { ...item, index };
          if (dataType(item.checked) === 'Boolean') {
            item.checked = !item.checked;
          } else {
            item.checked = true;
          }
        }
      });
      if (this.checkedImgArr(imgArr)) {
        message.warning('最多只能选择9张图片');
        imgArr[obj.index].checked = dataType(obj.checked) === 'Boolean' ? obj.index.checked : false;
        this.setState({
          imgArr,
        });
      } else {
        this.setState(
          {
            imgArr,
          },
          () => {
            const selectedImgArr = [];
            imgArr.forEach(item => {
              if (item.checked) {
                selectedImgArr.push(item);
              }
            });
            if (dataType(onChange) === 'Function') {
              onChange(selectedImgArr);
            }
            this.setState({
              selectedImages: selectedImgArr,
            });
          },
        );
      }
    } else {
      let selectObj = {};
      imgArr.forEach(item => {
        if (item.id === props.id) {
          item.checked = true;
          selectObj = {
            ...item,
          };
          if (dataType(onChange) === 'Function') {
            onChange([item]);
          }
        } else {
          item.checked = false;
        }
      });
      console.log(selectObj);
      this.setState({
        imgArr,
        selectedImages: [selectObj],
      });
    }
  };

  checkedImgArr = imgArr => {
    const arr = [];
    imgArr.forEach(item => {
      if (item.checked) {
        arr.push(item);
      }
    });

    if (arr.length > 9) {
      return true;
    }
    return false;
  };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  afterClose = () => {
    // const { imgArr } = this.state;
    // imgArr.forEach(item => {
    //   item.checked = false;
    // });
    // this.setState({
    //   imgArr,
    //   selectedImages: [],
    // });
  };

  closeImage = () => {
    const { multiple } = this.props;
    const { selectedImages } = this.state;
    this.setState({
      visible: false,
      radioImageUrl: multiple ? '' : selectedImages[0].url,
    });
  };

  render() {
    const { onOk, listLoading, multiple } = this.props;
    const { imgArr, selectedImages, uploading, radioImageUrl, visible } = this.state;
    const uploadButton = (
      <Icon type="camera" style={{ fontSize: 40, lineHeight: '100px', color: '#ccc' }} />
    );
    const THIS = this;
    const props = {
      name: 'file',
      action: 'gcgj/web-file/pictureUpload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status === 'uploading') {
          THIS.setState({
            uploading: true,
          });
        }

        if (info.file.status === 'done') {
          if (info.file.response.success) {
            message.success('图片上传成功');
            THIS.getPicList();
          } else {
            message.error(info.file.response.message);
          }
          THIS.setState({
            uploading: false,
          });
        }
        if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
          THIS.setState({
            uploading: false,
          });
        }
      },
      beforeUpload: this.beforeUpload,
    };
    return (
      <Fragment>
        {multiple ? (
          <>
            <div className={`${styles.checkbox} clearfix`}>
              {selectedImages.map(item => {
                return (
                  <div className={styles.imgList}>
                    <img src={item.url} alt="图片" />
                  </div>
                );
              })}

              <div className={styles.addImg} onClick={() => this.setState({ visible: true })}>
                <Icon type="plus" />
              </div>
            </div>
            <div style={{ color: '#ccc', fontSize: '12px', lineHeight: '30px' }}>
              最多可上传9个图片，文件格式为png、jpeg，大小不超过2M
            </div>
          </>
        ) : (
          <>
            <div className={styles.radio} onClick={() => this.setState({ visible: true })}>
              {radioImageUrl ? <img src={radioImageUrl} alt="avatar" /> : uploadButton}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px', lineHeight: '30px' }}>
              只能上传jpg/png文件，且不超过2M
            </div>
          </>
        )}
        <Modal
          width="60%"
          title="选择图片"
          visible={visible}
          afterClose={() => {
            this.afterClose();
          }}
          onOk={() => {
            onOk(selectedImages);
            this.closeImage();
          }}
          onCancel={() => this.setState({ visible: false })}
        >
          <div className={styles.SelectImage}>
            <div className="clearfix">
              <div className="pull-left">
                <Upload {...props}>
                  <Button type="primary" icon="upload" loading={uploading}>
                    上传图片
                  </Button>
                </Upload>
              </div>
              <div className="pull-right">
                <Search placeholder="搜索图片" onSearch={value => console.log(value)} enterButton />
              </div>
            </div>
            <div className={styles.line} />

            <Spin spinning={false}>
              {/* <Spin spinning={listLoading}> */}
              <Row gutter={48} className={styles.imgWrap}>
                {imgArr.length > 0 ? (
                  imgArr.map(item => {
                    return (
                      <Col sm={12} lg={6} key={item.id}>
                        <div
                          className={styles.imgItem}
                          onClick={() => {
                            this.selectImg(item);
                          }}
                        >
                          <img src={item.url} alt="图片" />
                          {item.checked ? (
                            <div className={styles.checked}>
                              <Icon type="check" className={styles.checkedIcon} />
                            </div>
                          ) : null}
                          <div className={styles.imgName}>{`${item.fileName}${item.suffix}`}</div>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Row>
            </Spin>

            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              showTotal={this.showTotal}
              total={0}
            />
          </div>
        </Modal>
      </Fragment>
    );
  }
}
export default SelectImage;

import React, { Component } from 'react';
import { Button, Input, Table, Popconfirm, Switch, Badge } from 'antd';
import { connect } from 'dva';
import AddBrand from './AddBrand';
import styles from '../../goodsStyles.less';
import { dataType } from '@/utils/utils';

const { Search } = Input;
@connect(({ brandModel, loading }) => ({
  brandModel,
  listLoading: loading.effects['brandModel/queryGoodsBrand'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class GoodsBrand extends Component {
  constructor(props) {
    super(props);
    this.brandRef = React.createRef();
  }

  state = {
    isAdd: true,
    status: true,
    initValue: {},
    columns: [
      {
        title: '品牌图片',
        dataIndex: 'brandPicture',
        width: 170,
        key: 'brandPicture',
        render: text => {
          return <img style={{ width: 60 }} src={text} alt="品牌logo" />;
        },
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: text => {
          const str = text === 0 ? '有效' : '失效';
          return <Badge status={text === 0 ? 'success' : 'default'} text={str} />;
        },
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 150,
        render: (text, record) => {
          return (
            <div>
              {record.status === 0 ? (
                <>
                  <a
                    onClick={() => {
                      this.editBrand(record);
                    }}
                  >
                    编辑{' '}
                  </a>
                  &ensp;
                  <Popconfirm
                    title="确定删除该品牌?"
                    onConfirm={e => {
                      // this.deleteTableDate(e, record)
                      const obj = {
                        ...record,
                        status: 1,
                      };
                      this.submitEdit(obj);
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>
                </>
              ) : (
                <a
                  onClick={() => {
                    this.back(record);
                  }}
                >
                  恢复{' '}
                </a>
              )}
            </div>
          );
        },
      },
    ],
    dataSource: [
      // {
      //   id:'1',
      //   brandName:'品牌',
      //   brandPicture:'http://mmbiz.qpic.cn/mmbiz_jpg/Hw4SsicubkrdtmicAt4yB9TY93OBlRubpP1RIgomWheIzEc0v34Ca5icoNBfXg7cgsmerj8rMz6qRnCt8GAW4RD5g/0?wx_fmt=jpeg'
      // }
    ],
    visible: false,
  };

  componentDidMount() {
    this.getList();
  }

  // 获取品牌列表
  getList = obj => {
    let data = obj;
    if (dataType(obj) === 'Undefined') {
      const { status } = this.state;
      data = {
        status: status ? 0 : 1,
        brandName: '',
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/queryGoodsBrand',
      payload: data,
    }).then(() => {
      const {
        brandModel: { GoodsBrandList },
      } = this.props;
      console.log(GoodsBrandList);
      this.setState({
        dataSource: GoodsBrandList || [],
      });
    });
  };

  // 恢复
  back = record => {
    const obj = {
      ...record,
      status: 0,
    };
    this.submitEdit(obj);
  };

  editBrand = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/editBrand',
      payload: record,
    });
    this.setState({
      initValue: record,
      visible: true,
      isAdd: false,
    });
  };

  deleteTableDate = (e, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/deleteGoodsBrand',
      payload: {
        id: record.id,
      },
    }).then(() => {
      const {
        brandModel: { delStatus },
      } = this.props;
      console.log(delStatus);
      if (delStatus) {
        this.getList();
      }
    });
  };

  addGoodsBrand = () => {
    this.setState({
      visible: true,
      isAdd: true,
    });
  };

  submitAdd = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/addGoodsBrand',
      payload: values,
    }).then(() => {
      const {
        brandModel: { addStatus },
      } = this.props;
      console.log(addStatus);
      if (addStatus) {
        this.getList();
        this.setState({
          visible: false,
        });
      }
    });
  };

  submitEdit = (values, type) => {
    const { initValue } = this.state;
    if (type === 'edit') {
      values.id = initValue.id.toString();
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/updateGoodsBrand',
      payload: values,
    }).then(() => {
      const {
        brandModel: { editStatus },
      } = this.props;
      if (editStatus) {
        this.getList();
        this.setState({
          visible: false,
        });
      }
    });
  };

  submitBrand = e => {
    e.preventDefault();
    const { validateFields } = this.brandRef.current;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { isAdd } = this.state;
        if (isAdd) {
          this.submitAdd(values);
        } else {
          this.submitEdit(values, 'edit');
        }
      }
    });
  };

  search = value => {
    const { status } = this.state;
    const obj = {
      brandName: value,
      status: status ? 0 : 1,
    };
    this.getList(obj);
  };

  changeSwitch = e => {
    this.setState({
      status: e,
    });
  };

  render() {
    const { columns, dataSource, visible, initValue, isAdd, status } = this.state;
    const { listLoading } = this.props;
    return (
      <div className={styles.goodsBrand}>
        <div className={styles.goodsBrandHeader}>
          <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.addGoodsBrand();
              }}
            >
              新增品牌
            </Button>
          </div>

          <div className={styles.search} style={{ textAlign: 'right', lineHeight: '32px' }}>
            是否有效{' '}
            <Switch
              style={{ float: 'right', margin: '5px 20px 0 10px' }}
              defaultChecked={status}
              onChange={e => {
                this.changeSwitch(e);
              }}
            />
          </div>
          <div className={styles.search}>
            <Search
              placeholder="请输入品牌名称"
              onSearch={value => {
                this.search(value);
              }}
              enterButton
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          loading={listLoading}
          pagination={false}
        />
        <AddBrand
          visible={visible}
          initValue={initValue}
          isAdd={isAdd}
          onOk={e => {
            this.submitBrand(e);
          }}
          ref={this.brandRef}
          onClose={() =>
            this.setState({
              visible: false,
            })
          }
        />
      </div>
    );
  }
}
export default GoodsBrand;

import React, { Component, Fragment } from 'react';
import { Table, Input, Menu, Dropdown, Icon, Button, Form, Drawer, Row, Col } from 'antd';
import FormItemDom from '@/components/CreateForm';
import MoreBtn from '@/components/MoreBtn';
import Information from '@/components/Information';
import Blockquote from '@/components/Blockquote';
import InfoDetail from '@/components/InfoDetail';
import AmapComponent from '@/components/AmapComponent';
import { dataType } from '@/utils/utils';

// import AddTest from './Addtest';
import styles from './styles.less';

const { Search } = Input;

@Form.create()
class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    visible: false,
    detailVisible: false,
    amapVisible: false,
    amapPosition: [
      {
        position: {
          latitude: 34.81606494187118,
          longitude: 110.57018419466945,
        },
      },
    ],
    infoList: [
      {
        id: '',
        label: '客户名称',
        value: '张坤(个体)',
      },
      {
        label: '客户名称',
        value: '张坤(个体)',
      },
      {
        label: '客户名称',
        value: '张坤(个体)',
      },
      {
        label: '客户名称',
        value: '张坤(个体)',
        link: true,
        click: () => {
          console.log(this);
          this.setState({
            amapVisible: true,
          });
        },
      },
      {
        label: '客户名称',
        value: '张坤(个体)',
      },
    ],
    BlockquoteData: [
      {
        title: '新建',
        click: () => {
          console.log('新建');
        },
      },
      {
        title: '修改',
        click: () => {
          console.log('修改');
        },
      },
      {
        title: '删除',
        click: () => {
          console.log('删除');
        },
      },
    ],
    moreMenu: [
      {
        key: 'copy',
        value: '复制',
      },
      {
        key: 'copy1',
        value: '复制1',
      },
      {
        key: 'copy2',
        value: '复制2',
      },
    ],
    infoData: [
      {
        title: '客户编号',
        value: '2018594654',
      },
      {
        title: '客户级别',
        value: '重要客户',
      },
      {
        title: '成交状态',
        value: '已成交',
      },
      {
        title: '负责人',
        value: '张先生',
      },
      {
        title: '最后跟进时间',
        value: '2019-08-22 09:43',
      },
      {
        title: '所属公海（名称）',
        value: '---',
      },
    ],
    columns: [
      {
        title: 'Name',
        filters: [{ text: 'John Brown', value: 'John Brown' }, { text: 'test', value: 'test' }],
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ],
    tableData: [],
    formItemData: [
      {
        domType: 'text',
        id: 'controlsId',
        title: '客户名称',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入客户名称',
            },
          ],
        },
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus',
        title: '客户级别',
        domAttr: {
          placeholder: '请选择客户级别',
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {},
        options: [
          {
            key: '重要客户',
            value: '0',
          },
          {
            key: '普通客户',
            value: '1',
          },
          {
            key: '一般客户',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus1',
        title: '来源',
        domAttr: {
          placeholder: '请选择来源',
        },
        fieldAttr: {},
        options: [
          {
            key: '转介绍',
            value: '0',
          },
          {
            key: '线上注册',
            value: '1',
          },
          {
            key: '线上咨询',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus2',
        title: '1级行业',
        domAttr: {
          placeholder: '请选择1级行业',
        },
        fieldAttr: {},
        options: [
          {
            key: '金融业',
            value: '0',
          },
          {
            key: '房地产',
            value: '1',
          },
          {
            key: '交通',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus23',
        title: '2级行业',
        domAttr: {
          placeholder: '请选择2级行业',
        },
        fieldAttr: {},
        options: [
          {
            key: '金融业',
            value: '0',
          },
          {
            key: '房地产',
            value: '1',
          },
          {
            key: '交通',
            value: '2',
          },
        ],
      },
      {
        domType: 'text',
        id: 'constructionUserName1',
        title: '电话',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName2',
        title: '邮箱',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName3',
        title: '传真',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'TextArea',
        id: 'constructionUserName4',
        title: '网址',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'TextArea',
        id: 'constructionUserName5',
        title: '备注',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
    ],
  };

  componentDidMount() {
    console.log(this);
    console.log(dataType('123'));
    console.log(dataType(true));
    console.log(dataType({}));
    console.log(dataType(function() {}));
    console.log(dataType(null));
    console.log(dataType(undefined));
    console.log(dataType([]));

    const dataArr = [];
    for (let i = 0; i < 20; i += 1) {
      const obj = {};
      obj.key = '1';
      obj.name = i % 2 ? 'John Brown' : 'test';
      obj.age = i + 1;
      obj.address = 'New York No. 1 Lake Park';
      dataArr.push(obj);
    }

    this.setState({
      tableData: dataArr,
    });
  }

  // 关闭添加客户
  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  // 点击新建按钮
  clickAdd = () => {
    this.setState({
      visible: true,
    });
  };

  // 添加客户
  handleAddSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.formItemRef.current;
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
  };

  // 点击tr
  clickTr = (e, record) => {
    console.log(e);
    console.log(record);
    this.setState({
      detailVisible: true,
    });
  };

  // 关闭详情
  closeDetail = () => {
    this.setState({
      detailVisible: false,
    });
  };

  // 点击更多里面的按钮
  handleMenuClick = e => {
    console.log(e);
  };

  // 关闭地图
  closeAmap = () => {
    this.setState({
      amapVisible: false,
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span>我负责的</span>
        </Menu.Item>
        <Menu.Item>
          <span>我跟进的</span>
        </Menu.Item>
        <Menu.Item>
          <span>我服务的</span>
        </Menu.Item>
      </Menu>
    );
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const {
      visible,
      formItemData,
      columns,
      tableData,
      detailVisible,
      amapPosition,
      amapVisible,
      moreMenu,
      infoData,
      BlockquoteData,
      infoList,
    } = this.state;

    return (
      <Fragment>
        <div className={`${styles.topWrapper} clearfix`}>
          <div className={styles.left}>
            <div className="clearfix">
              <p>客户</p>
              <div className={styles.selectType}>
                <Dropdown overlay={menu}>
                  <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                    我负责的 <Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className="clearfix">
              <div className={styles.search}>
                <Search
                  style={{ width: 200 }}
                  placeholder="搜索客户名称"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              <div className={styles.btnWrap}>
                <Button
                  type="primary"
                  className={styles.btn}
                  onClick={() => {
                    this.clickAdd();
                  }}
                >
                  新建
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          rowKey={record => record.age}
          bordered
          style={{
            marginTop: 20,
          }}
          onChange={this.handleTableChange}
          locale={{
            filterTitle: '筛选',
            filterConfirm: '确定',
            filterReset: '重置',
            emptyText: '暂无数据',
          }}
          onRow={record => {
            return {
              onClick: event => {
                this.clickTr(event, record);
              }, // 点击行
            };
          }}
        />
        {/* <AddTest /> */}

        {/* 添加客户 */}
        <Drawer
          title="新建客户"
          className="formDrawer"
          width={930}
          onClose={() => {
            this.closeAdd();
          }}
          visible={visible}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleAddSubmit}>
            <h2>基本信息</h2>
            <FormItemDom formData={formItemData} ref={this.formItemRef} />
            <h2>地区定位</h2>
            <Row gutter={16}>
              <div className="clearfix">
                <Col className="gutter-row" span={12}>
                  <p>定位</p>
                  <Input />
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>省/市/区</p>
                </Col>
              </div>

              <Col className="gutter-row" span={12}>
                <p>详细地址</p>
                <Input />
              </Col>
            </Row>
            {/* Row,Col */}

            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button
                onClose={() => {
                  this.closeAdd();
                }}
                style={{ marginRight: 8 }}
              >
                取消
              </Button>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </div>
          </Form>
        </Drawer>

        <Drawer
          width={930}
          onClose={() => {
            this.closeDetail();
          }}
          visible={detailVisible}
          closable={false}
          className="detailDrawer"
        >
          <div className="detailDrawer-header">
            <div className="clearfix">
              <div className="detailDrawer-header-left">
                <div className="clearfix">
                  <span className="icon" />
                  <div className="name">
                    <p>报价单详情</p>
                    <p>婵</p>
                  </div>
                </div>
              </div>
              <div className="detailDrawer-header-right">
                <Button type="primary">编辑</Button>
                <Button type="primary">作废</Button>
                <Button type="primary">锁定</Button>
                <MoreBtn
                  menu={moreMenu}
                  handleMenuClick={e => {
                    this.handleMenuClick(e);
                  }}
                />
                <Icon
                  type="close"
                  onClick={() => {
                    this.closeDetail();
                  }}
                />
              </div>
            </div>
            <Information infoList={infoData} />
          </div>
          <Blockquote title="详细信息" btnData={BlockquoteData} />
          <InfoDetail title="基本信息" list={infoList} />
          <InfoDetail title="基本信息2" list={infoList} />
          <AmapComponent
            visible={amapVisible}
            closeAmap={() => {
              this.closeAmap();
            }}
            position={amapPosition}
          />
        </Drawer>
      </Fragment>
    );
  }
}
export default CustomerList;

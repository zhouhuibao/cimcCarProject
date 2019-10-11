import React, { Component } from 'react';
import { Button, Input, Table, Switch, Row, Col, message, Form, Select } from 'antd';
import { connect } from 'dva';
import { showImg, isEmpty } from '@/utils/utils';
import AddService from './AddService';

const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
@connect(({ serverListModel, loading }) => ({
  serverListModel,
  listLoading: loading.effects['serverListModel/getStationList'],
  addLoading: loading.effects['serverListModel/addStation'],
}))
class ServiceLIst extends Component {
  state = {
    page: 1,
    total: 0,
    isEdit: false,
    initValue: {},
    options: [
      {
        value: '',
        label: '全部',
      },
      {
        value: 0,
        label: '正常',
      },
      {
        value: 1,
        label: '关闭',
      },
    ],
    columns: [
      {
        title: '服务站编号',
        dataIndex: 'stationNo',
      },
      {
        title: '服务站名称',
        dataIndex: 'stationName',
      },
      {
        title: '经销商类型',
        dataIndex: 'stationType',
        render: text => {
          return text ? '直营' : '非直营';
        },
      },
      {
        title: '是否可外出',
        dataIndex: 'isOut',
        render: text => {
          return text === 0 ? '否' : '是';
        },
      },
      {
        title: '是否可开票',
        dataIndex: 'isInvoice',
        render: text => {
          return text === 0 ? '否' : '是';
        },
      },
      {
        title: '联系电话',
        dataIndex: 'mobile',
      },
    ],
    dataSource: [],
    visible: false,
  };

  componentDidMount() {
    this.getTableList();
  }

  getTableList = obj => {
    const { dispatch } = this.props;
    const { page } = this.state;
    const parmas = {
      pageNum: page,
      pageSize: 10,
      ...obj,
    };
    dispatch({
      type: 'serverListModel/getStationList',
      payload: parmas,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.setState({
            dataSource: res.data.rows || [],
            total: res.data.total,
          });
        }
      },
    });
  };

  submitAdd = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serverListModel/addStation',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('服务站添加成功');
          this.setState({
            visible: false,
          });
          this.getTableList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  handleSubmit = (e, ref) => {
    e.preventDefault();
    const { validateFields } = ref.current;
    validateFields((err, values) => {
      if (!err) {
        values.businessHoursBegin = isEmpty(values.businessHoursBegin)
          ? values.businessHoursBegin.format('HH:mm:ss')
          : undefined;
        values.businessHoursEnd = isEmpty(values.businessHoursEnd)
          ? values.businessHoursEnd.format('HH:mm:ss')
          : undefined;
        values.longitude = isEmpty(values.map) ? values.map.location.lng : undefined;
        values.latitude = isEmpty(values.map) ? values.map.location.lat : undefined;
        values.countryId = 1;
        // values.stationType =Boolean(values.stationType);

        const [provinceId, cityId, areaId] = values.area;

        values.provinceId = provinceId;
        values.cityId = cityId;
        values.areaId = areaId;

        delete values.map;
        delete values.area;

        console.log(values);

        const { isEdit } = this.state;
        const paramsObj = {
          station: {
            ...values,
          },
        };
        if (!isEdit) {
          this.submitAdd(paramsObj);
        }
      }
    });
  };

  render() {
    const { columns, dataSource, visible, initValue, isEdit, page, total, options } = this.state;
    const {
      listLoading,
      addLoading,
      form: { getFieldDecorator },
      editLoading,
    } = this.props;
    const pageObj = {
      current: page,
      pageSize: 10,
      total,
      onChange: pages => {
        this.setState(
          {
            page: pages,
          },
          () => {
            this.getList();
          },
        );
      },
    };

    return (
      <div>
        <Form onSubmit={this.searchTable}>
          <Row gutter={16}>
            <Col span={6}>
              <Button
                type="primary"
                icon="plus"
                onClick={() => this.setState({ visible: true, isEdit: false })}
                style={{ marginTop: '4px' }}
              >
                新增服务站
              </Button>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('status', {
                  initialValue: '',
                })(
                  <Select placeholder="请选择状态">
                    {options.map(item => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('brandName')(<Input placeholder="请输入服务站名称" />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <Button htmlType="submit" style={{ marginTop: '4px' }} type="primary">
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          loading={listLoading}
          pagination={pageObj}
        />
        <AddService
          addLoading={addLoading}
          editLoading={editLoading}
          visible={visible}
          initValue={initValue}
          isEdit={isEdit}
          onOk={(e, ref) => {
            this.handleSubmit(e, ref);
          }}
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
export default ServiceLIst;

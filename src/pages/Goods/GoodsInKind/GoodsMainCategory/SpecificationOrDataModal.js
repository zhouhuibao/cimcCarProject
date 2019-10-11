import React, { Component } from 'react';
import { Drawer, Form, Alert, Table, Row, Col, Button, Tag } from 'antd';
import { connect } from 'dva';
// import tableJSON from './table.json';
// import specificationJSON from './guige.json';

@connect(({ mainCategoryModel, loading }) => ({
  mainCategoryModel,
  specsListLoading: loading.effects['mainCategoryModel/queryCategorySpecs'],
  paramListLoading: loading.effects['mainCategoryModel/queryCategoryParam'],
}))
@Form.create()
class SpecificationOrDataModal extends Component {
  state = {
    page: 1,
    total: 0,
    dataList: [],
    // specificationDataList:specificationJSON,
    columns: [
      {
        title: '全部',
      },
    ],
    selectList: [],
    selectColumns: [
      {
        title: `已选择`,
      },
    ],
    selectedRowKeys: [],
  };

  componentDidMount() {
    console.log('组件已加载');
  }

  // 判断是否存在相同的id
  isExistId = (obj, type) => {
    const { selectedRowKeys, selectList } = this.state;
    let flag = false;
    selectedRowKeys.forEach((item, index) => {
      if (item === obj.id) {
        selectedRowKeys.splice(index, 1);
        selectList.splice(index, 1);
        if (type === 'auto') {
          obj.show = true;
          selectedRowKeys.push(obj.id);
          selectList.push(obj);
        }
        flag = true;
      }
    });

    if (!flag) {
      if (type === 'auto') {
        obj.show = true;
      }
      selectedRowKeys.push(obj.id);
      selectList.push(obj);
    }
    this.setState({
      selectedRowKeys,
      selectList,
    });
  };

  setDefaultData = () => {
    const { type, dispatch, initValue } = this.props;
    const { page } = this.state;

    const modelType = type ? 'queryCategoryParam' : 'queryCategorySpecs';

    const paramsObj = {
      pageNum: page,
      pageSize: 10,
      categId: initValue.id,
    };

    dispatch({
      type: `mainCategoryModel/${modelType}`,
      payload: paramsObj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          res.data.rows.forEach(item => {
            if (item.chosen === 1) {
              this.isExistId(item, 'auto');
            }
          });
          this.setState({
            dataList: res.data.rows || [],
            total: res.total,
          });
        }
      },
    });
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { type } = this.props;
      const { columns, selectColumns } = this.state;
      columns[0].dataIndex = !type ? 'specName' : 'paramName';
      selectColumns[0].dataIndex = !type ? 'specName' : 'paramName';
      this.setState({
        columns,
        selectColumns,
      });
      this.setDefaultData();
    } else {
      this.setState({
        total: 0,
        page: 1,
        selectList: [],
        selectedRowKeys: [],
      });
    }
  };

  render() {
    const { onClose, visible, type, specsListLoading, paramListLoading, onOk } = this.props;
    const {
      dataList,
      columns,
      selectColumns,
      selectList,
      selectedRowKeys,
      page,
      total,
    } = this.state;
    const rowSelection = {
      onSelect: record => {
        this.isExistId(record, 'onSelect');
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        changeRows.forEach(item => {
          this.isExistId(item);
        });
      },
      selectedRowKeys,
    };
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
            this.setDefaultData();
          },
        );
      },
    };
    const dataType = type ? 'goodsParamValue' : 'goodsSpecsValueList';

    return (
      <Drawer
        title={type ? '关联参数' : '关联规格'}
        width="800"
        onClose={onClose}
        visible={visible}
        className="formDrawer"
        afterVisibleChange={this.afterVisibleChange}
      >
        <Alert
          message="关联说明"
          description="类目最多关联20个商品参数和3个规格，并且只能关联一个图片属性规格"
          type="info"
          closable
          style={{ marginBottom: 20 }}
        />
        <Row gutter={16}>
          <Col span={12}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              pagination={pageObj}
              dataSource={dataList}
              rowKey={record => record.id}
              loading={type ? paramListLoading : specsListLoading}
              expandedRowRender={record =>
                record[dataType].map(item => {
                  return (
                    <Tag color="cyan" key={item.id}>
                      {item.valueName}
                    </Tag>
                  );
                })
              }
            />
          </Col>
          <Col span={12}>
            <Table columns={selectColumns} dataSource={selectList} rowKey={record => record.id} />
          </Col>
        </Row>

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
          <Button
            type="primary"
            onClick={() => {
              onOk(selectList);
            }}
          >
            保存
          </Button>
        </div>
      </Drawer>
    );
  }
}
export default SpecificationOrDataModal;

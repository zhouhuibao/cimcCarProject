import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Drawer, List, Avatar, Divider, Col, Row, Form, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FormItemDom from '@/components/CreateForm';
import { isUrl } from '../../utils/utils';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

@Form.create()
@connect(({ testModel }) => ({
  testModel,
}))
class TextPage extends Component {
  // formItemRef =
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    testInfo: '测试数据',
    visible: false,
    formItemData: [
      {
        domType: 'text',
        id: 'controlsId',
        title: '子工程',
        required: true,
        domAttr: {
          placeholder: '请选择子工程',
          onChange: e => {
            console.log(e);
            console.log(this);
          },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入子工程',
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
        title: '审批状态',
        domAttr: {
          placeholder: '请选择审批状态',
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {},
        options: [
          {
            key: '已拒绝',
            value: '0',
          },
          {
            key: '待审批',
            value: '1',
          },
          {
            key: '撤回',
            value: '2',
          },
          {
            key: '已审批',
            value: '3',
          },
        ],
      },
      {
        domType: 'text',
        id: 'supplierId',
        title: '施工单位',
        domAttr: {
          multipleSupplier: false,
          tenderType: '0',
          isAuthentication: true,
        },
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'RangePicker',
        id: 'addTime',
        title: '新增时间',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName',
        title: '施工代表',
        domAttr: {
          placeholder: '请输入施工代表',
        },
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName',
        title: '施工代表',
        domAttr: {
          placeholder: '请输入施工代表',
        },
        fieldAttr: {},
        options: null,
      },
    ],
  };

  static getDerivedStateFromProps(props, state) {
    console.log(this);
    console.log(props);
    console.log(state);
  }

  componentDidMount() {
    const path = 'www.baidu.cn';
    console.log(isUrl(path));
    console.log(this);
    const { dispatch } = this.props;
    dispatch({
      type: 'testModel/queryMyExecuteTask',
      payload: {
        parentCode: 'manage',
      },
      callBack: res => {
        console.log(res);
      },
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.formItemRef);
    const { validateFields } = this.formItemRef.current;

    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render() {
    const {
      testModel: { testList },
    } = this.props;
    const { formItemData } = this.state;
    return (
      <PageHeaderWrapper>
        {testList.map((item, i) => {
          return <p key={i}>{item}</p>;
        })}

        <div>
          <List
            dataSource={[
              {
                name: 'Lily',
              },
              {
                name: 'Lily',
              },
            ]}
            bordered
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <a onClick={this.showDrawer} key={`a-${item.id}`}>
                    View Profile
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  }
                  title={<span>{item.name}</span>}
                  description="Progresser AFX"
                />
              </List.Item>
            )}
          />
          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
            <p style={pStyle}>Personal</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Full Name" content="Lily" />{' '}
              </Col>
              <Col span={12}>
                <DescriptionItem title="Account" content="AntDesign@example.com" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content="HangZhou" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content="China🇨🇳" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Birthday" content="February 2,1900" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content="-" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Message"
                  content="Make things as simple as possible but no simpler."
                />
              </Col>
            </Row>
            <Divider />
            <p style={pStyle}>Company</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Position" content="Programmer" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Responsibilities" content="Coding" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Department" content="AFX" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Skills"
                  content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                />
              </Col>
            </Row>
            <Divider />
            <p style={pStyle}>Contacts</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email" content="AntDesign@example.com" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Github"
                  content={
                    <a href="http://github.com/ant-design/ant-design/">
                      github.com/ant-design/ant-design/
                    </a>
                  }
                />
              </Col>
            </Row>
          </Drawer>
          <Form onSubmit={this.handleSubmit}>
            <FormItemDom formData={formItemData} ref={this.formItemRef} />
            <Button htmlType="submit">提交</Button>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default TextPage;

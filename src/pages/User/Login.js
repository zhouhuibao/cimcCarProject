import React, { Component } from 'react';
import { Input, Button, Checkbox, Form } from 'antd';
import { router } from 'umi';
import { rules } from '@/utils/utils';
import styles from './styles.less';

const FormItem = Form.Item;

@Form.create()
class Login extends Component {
  state = {
    isDynamicpassword: false,
    getText: '获取',
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        router.push('/');
      }
    });
  };

  handleClickDynamic = () => {
    const { isDynamicpassword } = this.state;
    this.setState({
      isDynamicpassword: !isDynamicpassword,
    });
  };

  getCode = () => {
    const { getText } = this.state;
    if (rules('number').test(getText)) {
      return;
    }

    let timeNumber = 60;
    this.setState({
      getText: timeNumber,
    });
    const time = setInterval(() => {
      timeNumber -= 1;
      this.setState({
        getText: timeNumber,
      });

      if (timeNumber < 1) {
        clearInterval(time);
        this.setState({
          getText: '重新获取',
        });
      }
    }, 1000);
  };

  handleClickForgetPassword = () => {
    router.push('/user/forget-password');
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { isDynamicpassword, getText } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.login}>
          <div className={styles.loginItem}>
            <div className={styles.loginItemLabel}>账号</div>
            <div className={styles.loginItemValue}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: ' 请输入账号' }],
                })(<Input placeholder="请输入账号" />)}
              </FormItem>
            </div>
          </div>
          {isDynamicpassword ? (
            <div className={styles.loginItem}>
              <div className={styles.loginItemLabel}>动态密码</div>
              <div className={`${styles.loginItemValue} ${styles.dynamicpass}`}>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入短信动态密码' }],
                  })(<Input placeholder="请输入短信动态密码" type="password" />)}
                </FormItem>
                <span
                  onClick={() => {
                    this.getCode();
                  }}
                >
                  {getText}
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.loginItem}>
              <div className={styles.loginItemLabel}>密码</div>
              <div className={styles.loginItemValue}>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                  })(<Input placeholder="请输入密码" type="password" />)}
                </FormItem>
              </div>
            </div>
          )}

          <p
            className="textRight"
            style={{ cursor: 'pointer', color: '#fc923f' }}
            onClick={() => {
              this.handleClickDynamic();
            }}
          >
            {isDynamicpassword ? '个人密码登录' : '动态密码登录'}
          </p>
          <div className={styles.loginBtn}>
            <Button htmlType="submit">登录</Button>
          </div>
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            <Checkbox>记住登录状态</Checkbox>
          </p>
          <p
            className="textRight"
            style={{ cursor: 'pointer', color: '#fc923f', marginTop: 20 }}
            onClick={() => {
              this.handleClickForgetPassword();
            }}
          >
            忘记密码
          </p>
        </div>
      </Form>
    );
  }
}

export default Login;

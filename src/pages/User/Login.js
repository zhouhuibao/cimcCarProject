import React, { Component } from 'react';
import { Input, Button, Checkbox, Form, message } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
import { rules, setCookie } from '@/utils/utils';
import styles from './styles.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ userModel, loading }) => ({
  userModel,
  loginLoading: loading.effects['userModel/login'],
}))
class Login extends Component {
  state = {
    isDynamicpassword: false,
    getText: '获取',
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      form: { validateFields },
    } = this.props;
    const { isDynamicpassword } = this.state;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log(isDynamicpassword);
        values.loginType = isDynamicpassword ? 'LOGIN_CHECKCODE' : 'LOGIN_PASSWORD';
        dispatch({
          type: 'userModel/login',
          payload: values,
          callBack: res => {
            console.log(res);
            setCookie('gcgjCookie', res.data.token, 7);
            router.push('/goods/goods-kind/goods-brand');
          },
        });
      }
    });
  };

  handleClickDynamic = () => {
    const { isDynamicpassword } = this.state;
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      account: null,
      password: null,
    });
    this.setState({
      isDynamicpassword: !isDynamicpassword,
    });
  };

  getCode = () => {
    const { getText } = this.state;
    if (rules('number').test(getText)) {
      return;
    }
    const {
      dispatch,
      form: { validateFields },
    } = this.props;

    validateFields(['account'], (err, values) => {
      if (!err) {
        console.log(values);
        const dataObj = {
          mobile: values.account,
          checkCodeType: 'LOGIN_CHECKCODE',
        };
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
        dispatch({
          type: 'userModel/sendCheckCode',
          payload: dataObj,
          callBack: res => {
            console.log(res);
            if (res.success) {
              message.success('验证码发送成功,请注意查收');
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
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
            <div className={styles.loginItemLabel}>{isDynamicpassword ? '手机号' : '账号'}</div>
            <div className={styles.loginItemValue}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [
                    {
                      required: true,
                      message: `${isDynamicpassword ? '手机号格式不正确' : '请输入账号'}`,
                      pattern: isDynamicpassword ? rules('mobile') : null,
                    },
                  ],
                })(<Input placeholder={`请输入${isDynamicpassword ? '手机号' : '账号'}`} />)}
              </FormItem>
            </div>
          </div>
          {isDynamicpassword ? (
            <div className={styles.loginItem}>
              <div className={styles.loginItemLabel}>动态密码</div>
              <div className={`${styles.loginItemValue} ${styles.dynamicpass}`}>
                <FormItem>
                  {getFieldDecorator('checkCode', {
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

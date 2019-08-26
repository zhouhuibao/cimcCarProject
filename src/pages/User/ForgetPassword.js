import React, { Component } from 'react';
import { Input, Button, Form, message } from 'antd';
import { router } from 'umi';
import { rules } from '@/utils/utils';
import styles from './styles.less';

const FormItem = Form.Item;

@Form.create()
class ForgetPassword extends Component {
  state = {
    getText: '获取验证码',
  };

  getCode = () => {
    const {
      form: { getFieldValue },
    } = this.props;

    if (!getFieldValue('mobile')) {
      message.error('请输入手机号');
    } else if (!rules('mobile').test(getFieldValue('mobile'))) {
      message.error('手机号格式不正确');
    } else {
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
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log(values);
        if (!values.mobile) {
          message.error('请输入手机号');
        } else if (!rules('mobile').test(values.mobile)) {
          message.error('手机号格式不正确');
        } else if (!values.username) {
          message.error('请输入短信验证码');
        } else {
          router.push('/user/recover-password');
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { getText } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.forgetPassword}>
          <div className={styles.loginItem}>
            <div className={styles.mobileNo}>
              <FormItem>
                {getFieldDecorator('mobile')(<Input placeholder="请输入手机号码" />)}
              </FormItem>
            </div>

            <span
              onClick={() => {
                this.getCode();
              }}
            >
              {getText}
            </span>
          </div>
          <div className={styles.loginItem}>
            <FormItem>
              {getFieldDecorator('username')(<Input placeholder="请输入短信验证码" />)}
            </FormItem>
          </div>
          <div className={styles.loginBtn}>
            <Button htmlType="submit">下一步</Button>
          </div>

          <p
            className={styles.backLogin}
            onClick={() => {
              router.push('/user/login');
            }}
          >
            返回登录
          </p>
        </div>
      </Form>
    );
  }
}

export default ForgetPassword;

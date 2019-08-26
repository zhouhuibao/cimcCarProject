import React, { Component } from 'react';
import { Input, Button, Form, message, Icon } from 'antd';
import { router } from 'umi';
import { rules } from '@/utils/utils';
import styles from './styles.less';

const FormItem = Form.Item;
@Form.create()
class RecoverPassword extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields, getFieldValue },
    } = this.props;
    validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log(values);

        if (!getFieldValue('password')) {
          message.error('请输入新密码');
        } else if (!getFieldValue('password2')) {
          message.error('确认密码不能为空');
        } else if (
          !rules('password').test(getFieldValue('password2')) ||
          !rules('password').test(getFieldValue('password1'))
        ) {
          message.error('密码格式不正确,请使用数字加字母组合');
        } else if (getFieldValue('password') !== getFieldValue('password2')) {
          message.error('两次输入密码不一致,请检查');
        } else {
          router.push('/user/login');
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <p
          style={{
            textAlign: 'center',
            marginBottom: 40,
            fontSize: 12,
          }}
        >
          你的企业已设置:密码为8位以上字母+数字组合
        </p>
        <div className={styles.forgetPassword}>
          <div className={styles.loginItem}>
            <FormItem>
              {getFieldDecorator('password')(<Input placeholder="请输入新密码" type="password" />)}
            </FormItem>
          </div>
          <div className={styles.loginItem}>
            <FormItem>
              {getFieldDecorator('password2')(<Input placeholder="确认密码" type="password" />)}
            </FormItem>
          </div>
          <div className={styles.loginBtn}>
            <Button htmlType="submit">提交</Button>
          </div>

          <p
            className={styles.backLogin}
            onClick={() => {
              router.push('/user/forget-password');
            }}
          >
            <Icon type="left" /> 返回上一步
          </p>
        </div>
      </Form>
    );
  }
}

export default RecoverPassword;

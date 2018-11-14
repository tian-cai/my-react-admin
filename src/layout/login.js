import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;
import "./login.css"
import apiService from "./../service/apiservice.js"

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this)
  }

  login(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let info = apiService.login(values)
        if (info.islogin) {
          message.success(info.message, 0.8);
          sessionStorage.setItem('role', info.role)
          this.props.history.push('/welcome')
        } else {
          message.error(info.message, 0.8);
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-model">
        <Form>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <Button type="primary" onClick={this.login}>
            Log in
        </Button>
        </Form>
      </div>
    )
  }
}
export default withRouter(Form.create()(Login))

import React from "react";
import { Form, Input, Select, Button, Radio, message } from 'antd';
import apiService from "./../../../service/apiservice.js"
import { parseSearch } from "./../../../util/util.js"
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UiTableUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personDetail: ''
    }
    this.submitPerson = this.submitPerson.bind(this)
  }

  componentWillMount() {
    let location = this.props.location
    let id = parseSearch(location.search, 'id')
    if (id) {
      apiService.queryPerson(id)
        .then((res) => {
          this.setState({
            personDetail: res.data
          })
        })
        .catch((err) => {
          message.error(err, 0.8);
        })
    }
  }

  submitPerson(e) {
    let personDetail = this.state.personDetail
    let url = 'addPerson'
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (personDetail) {
          url = 'putPerson'
          values['id'] = personDetail.id
        }
        apiService[url](values)
          .then((res) => {
            message.success('保存成功', 0.8);
            this.props.history.push('/ui/table')
          })
          .catch((err) => {
            message.error(err, 0.8);
          })
      }
    });
  }

  render() {
    let personDetail = this.state.personDetail
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 10,
        },
      },
    };
    const prefixPhone = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <div className="white" style={{ padding: 20 }}>
        <Form style={{ 'maxWidth': 700 }}>
          <FormItem label="姓名" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: personDetail.name,
              rules: [{ required: true, message: 'Please input your name!' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="性别"  {...formItemLayout}>
            {getFieldDecorator('sex', {
              initialValue: personDetail.sex || '男'
            })(
              <RadioGroup>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="手机" {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: personDetail.phone,
              rules: [{ required: true, message: 'Please input your phone!' },
              { pattern: /^\d{11}$/, message: 'Please input valid phone!' }]
            })(
              <Input addonBefore={prefixPhone} />
            )}
          </FormItem>
          <FormItem label="E-mail" {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: personDetail.email,
              rules: [
                { required: true, message: 'Please input your E-mail!' },
                { type: 'email', message: 'The input is not valid E-mail!' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: personDetail.address,
              rules: [{ required: true, message: 'Please select your address!', }]
            })(
              <Select allowClear>
                <Option value="北京">北京</Option>
                <Option value="上海">上海</Option>
                <Option value="广州">广州</Option>
                <Option value="深圳">深圳</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={this.submitPerson}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(UiTableUpdate);
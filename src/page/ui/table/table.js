import React from "react";
import { Link } from "react-router-dom"
import { Table,message,Form,Input,Row, Col, Button,Select} from 'antd';
import apiService from "./../../../service/apiservice.js"
const FormItem = Form.Item;
const Option = Select.Option;
class UiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      personList: [],
      columns: [
        {
          title:'姓名',
          key:'name',
          dataIndex: 'name',
        },
        {
          title:'性别',
          key:'sex',
          dataIndex: 'sex',
        },
        {
          title:'邮箱',
          key:'email',
          dataIndex: 'email',
        },
        {
          title:'联系方式',
          key:'phone',
          dataIndex: 'phone',
        },
        {
          title:'地址',
          key:'address',
          dataIndex: 'address',
        },
        {
          title:'操作',
          key:'action',
          render: (record) => (
            <span>
              <Link to={"/ui/table-update?id="+record.id}>编辑</Link>
              <a className="ml10 delete" onClick={() => this.deletePerson(record.id)}>删除</a>
            </span>
            )
        }
      ]
    }
    this.deletePerson = this.deletePerson.bind(this)
    this.getPersonList = this.getPersonList.bind(this)
    this.search = this.search.bind(this)
    this.addPerson = this.addPerson.bind(this)
  }

  componentWillMount() {
    this.getPersonList(null)
  }

  getPersonList(param) {
    apiService.getPersonList(param)
    .then((res)=>{
      this.setState({
        personList: res.data,
        loading: false
      })
    })
    .catch((err)=>{
      message.error(err,0.8);
    })
  }

  deletePerson(id) {
    apiService.deletePerson(id)
    .then((res)=>{
      message.success('删除成功',0.8);
      this.getPersonList(null)
    })
    .catch((err)=>{
      message.error(err,0.8);
    })
  }

  search(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!values.name) {
        values.name = null
      }
      this.setState({
        loading:true
      },this.getPersonList(values))
    });
  }

  addPerson() {
    this.props.history.push('/ui/table-update')
  }

  render() {
    let { columns, personList,loading} = this.state
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div className="white p20">
        <Form>
          <Row gutter={24}>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('name',{
                  })(
                  <Input placeholder="人员姓名"/>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('sex',{
                  })(
                    <Select allowClear placeholder="性别">
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                )}
              </FormItem>
            </Col>
            <Col style={{paddingTop: 4}}>
              <Button className="mr10" type="primary" onClick={this.search}>查询</Button>
              <Button type="primary" onClick={this.addPerson}>新建</Button>
            </Col>
          </Row>
        </Form>
        <Table style={{marginTop:-20}} pagination={false} columns={columns} dataSource={personList} rowKey="id" loading={loading}/>
      </div>
    )
  }
}

export default Form.create()(UiTable);
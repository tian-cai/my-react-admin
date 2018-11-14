import React, { Component } from 'react';
import { message, Row, Col } from 'antd';
import { Chart, Tooltip, Axis, Legend, SmoothLine, Point, Bar } from 'viser-react';
import { DataSet } from '@antv/data-set'
import apiService from "./../../../service/apiservice.js"
import GlobalLoading from "./../../../common/components/loading.js"
import "./chart.css"

class UiChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartArr: [],
      isLoading: true
    }
    this.transformData = this.transformData.bind(this)
  }


  componentWillMount() {
    apiService.getChartData()
      .then((res) => {
        this.setState({
          chartArr: res.data,
          isLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          isLoading: false
        })
        message.error(err, 0.8);
      })
  }
  transformData(source) {
    const dv = new DataSet.View().source(source.data);
    dv.transform({
      type: 'fold',
      fields: ['Tokyo', 'London'],
      key: 'city',
      value: 'temperature',
    });
    const data = dv.rows;
    return data
  }

  render() {
    const item = this.state.chartArr
    const isLoading = this.state.isLoading
    const chart = item.map((ele, i) => {
      return <Col span={11} offset={i % 2 === 0 ? 0 : 1} className="chart-item" key={ele.id}>
        <h3>{ele.title}</h3>
        <Chart forceFit height={400} data={this.transformData(ele)}>
          <Tooltip />
          <Axis />
          <Legend />
          {ele.type === 'line' && <p><SmoothLine position="month*temperature" color="city" />
            <Point position="month*temperature" shape="circle" color="city" /></p>}
          {ele.type === 'bar' &&
            <Bar position="month*temperature" color="city" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
          }
        </Chart>
      </Col>
    })
    return (
      isLoading ? <GlobalLoading isLoading={isLoading} size="large"></GlobalLoading>
        : <Row type="flex">
          {chart}
        </Row>
    );
  }
}

export default UiChart;

import React, { Component } from 'react';
import { message, Row, Col } from 'antd';
import { Chart, Tooltip, Axis, Legend, SmoothLine, Point, Bar } from 'viser-react';
import { DataSet } from '@antv/data-set'
import apiService from "./../../../service/apiservice.js"
import "./chart.css"

class UiChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartArr: []
    }
    this.transformData = this.transformData.bind(this)
  }


  componentWillMount() {
    apiService.getChartData()
      .then((res) => {
        this.setState({
          chartArr: res.data
        })
      })
      .catch((err) => {
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
      <Row type="flex">
        {chart}
      </Row>
    );
  }
}

export default UiChart;

import React from 'react';
import { Tag } from 'antd';
import { renderToString } from 'react-dom/server';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

import './index.less';

const CustomTooltip = props => {
  const { _origin, title } = props;
  const plan = _origin.plan || [];
  return (
    <div className="g2-tooltip">
      <div className="g2-tooltip-title">
        <strong>汇款金额: </strong>
        <Tag>{title}</Tag>
      </div>
      <div className="g2-tooltip-title">
        <strong>最优汇款汇率: </strong>
        <Tag color="green">{_origin.rate}</Tag>
      </div>
      <div className="g2-tooltip-title">
        <strong>建议汇款笔数: </strong>
        <Tag color="green">{plan.length}(手续费: $SG {plan.length*18})</Tag>
      </div>
      <div className="g2-tooltip-title">
        <strong>汇款详情: </strong>
        {plan.map(d => (
          <Tag color="cyan">{d.limit}</Tag>
        ))}
      </div>
    </div>
  );
};

export default class BestRemitStep extends React.Component {
  render() {
    const { data, spinning } = this.props;
    const min = Math.min(...data.map(d => d.rate));
    const cols = {
      rate: {
        min: spinning ? 0 : Math.floor(min * 1000) / 1000
      },
      amount: {
        range: [0, 1]
      }
    };
    return (
      <div className="best-remit-step">
        <Chart height={250} data={data} scale={cols} forceFit>
          <Axis name="amount" />
          <Axis name="rate" />
          <Tooltip
            crosshairs={{
              type: 'cross'
            }}
            htmlContent={(title, items) => {
              return renderToString(
                <CustomTooltip title={title} {...items[0].point} />
              );
            }}
          />
          <Geom type="line" position="amount*rate" size={2} />
          <Geom
            type="point"
            position="amount*rate"
            size={4}
            shape={'circle'}
            style={{
              stroke: '#fff',
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

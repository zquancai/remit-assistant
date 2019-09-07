import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

import './index.less';

export default class Step extends React.Component {
  render() {
    const { data } = this.props;
    const cols = {
      limit: {
        range: [0, 0.8]
      }
    };
    const fillData = data.map((d, index) => {
      const next = data[index + 1];
      if (next) {
        return {
          ...d,
          title: `${d.limit}<=金额<${next.limit}`
        };
      } else {
        return {
          ...d,
          title: `金额>=${d.limit}`
        };
      }
    });
    return (
      <div className="step-wrapper">
        <Chart height={250} data={data} scale={cols} forceFit>
          <Axis name="金额" />
          <Axis name="汇率" />
          <Tooltip
            crosshairs={{
              type: 'y'
            }}
          />
          <Geom
            type="line"
            position="limit*rangeRate"
            size={2}
            shape={'hv'}
            tooltip={[
              'limit*rangeRate',
              (limit, rangeRate) => {
                return {
                  name: '汇率：',
                  title: fillData.find(d => d.limit === limit).title,
                  value: rangeRate
                };
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Section from '../../components/section';
import BestRemitStep from '../../components/best-remit-step';
import { getBestRemittance } from '../../../utils/counter';
import { Spin, Icon, Tooltip } from 'antd';

import './index.less';

class BestRemit extends PureComponent {
  handleSubmit = () => {};

  calc() {
    const { rates } = this.props;
    const minUnion = rates[0].limit;
    const data = [];
    for (let amount = minUnion; amount <= 50000; amount = amount + 1000) {
      const ret = getBestRemittance(rates, amount);
      if (ret) {
        data.push({
          rate: ret.resultRate,
          amount,
          plan: ret.item
        });
      }
    }
    return data;
  }

  render() {
    const { rates, spinning } = this.props;
    if (rates.length === 0) {
      return null;
    }
    const data = this.calc();
    const title = (
      <Fragment>
        最优汇款汇率
        <Tooltip trigger="hover" placement="top" title="最优汇款汇率=汇款到账金额 / (汇款金额 + 汇款笔数*18)">
          <Icon type="info-circle" />
        </Tooltip>
      </Fragment>
    );
    return (
      <Section title={title}>
        <Spin spinning={spinning}>
          <BestRemitStep data={data} spinning={spinning} />
        </Spin>
      </Section>
    );
  }
}

export default connect(({ currency }) => ({ ...currency }))(BestRemit);

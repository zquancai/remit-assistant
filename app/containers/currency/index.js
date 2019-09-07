import React, { PureComponent, Fragment } from 'react';
import { Button, message, Spin, Select } from 'antd';
import { connect } from 'react-redux';
import Step from '../../components/step';
import Section from '../../components/section';

import './index.less';

const Option = Select.Option;

class Currency extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'currency/updateRates',
      payload: { currency: 'CNY' }
    });
  }

  refresh = () => {
    this.props.dispatch({
      type: 'currency/updateRates',
      payload: { currency: 'CNY' }
    });
    message.success('刷新成功！');
  };

  onChange = value => {
    this.props.dispatch({
      type: 'currency/updateRates',
      payload: { currency: value }
    });
  };

  render() {
    const { rates, spinning, currencies, currency } = this.props;
    return (
      <Section
        className="currency-wrapper"
        title={
          <Fragment>
            <Select
              size="small"
              value={currency}
              style={{ width: 100, marginRight: 10 }}
              onChange={this.onChange}
            >
              {currencies.map(c => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
            当前汇率
            <Button
              className="refresh-btn"
              type="primary"
              size="small"
              onClick={this.refresh}
            >
              刷新
            </Button>
          </Fragment>
        }
      >
        <Spin spinning={spinning}>
          <Step data={rates} />
        </Spin>
      </Section>
    );
  }
}

export default connect(({ currency }) => ({ ...currency }))(Currency);

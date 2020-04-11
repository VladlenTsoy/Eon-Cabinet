import React from "react";
import antd from "antd";
import {SpinProps} from "antd/es/spin";
import styled from "styled-components";
import {Icon} from '@ant-design/compatible';

const WrapperSpin = styled(antd.Spin)`
  position: relative;
  min-height: 200px;
  .ant-spin-text{
    color: ${props => props.theme.color_main};
  }
`;

const WrapperIcon = styled(Icon)`
  .ant-spin-nested-loading > div > .ant-spin.ant-spin-show-text &.ant-spin-dot{
    font-size: 50px;
    margin: -60px -25px -25px;
  }
`;

const Spin: React.FC<SpinProps> = ({children, ...props}) => {
    return <WrapperSpin indicator={<WrapperIcon type="loading"/>} {...props}>
        {children}
    </WrapperSpin>
};

export default Spin;
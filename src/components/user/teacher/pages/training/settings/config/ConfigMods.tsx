import React from 'react';
import {Checkbox, Form, Tooltip} from "antd";
import styled from "styled-components";
import {ConfigModsProps} from "./Config";
import { FaPlus, FaUsers, FaQuoteRight, FaSquare, FaSlidersH } from 'react-icons/fa'

const CheckboxGroup = styled(Checkbox.Group)`
  &.ant-checkbox-group{
    display: flex;
    width: 100%;
    //margin-bottom: 2rem;
    position: relative;
    z-index: 5;

    label {
      display: flex;
      text-align: center;
      width: 100%;
      border: 0;
      font-size: 22px;
      height: auto;
      justify-content: center;

      &:hover {
        color: ${props => props.theme.color_warning};
      }

      .ant-checkbox {
        display: none;
      }

      & > span:not(.ant-checkbox) {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        transition: all 0.2s ease-in-out;
      }

      &.ant-checkbox-wrapper-checked:not(.ant-checkbox-wrapper-disabled) {
        & > span:not(.ant-checkbox) {
          color: #ffffff;
          position: relative;
          background: ${props => props.theme.color_warning};
          box-shadow: ${props => props.theme.shadow_warning};

          &:after {
            border-radius: 50%;
            position: absolute;
            content: "";
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            transform: scale(1.2);
            z-index: -1;
            background: ${props => props.theme.color_warning};
            box-shadow: ${props => props.theme.shadow_warning};
          }
        }
      }
    }
 }
`;

interface ModsProps {
    config?: ConfigModsProps;
}

const ConfigMods: React.FC<ModsProps> = ({config}) => {
    const options = [
        {
            label: <Tooltip title="Плюс"><FaPlus/></Tooltip>,
            value: 'plus',
            disabled: !(config && config.plus)
        },
        {
            label: <Tooltip title="Группа"><FaUsers/></Tooltip>,
            value: 'group',
            disabled: !(config && config.group)
        },
        {
            label: <Tooltip title="Запятая"><FaQuoteRight/></Tooltip>,
            value: 'comma',
            disabled: !(config && config.comma)
        },
        {
            label: <Tooltip title="Абакус"><FaSlidersH/></Tooltip>,
            value: 'abacus',
            disabled: !(config && config.abacus)
        },
        {
            label: <Tooltip title="Зеркало"><FaSquare/></Tooltip>,
            value: 'mirror',
            disabled: !(config && config.mirror)
        },
    ];

    return <Form.Item name="extra">
        <CheckboxGroup options={options}/>
    </Form.Item>
};

export default ConfigMods;
import React from 'react';
import {SoundOutlined, StopOutlined} from '@ant-design/icons';
import {Form, Radio, Tooltip} from "antd";
import styled from "styled-components";
import {ConfigSoundProps} from "./Config";

export const RadioGroup = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
    //margin-bottom: 2rem;

    label {
      display: flex;
      text-align: center;
      width: 100%;
      border: 0;
      font-size: 18px;
      box-shadow: none;
      outline: none;
      border-radius: 0;
      height: auto;
      justify-content: center;

      &:hover {
        border: 0;
        box-shadow: none;
        outline: none;
        color: ${props => props.theme.color_danger};
      }
      
      &:active{
        border: 0;
        box-shadow: none;
        outline: none;
      }

      & > span:not(.ant-radio-button) {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        transition: all 0.2s ease-in-out;
      }

      &.ant-radio-button-wrapper-checked {
        & > span:not(.ant-radio-button) {
          color: #ffffff;
          position: relative;
            background: ${props => props.theme.color_danger};
            box-shadow: ${props => props.theme.shadow_danger};

          &:after {
            border-radius: 50%;
            bottom: 0;
            content: "";
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transform: scale(1.2);
            z-index: -1;
            background: ${props => props.theme.color_danger};
            box-shadow: ${props => props.theme.shadow_danger};
          }
        }
      }

      &.secondary-button.ant-radio-button-wrapper-checked {
        & > span:not(.ant-radio-button) {
          background: rgba(108, 117, 125, .35);
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

          &:after {
            background: rgba(108, 117, 125, .35);
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
          }
        }
      }

      &::before {
        content: initial;
      }
    }
  }
`;

interface ConfigSoundsProps {
    config?: ConfigSoundProps;
}

const ConfigSounds: React.FC<ConfigSoundsProps> = ({config}) => {
    return <Form.Item name="sound" required>
        <RadioGroup>
            <Radio.Button className="secondary-button" value="none">
                <Tooltip title="Без звука"><StopOutlined/></Tooltip>
            </Radio.Button>
            <Radio.Button value="basic">
                <Tooltip title="Со звуком"><SoundOutlined/></Tooltip>
            </Radio.Button>
            {config && config.language ?
                <>
                    <Radio.Button value="ru">
                        <Tooltip title="На русском языке"><>RU</>
                        </Tooltip>
                    </Radio.Button>
                    < Radio.Button value="en">
                        < Tooltip title="На английском языке"><>EN</>
                        </Tooltip>
                    </Radio.Button>
                </> : null
            }
        </RadioGroup>
    </Form.Item>
};

export default ConfigSounds;
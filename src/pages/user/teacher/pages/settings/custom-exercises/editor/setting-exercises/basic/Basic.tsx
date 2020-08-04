import React from 'react';
import styled from "styled-components";
import {Card} from "lib/components";
import {Form} from "antd";
import Addition from "../layouts/item/addition/Addition";
import Multiplication from "../layouts/item/multiplication/Multiplication";
import SaveButton from "../layouts/save-button/SaveButton";
import Item from "../layouts/item/Item";

const BasicWrapper = styled(Card)`
  &.ant-card{
    height: 100%;
    margin-bottom: 0;
    
    .ant-card-body{
      height: 100%;
      align-items: center;
      
      .ant-form{
        height: 100%;
      }
    }
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  display: block;
`;

interface BasicProps {
    setupSetting: any;
}

const Basic: React.FC<BasicProps> = ({setupSetting}) => {
    const [form] = Form.useForm();

    return <BasicWrapper>
        <Form form={form}>
            <ScrollWrapper>
                {
                    Array(setupSetting.times).fill(1)
                        .map((item: any, key) =>
                            <Item times={key} key={key}>
                                {
                                    setupSetting.mode === 'plus-minus' ?
                                        <Addition
                                            columnKey={0} rowKey={0} tableKey={key}
                                            setupSetting={setupSetting}
                                        /> :
                                        <Multiplication
                                            columnKey={0} rowKey={0} tableKey={key}
                                            mode={setupSetting.mode}
                                        />
                                }
                            </Item>
                        )
                }
            </ScrollWrapper>
            <SaveButton form={form} setupSetting={setupSetting}/>
        </Form>
    </BasicWrapper>;
};

export default Basic;
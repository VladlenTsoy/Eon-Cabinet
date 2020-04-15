import React, {useState} from 'react';
import styled from "styled-components";
import {Card} from "lib";
import {PlusCircleOutlined} from "@ant-design/icons";
import {Form} from "antd";
import Addition from "../item/addition/Addition";
import Multiplication from "../item/multiplication/Multiplication";
import SaveButton from "../save-button/SaveButton";
import Item from "../item/Item";

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

const AddBlock = styled.div`
  width: 350px;
  height: 100%;
  border: 3px dashed #f1f1f1;
  color: #ccc;
  display: inline-block;
  font-size: 135px;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  
  :hover{
    border-color: ${props => props.theme.color_primary};
    color: ${props => props.theme.color_primary};
  }
  
    
  .container{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .anticon{
      margin-bottom: 1rem;
    }
  
    .text{
     font-size: 20px;
    }
  }
`;

interface BasicProps {
    setupSetting: { control_mode: string, type_task: string };
}

const Basic: React.FC<BasicProps> = ({setupSetting}) => {
    const [form] = Form.useForm();
    const [items, setItems] = useState<any[]>([]);

    const onClickHandler = () => {
        setItems((prevState) => [...prevState, true])
    };

    return <BasicWrapper>
        <Form form={form}>
            <ScrollWrapper>
                {
                    items.map((item: any, key) =>
                        <Item times={key} key={key}>
                            {
                                setupSetting.control_mode === 'addition' ?
                                    <Addition columnKey={key} rowKey={key} tableKey={key}/> :
                                    <Multiplication columnKey={key} rowKey={key} tableKey={key}
                                                    controlMode={setupSetting.control_mode}/>
                            }
                        </Item>
                    )
                }
                <AddBlock onClick={onClickHandler}>
                    <div className="container">
                        <PlusCircleOutlined/>
                        <span className="text">Добавить</span>
                    </div>
                </AddBlock>
            </ScrollWrapper>
            <SaveButton form={form} setupSetting={setupSetting}/>
        </Form>
    </BasicWrapper>;
};

export default Basic;
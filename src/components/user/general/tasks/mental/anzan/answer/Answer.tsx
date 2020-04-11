import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import {useSelector} from "react-redux";
import Double from "./double-answer/Double";
import Basic from "./basic-answer/Basic";
import styled from "styled-components";

const RowWrapper = styled(Row)`
  height: 100%;
`;

const Answer:React.FC<FormComponentProps> = ({form}) => {
    const {game} = useSelector((state: any) => state);
    const {setting} = game;

    return <RowWrapper  justify="center" align="middle" gutter={15}>
        {setting.anzan === 'double' ? <Double form={form}/> : <Basic form={form}/>}
    </RowWrapper>;
};

export default Form.create<FormComponentProps>()(Answer);

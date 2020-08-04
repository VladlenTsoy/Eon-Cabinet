import React from 'react';
import {Col, Row} from "antd";
import styled from "styled-components";
import ConfigItem from "./config-item/ConfigItem";
import TimeItem from "./time-item/TimeItem";
import ModeItem from "./mode-item/ModeItem";
import TypeItem from "./type-item/TypeItem";
import TitleItem from "./title-item/TitleItem";

const DescriptionWrapper = styled.div`
  text-align: center;
  padding: 1rem;
  border: 1px dashed ${props => props.theme.light_color_border};
`;

interface FormHeaderProps {
    data: any;
    description: string;
    onChangeHandler: any;
}

const FormItems: React.FC<FormHeaderProps> = (
    {
        data,
        description,
        onChangeHandler,
    }
) => {
    return <>
        <TypeItem typeTasks={data.typeTasks}/>
        <ModeItem modes={data.modes}/>
        <Row gutter={15}>
            <Col sm={12} xs={24}>
                <TitleItem titles={data.titles} onChangeHandler={onChangeHandler}/>
            </Col>
            <Col sm={12} xs={24}>
                <TimeItem typeTask={data.typeTask}/>
            </Col>
        </Row>
        <DescriptionWrapper>
            {description}
        </DescriptionWrapper>
        <ConfigItem typeTask={data.typeTask} mode={data.mode}/>
    </>;
};

export default React.memo(FormItems);
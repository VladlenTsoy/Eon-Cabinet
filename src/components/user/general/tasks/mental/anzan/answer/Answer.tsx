import React from 'react';
import {Row} from "antd";
import {useSelector} from "react-redux";
import Double from "./double-answer/Double";
import Basic from "./basic-answer/Basic";
import styled from "styled-components";

const RowWrapper = styled(Row)`
  height: 100%;
`;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting} = game;

    return <RowWrapper justify="center" align="middle" gutter={15}>
        {setting.anzan === 'double' ? <Double/> : <Basic/>}
    </RowWrapper>;
};

export default Answer;

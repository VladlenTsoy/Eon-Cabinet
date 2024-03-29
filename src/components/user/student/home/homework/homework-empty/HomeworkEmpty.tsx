import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import {Button, Empty} from "antd";
import {useAppContext} from "store/context/use-app-context";
import {DescriptionTitle} from "../../../../../../lib";
import styled from "styled-components";

const EmptyWrapper = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  width: 100%;
  // border: 2px dashed ${props => props.theme.light_color_border};
  border-radius: 10px;
`;

interface HomeworkEmptyProps {
    fetch: () => void;
}

const HomeworkEmpty: React.FC<HomeworkEmptyProps> = ({fetch}) => {
    const {language} = useAppContext();
    const updateHandler = () => fetch();

    return (
        <EmptyWrapper className="animated bounceIn">
            <Empty
                description={
                    <>
                        <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                        <span>{language.student.no_homework}</span>
                    </>
                }
            >
                <Button type="ghost" size="large" onClick={updateHandler} icon={<RedoOutlined />}>
                    {language.student.refresh}
                </Button>
            </Empty>
        </EmptyWrapper>
    );
};

export default React.memo(HomeworkEmpty);
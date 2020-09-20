import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import {Button, Empty} from "antd";
import {DescriptionTitle} from "../../../../../../../lib/ui";
import styled from "styled-components";
import {useLanguage} from "../../../../../../../hooks/use-language";

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

// TODO - language
const HomeworkEmpty: React.FC<HomeworkEmptyProps> = ({fetch}) => {
    // const {language} = useLanguage();
    const updateHandler = () => fetch();

    return (
        <EmptyWrapper className="animated bounceIn">
            <Empty
                description={
                    <>
                        {/*<DescriptionTitle>{language.common.empty}</DescriptionTitle>*/}
                        {/*<span>{language.student.no_homework}</span>*/}
                    </>
                }
            >
                <Button type="ghost" size="large" onClick={updateHandler} icon={<RedoOutlined />}>
                    {/*{language.student.refresh}*/}
                </Button>
            </Empty>
        </EmptyWrapper>
    );
};

export default React.memo(HomeworkEmpty);
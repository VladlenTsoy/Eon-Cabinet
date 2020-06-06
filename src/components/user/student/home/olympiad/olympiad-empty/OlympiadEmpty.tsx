import React from "react";
import styled from "styled-components";
import {ButtonLink} from "lib";
import {DescriptionTitle} from "../../../../../../lib";
import {Empty} from "antd";
import {useAppContext} from "store/context/use-app-context";
import {TrophyOutlined} from "@ant-design/icons";

const EmptyWrapper = styled.div`
  padding: 2rem 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px dashed ${props => props.theme.light_color_border}
`;

const OlympiadEmpty = () => {
    const {language} = useAppContext();

    return <EmptyWrapper className="animated bounceIn">
        <Empty
            description={
                <>
                    <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                    <span>{language.student.no_current_olympiads}</span>
                </>
            }
        >
            <ButtonLink to="/olympiad" type="ghost" icon={<TrophyOutlined/>} size="large">
                {language.student.open_the_list_of_olympiads}
            </ButtonLink>
        </Empty>
    </EmptyWrapper>;
};

export default React.memo(OlympiadEmpty);
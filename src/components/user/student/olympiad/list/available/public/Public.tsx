import React from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import { RedoOutlined } from '@ant-design/icons';
import {Button, Empty} from "antd";
import {LoadingBlock} from "lib";
import {DescriptionTitle} from "lib";
import styled from "styled-components";
import CardPublic from "./card/CardPublic";
import {useAppContext} from "store/context/use-app-context";

const PublicWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 992px) {
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Public: React.FC = () => {
    const {language} = useAppContext();
    const [loading, olympiads, , fetch] = useApiUserGeneral({url: '/student/olympiads/public/available/paginate'});

    const callback = () => {
        fetch();
    };

    if (loading)
        return <LoadingBlock maxHeight="250px"/>;

    if (!olympiads || !olympiads.data || !olympiads.data.length)
        return (
            <Empty
                description={
                    <>
                        <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                        <span>Нет доступных олимпиад.</span>
                    </>
                }
            >
                <Button type="ghost" size="large" onClick={callback} icon={<RedoOutlined />}>
                    {language.student.refresh}
                </Button>
            </Empty>
        );

    return <PublicWrapper>
        {olympiads.data.map((olympiad: any, key: number) =>
            <CardPublic
                key={key}
                olympiad={olympiad}
                callback={callback}
            />
        )}
    </PublicWrapper>;
};

export default Public;
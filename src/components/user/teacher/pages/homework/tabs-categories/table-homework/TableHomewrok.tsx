import React from 'react';
import {LoadingBlock} from "lib";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import styled from "styled-components";
import CardHomework from "./card-homework/CardHomework";

interface TableHomeworkProps {
    discipline_id: number;
    category_id: number;
}

const ListStyled = styled.div`
  display: grid;
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 992px) {
    gap: 1rem;  
  }
`;

const TableHomework: React.FC<TableHomeworkProps> = ({discipline_id, category_id}) => {
    const [loading, homework,, fetch] = useApiUserGeneral({url: `/teacher/homework/${discipline_id}/${category_id}`});

    if (loading)
        return <LoadingBlock/>;

    return <ListStyled>
        {homework.data.map((val: any, key: number) =>
            <CardHomework homework={val} fetch={fetch} key={key}/>
        )}
    </ListStyled>;
};

export default TableHomework;
import React from 'react';
import styled from "styled-components";

const TdWrapper = styled.td`
  font-size: 40px;
  
  @media (max-width: 576px) {
    font-size: 25px;
  }
`;

interface ListProps {
    table: any[];
}

const List: React.FC<ListProps> = ({table}) => {
    return <tbody>
    {
        table.map((total: any, key) =>
            <tr key={key}>
                <td className="not-border numbering">
                    <span>{key + 1}</span>
                </td>
                {
                    total.map((val: any, key: number) =>
                        <TdWrapper key={key}>
                            {val}
                        </TdWrapper>
                    )
                }
            </tr>
        )
    }
    </tbody>;
};

export default List;
import React from 'react';
import styled from "styled-components";
import {chunk} from "lodash";
import {useSelector} from "react-redux";
import {Input} from "antd";

const TdWrapper = styled.td`
  font-size: 40px;
  
  @media (max-width: 576px) {
    font-size: 25px;
  }
  
  &.success{
    color: ${props => props.theme.color_success};
  }
  
  &.danger{
    color: ${props => props.theme.color_danger};
  }
`;

interface ListTableProps {
    form: any;
    column: number;
    outputExercise: (exercise: any) => string;
}

const ListTableLayout: React.FC<ListTableProps> = (
    {
        form,
        column,
        outputExercise
    }
) => {
    const {game} = useSelector((state: any) => state);
    const {totals, status} = game;

    const {getFieldDecorator} = form;
    let itemCount = 0;

    return <tbody>
    {status === 'intermediate' ?
        chunk(totals, column).map((total: any, key) =>
            [
                <tr key={key}>
                    <td className="not-border numbering">
                        <span>{key + 1}</span>
                    </td>
                    {total.map((val: any, key: number) =>
                        <TdWrapper key={key}>
                            {outputExercise(val)}
                        </TdWrapper>
                    )}
                </tr>,
                <tr key={`user-${key}`}>
                    <td className="not-border numbering">
                        <span>{key + 1}</span>
                    </td>
                    {total.map((val: any, key: number) =>
                        <TdWrapper key={key} className={val.result ? 'success' : 'danger'}>
                            {val.user || 'Пусто'}
                        </TdWrapper>
                    )}
                </tr>
            ]
        ) :
        chunk(totals, column).map((total: any, key) =>
            <tr key={key}>
                <td className="not-border numbering">
                    <span>{key + 1}</span>
                </td>
                {status === 'answer' ?
                    total.map((val: any, key: number) =>
                        <td key={key}>
                            {getFieldDecorator(`answer[${itemCount++}]`)(
                                <Input
                                    size="large"
                                    placeholder="Ответ"
                                    autoComplete="off"
                                    autoFocus={itemCount === 1}
                                />
                            )}
                        </td>
                    ) :
                    total.map((val: any, key: number) =>
                        <TdWrapper key={key}>
                            {outputExercise(val)}
                        </TdWrapper>
                    )}
            </tr>
        )}
    </tbody>;
};

export default ListTableLayout;
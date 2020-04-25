import React from 'react';
import {Card} from "lib";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import HeaderTable from "../../../../../mental/anzan/application/list/table/header-table/HeaderTable";
import styled from "styled-components";
import {TableWrapper} from "./table/TableExercise";
import {gameChangeStats, gameChangeStatus} from "../../../../../../../../../store/game/actions";
import {useDispatch, useSelector} from "react-redux";
import ListTableLayout from "./table/ListTable.layout";
import TimerBlock from "../../timer/Timer";
import {useScreenWindow} from "../../../../../../../../../effects/use-screen-window.effect";
import {totalsChange} from "../../../../../../../../../store/tasks/totals/action";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

const TableCustom = styled(TableWrapper)`
  user-select: none;
  width: 100%;
  margin-bottom: 0.5rem;
  
  tbody{
    tr:hover{
      background: ${props => props.theme.color_border};
    }
  }
`;

type CardListProps = FormComponentProps & {
    column: number;
    timeIsRunningOut: () => void;
    checkResult: (total: any, answer: string) => boolean;
    outputExercise: (exercise: any) => string;
}

const CardListLayout: React.FC<CardListProps> = (
    {
        form,
        column,
        timeIsRunningOut,
        checkResult,
        outputExercise,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const {totals, status, setting} = game;
    const dispatch = useDispatch();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const isStart = status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh';

    const handlerSubmit = (e: any) => {
        e.preventDefault();

        if (isStart)
            return Modal.confirm({
                title: "У вас еще осталось время, Вы уверены что хотите перейти к ответам?",
                onOk: () => {
                    return dispatch(gameChangeStatus('answer'));
                }
            });

        if (status === 'answer')
            return form.validateFields(async (err: any, values: any) => {
                let _totals = totals.map((total: any, key: number) => ({
                    ...total,
                    user: values.answer[key],
                    result: checkResult(total, values.answer[key])
                }));
                dispatch(totalsChange(_totals));
                dispatch(gameChangeStats({
                    all: _totals.length,
                    success: _totals.filter((val: any) => val.result).length
                }));
                dispatch(gameChangeStatus('intermediate'));
            });

        if (status === 'intermediate')
            return dispatch(gameChangeStatus('result'));
    };

    return <>
        {
            isStart ?
                <TimerBlock
                    time={setting.time}
                /> : null
        }
        <Card>
            <Form onSubmit={handlerSubmit}>
                <ScrollWrapper>
                    <TableCustom>
                        <HeaderTable
                            column={isBreakpoint ? 2 : column}
                            tableKey={0}
                            leftNumbering
                        />
                        <ListTableLayout
                            form={form}
                            column={isBreakpoint ? 2 : column}
                            outputExercise={outputExercise}
                        />
                    </TableCustom>
                </ScrollWrapper>
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    icon={<ArrowRightOutlined />}
                >
                    Далее
                </Button>
            </Form>
        </Card>
    </>;
};

export default Form.create<CardListProps>()(CardListLayout);
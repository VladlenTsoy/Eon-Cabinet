import React from 'react';
import {useDispatch} from "react-redux";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from "antd";
import { gameChangeStatus } from "../../../../../../../../store/game/actions";
import CardListLayout from "../../../../layouts/application/list/card-list/CardList.layout";


const ListApplication: React.FC = () => {
    const dispatch = useDispatch();

    const checkResult = (total: any, answer: string): boolean =>
        Number(total.exercise) === Number(answer);

    const outputExercise = (total: any) =>
        total.exercise;

    const timeIsRunningOut = () => {
        Modal.destroyAll();
        document.onkeyup = null;
        return Modal.warning({
            title: 'Время закончилось!',
            // content: '',
            onOk() {
                dispatch(gameChangeStatus('answer'));
            }
        });
    };

    return <CardListLayout
        column={10}
        timeIsRunningOut={timeIsRunningOut}
        checkResult={checkResult}
        outputExercise={outputExercise}
    />;
};

export default Form.create()(ListApplication);
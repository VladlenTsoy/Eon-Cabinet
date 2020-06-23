import React, {useEffect} from 'react';
import {Tag} from "antd";
import {ButtonLink, Spin, Card} from "../../../../../../../../lib";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/reducers/teacher/olympiad/olympiadSlice";
import {fetchFutureOlympiads} from "../../../../../../../../store/reducers/teacher/olympiad/fetchFutureOlympiads";

const Futures: React.FC = () => {
    const {future} = useSelector(olympiadSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchFutureOlympiads());
        return () => {
            promise.abort();
        }
    } , [dispatch]);

    return <Spin spinning={future.loading} tip="Загрузка...">
        {future.data.map((olympiad) =>
            <Card key={olympiad.id}>
                <p>{olympiad.title}</p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Дата начало: {olympiad.current_step.start_at}</p>
                <p>Этапов : <span>{olympiad.steps_count}</span></p>
                <ButtonLink
                    block
                    type="default"
                    to={`olympiad/${olympiad.id}`}
                >
                    Подробнее
                </ButtonLink>
            </Card>
        )}
    </Spin>;
};

export default Futures;
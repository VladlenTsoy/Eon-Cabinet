import React, {useEffect} from 'react';
import {Tag} from "antd";
import {ButtonLink, Spin} from "../../../../../../../../lib";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/reducers/teacher/olympiad/olympiadSlice";
import {fetchPastOlympiads} from "../../../../../../../../store/reducers/teacher/olympiad/fetchPastOlympiads";

const Pasts: React.FC = () => {
    const {past} = useSelector(olympiadSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchPastOlympiads());
        return () => {
            promise.abort();
        }
    } , [dispatch]);

    return <Spin spinning={past.loading} tip="Загрузка...">
        {past.data.map((olympiad, key) =>
            <div key={key}>
                <p>{olympiad.title}</p>
                <p>Дата завершения: {olympiad.last_step.end_at}</p>
                <p>Участвовало: {olympiad.students_count}</p>
                <p>Чемпион: </p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Этапов : <span>{olympiad.steps_count}</span></p>
                <ButtonLink
                    block
                    type="default"
                    to={`olympiad/${olympiad.id}`}
                >
                    Подробнее
                </ButtonLink>
            </div>
        )}
    </Spin>;
};

export default Pasts;
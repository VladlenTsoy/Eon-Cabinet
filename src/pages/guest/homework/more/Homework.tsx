import React from 'react';
import {useApiUserGeneral} from "../../../../hooks/use-api-user-general.effect";
import {LoadingBlock} from "../../../../lib/ui";
import Error from "../../../user/student/pages/homework/more/error/Error";
import Info from "./info/Info";
import Tasks from "./tasks/Tasks";
import {useParams} from "react-router-dom";


const Homework = () => {
    const {id} = useParams();
    const [loading, homework, error] = useApiUserGeneral({url: `guest/homework/${id}`, access: 'guest'});

    // Загрузка
    if (loading) return <LoadingBlock/>;
    // Если ошибка
    if (error) return <Error error={error}/>;

    return <>
        <Info homework={homework}/>
        <Tasks id={homework.id}/>
    </>;
};

export default Homework;
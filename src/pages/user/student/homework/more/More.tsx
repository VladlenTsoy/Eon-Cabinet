import React from "react";
import Tasks from "./tasks/Tasks";
import Info from "./info/Info";
import {useChangeActionNavbar} from "../../../../../hooks/use-change-action-navbar.effect";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";
import {useChangeTitle} from "../../../../../hooks/use-change-title.effect";
import {LoadingBlock} from "lib/components";
import Error from "./error/Error";

interface MoreHomeworkProps {
    match: any;
}

const More: React.FC<MoreHomeworkProps> = ({match}) => {
    const id = match.params.id;
    const [loading, homework, error] = useApiUserGeneral({url: `student/homework/send/${id}`});

    useChangeTitle({title: loading ? 'Загрузка...' : error ? 'Ошибка!' : `Д.З. Уровень №${homework.level}`});
    useChangeActionNavbar({action: '/homework'});

    // Загрузка
    if (loading) return <LoadingBlock/>;
    // Если ошибка
    if (error) return <Error error={error}/>;

    return <>
        <Info homework={homework}/>
        <Tasks id={id}/>
    </>;
};

export default More;
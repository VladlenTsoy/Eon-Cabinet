import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {clearGame, gameSelector, changeSetting} from "store/common/game/gameSplice";
import {LoadingBlock} from "lib/ui";
import {useChangeActionNavbar} from "../../../../hooks/old/use-change-action-navbar.effect";
import TasksSwitch from "./Tasks.switch";

interface TasksProps {
    urlBack: string;
    urlRoute: string;
}

const TasksRoutes: React.FC<TasksProps> = ({urlBack, urlRoute}) => {
    const history = useHistory();
    const {setting} = useSelector(gameSelector);
    const dispatch = useDispatch();

    if (!setting) history.replace(urlBack);

    useChangeActionNavbar({action: 'cancel'});

    // Button cancel
    useEffect(() => {
        return () => {
            dispatch(changeSetting(null));
            dispatch(clearGame());
        }
    }, [dispatch]);

    return <React.Suspense fallback={<LoadingBlock title="Загрузка упражнения..."/>}>
        <Router>
            <Switch>
                {/* Ментальная арифметика */}
                {/* Мнемотехника */}
                <Route path={`${urlRoute}/:disciplineId/:taskId`} children={<TasksSwitch/>}/>
            </Switch>
        </Router>
    </React.Suspense>;
};

export default React.memo(TasksRoutes);
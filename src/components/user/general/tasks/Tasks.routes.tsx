import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {clearGame} from "store/reducers/common/game/gameSplice";
import {totalsChange} from "store/reducers/common/tasks/totals/action";
import {settingChange} from "store/reducers/common/tasks/setting/action";
import {settingAnzan} from "store/reducers/common/tasks/setting/reducer";
import {LoadingBlock} from "lib";
import {useChangeActionNavbar} from "../../../../effects/use-change-action-navbar.effect";
import TasksSwitch from "./Tasks.switch";

interface TasksProps {
    urlBack: string;
    urlRoute: string;
}

const TasksRoutes: React.FC<TasksProps> = ({urlBack, urlRoute}) => {
    const history = useHistory();
    const setting = useSelector(settingAnzan);
    const dispatch = useDispatch();

    if (!setting) history.replace(urlBack);

    useChangeActionNavbar({action: 'cancel'});

    // Button cancel
    useEffect(() => {
        return () => {
            dispatch(settingChange(null));
            dispatch(totalsChange([]));
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
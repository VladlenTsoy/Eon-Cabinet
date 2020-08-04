import React from 'react';
import {Provider} from "react-redux";
import {store} from "../../store/reducers/student/store";
import {Route, Switch} from "react-router-dom";
import Homework from "./homework/Homework";
import NotFound from "./errors/404";
import {Layout} from "antd";
import styled from "styled-components";
import TasksHomework from "./tasks/Tasks";

const LayoutStyled = styled(Layout)`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
`;

const Guest = () => {
    return <LayoutStyled>
        <Provider store={store}>
            <Switch>
                <Route exact path="/guest/homework/:id" component={Homework}/>
                <Route path="/guest/homework/:homeworkId/:id/:disciplineId/:taskId" component={TasksHomework}/>
                <Route exact path="***" component={NotFound}/>
            </Switch>
        </Provider>
    </LayoutStyled>;
};

export default Guest;
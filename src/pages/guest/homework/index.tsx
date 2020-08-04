import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homework from "./more/Homework";
import NotFound from "../../errors/404";
import {Layout} from "antd";
import styled from "styled-components";
import TasksHomework from "./tasks/Tasks";

const LayoutStyled = styled(Layout)`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
`;

const Index = () => {
    return <LayoutStyled>
        <Switch>
            <Route exact path="/guest/homework/:id" component={Homework}/>
            <Route path="/guest/homework/:homeworkId/:id/:disciplineId/:taskId" component={TasksHomework}/>
            <Route exact path="***" component={NotFound}/>
        </Switch>
    </LayoutStyled>;
};

export default Index;
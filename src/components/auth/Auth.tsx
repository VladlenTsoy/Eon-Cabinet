import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login";
import ForgotPassword from "./Forgot";
import {Col, Row} from "antd";
import {RowProps} from "antd/es/row";
import styled from "styled-components";
import bgAuthWrapper from '../../assets/images/pages/login_page_bg.svg';

const AuthWrapper:React.FC<RowProps> = styled(Row)<RowProps>`
  height: 100vh;
  background: url(${bgAuthWrapper}) no-repeat top,linear-gradient(-20deg,#2b5876,#4e4376);
`;

const Auth = () =>
    <AuthWrapper justify="center" align="middle">
        <Col xl={8} lg={7} md={10} sm={12} xs={22}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route component={Login}/>
                </Switch>
            </Router>
        </Col>
    </AuthWrapper>;

export default Auth;
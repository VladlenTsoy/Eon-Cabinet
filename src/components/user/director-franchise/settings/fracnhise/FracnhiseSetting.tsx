import React, {useCallback, useEffect, useState} from 'react';
import {Col, Row} from "antd";
import FranchiseSettingFormData from "./FracnhiseSettingFormData";
import FranchiseSettingTheme from "./FranchiseSettingTheme";
import {useSelector} from "react-redux";
import {LoadingBlock} from "lib";


const FranchiseSetting: React.FC<any> = () => {
    const {api} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(true);
    const [franchise, setFranchise] = useState();

    const fetch = useCallback(async () => {
        const response = await api.user_general.get('/director-franchise/franchise');
        setFranchise(response.data);
    }, [api.user_general]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetch();
            setLoading(false);
        })();
    }, [fetch]);

    const updateFranchise = async (data: any) => {
        const response = await api.user_general.post(`/director-franchise/franchise/${franchise.id}`, data);
        setFranchise(response.data);
    };

    return loading ?
        <LoadingBlock/> :
        <Row  gutter={15} align="middle">
            <Col xl={16}>
                <FranchiseSettingFormData franchise={franchise} update={updateFranchise}/>
            </Col>
            <Col xl={8}>
                <FranchiseSettingTheme franchise={franchise} update={updateFranchise}/>
            </Col>
        </Row>;
};

export default FranchiseSetting;
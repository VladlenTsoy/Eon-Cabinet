import React, {useCallback, useEffect, useState} from 'react';
import {Col, Row} from "antd";
import FranchiseSettingFormData from "./FracnhiseSettingFormData";
import FranchiseSettingTheme from "./FranchiseSettingTheme";
import {LoadingBlock} from "lib/components";
import {useAppContext} from "../../../../../store/context/use-app-context";


const FranchiseSetting: React.FC<any> = () => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [franchise, setFranchise] = useState();

    const fetch = useCallback(async () => {
        const response = await api.user.get('/director-franchise/franchise');
        setFranchise(response.data);
    }, [api.user]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetch();
            setLoading(false);
        })();
    }, [fetch]);

    const updateFranchise = async (data: any) => {
        const response = await api.user.post(`/director-franchise/franchise/${franchise.id}`, data);
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
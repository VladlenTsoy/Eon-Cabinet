import React, {useCallback, useEffect, useState} from 'react';
import {Card, LoadingBlock} from "lib/components";
import {Col, Row} from "antd";
import FormulTitleSettingAnzan from "./FormulTitleSettingAnzan";
import {useAppContext} from "../../../../../store/context/use-app-context";

const FormulTitleSetting: React.FC<any> = () => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [defaultTypes, setDefaultTypes] = useState<any>([]);

    const fetch = useCallback(async () => {
        const response = await api.user.get(`director-franchise/language/default/formul/anzan`);
        setDefaultTypes(Object.entries(response.data));
    }, [api.user]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetch();
            setLoading(false);
        })();
    }, [fetch]);

    return <Row  justify="center" gutter={15}>
        <Col xl={12}>
            <Card>
                <Card.Title level={3} title="Название формул (Анзан)"/>
                {loading ? <LoadingBlock/> : <FormulTitleSettingAnzan defaultTypes={defaultTypes}/>}
            </Card>
        </Col>
    </Row>;
};

export default FormulTitleSetting;
import React, {useCallback, useEffect, useState} from 'react';
import {Navigation, NavigationButton} from "../../../../../lib/components";
import CenterTable from "./center-table/CenterTable";
import EditorCenterButton from "./center-table/EditorCenterButton";
import {useChangeActionNavbar} from "../../../../../hooks/use-change-action-navbar.effect";
import {useChangeTitle} from "../../../../../hooks/use-change-title.effect";
import {PlusOutlined} from "@ant-design/icons";

// TODO - api
const Franchise: React.FC<any> = ({match}) => {
    const [loading, setLoading] = useState(false);
    const [franchise, setFranchise] = useState();

    useChangeTitle({title: franchise ? `Франшиза: ${franchise.title}` : 'Франшиза: Загрузка...'});
    useChangeActionNavbar({action: 'back'});

    const fetch = useCallback(async () => {
        // const response = await api.user.get(`admin/franchise/${match.params.id}`);
        // setFranchise(response.data);
    }, [match.params.id]);

    useEffect(() => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    const fetchCenters = () => {
        setLoading(true);
    };

    return <>
        <Navigation>
            <EditorCenterButton title="Создать центр" franchise_id={match.params.id} fetch={fetchCenters}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать центр
                </NavigationButton>
            </EditorCenterButton>
        </Navigation>
        {/*<Card>*/}
        {/*<Card.Title level={3} title="Информация"/>*/}
        {/*</Card>*/}
        <CenterTable id={match.params.id} fetch={fetchCenters} loader={loading}/>
    </>
};

export default Franchise;
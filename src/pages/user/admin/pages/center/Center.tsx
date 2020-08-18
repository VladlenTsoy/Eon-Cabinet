import React, {useCallback, useEffect, useState} from 'react';
import {Navigation, NavigationButton} from "../../../../../lib/components";
import EditorCenterButton from "./EditorTeacherButton";
import TeachersTable from "./teachers-table/TeachersTable";
import {useChangeActionNavbar} from "../../../../../hooks/use-change-action-navbar.effect";
import {useChangeTitle} from "../../../../../hooks/use-change-title.effect";
import {PlusOutlined} from "@ant-design/icons";

// TODO - api
const Center: React.FC<any> = ({match}) => {
    const [center, setCenter] = useState<any>();
    const [loading, setLoading] = useState(true);

    const fetch = () => {
        setLoading(true);
    };

    useChangeTitle({title: center?.title ? `Центр: ${center.title}` : 'Центр: Загрузка...'});
    useChangeActionNavbar({action: 'back'});

    const fetchCenters = useCallback(async () => {
        // const response = await api.user.get(`admin/center/${match.params.center_id}`);
        // setCenter(response.data);
    }, [match.params.center_id]);

    useEffect(() => {
        (async () => {
            await fetchCenters();
        })();
    }, [fetchCenters]);

    return <>
        <Navigation>
            <EditorCenterButton
                title="Создать учителя"
                franchise_id={match.params.franchise_id}
                center_id={match.params.center_id}
                fetch={fetch}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать учителя
                </NavigationButton>
            </EditorCenterButton>
        </Navigation>
        <TeachersTable
            centerId={match.params.center_id}
            franchiseId={match.params.franchise_id}
            fetch={fetch}
            setLoader={setLoading}
            loader={loading}
        />
    </>
};

export default Center;
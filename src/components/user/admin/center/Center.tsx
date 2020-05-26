import React, {useCallback, useEffect, useState} from 'react';
import {Navigation, NavigationButton} from "../../../../layouts/components";
import EditorCenterButton from "./EditorTeacherButton";
import TeachersTable from "./teachers-table/TeachersTable";
import {useChangeActionNavbar} from "../../../../effects/use-change-action-navbar.effect";
import {useChangeTitle} from "../../../../effects/use-change-title.effect";
import {useAppContext} from "../../../../store/context/use-app-context";

const Center: React.FC<any> = ({match}) => {
    const {api} = useAppContext();
    const [center, setCenter] = useState();
    const [loading, setLoading] = useState(true);

    const fetch = () => {
        setLoading(true);
    };

    useChangeTitle({title: center ? `Центр: ${center!.title}` : 'Центр: Загрузка...'});
    useChangeActionNavbar({action: 'back'});

    const fetchCenters = useCallback(async () => {
        const response = await api.user.get(`admin/center/${match.params.center_id}`);
        setCenter(response.data);
    }, [match.params.center_id, api.user]);

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
                <NavigationButton type="primary" icon="plus">
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
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {appChangeActionNavbar, appChangeTitleNavbar} from "../../../../store/app/actions";
import {Navigation, NavigationButton} from "../../../../layouts/components";
import EditorCenterButton from "./EditorTeacherButton";
import TeachersTable from "./teachers-table/TeachersTable";

const Center: React.FC<any> = ({match}) => {
    const {api} = useSelector((state: any) => (state));
    const dispatch = useDispatch();
    const [center, setCenter] = useState();
    const [loading, setLoading] = useState(true);

    const fetch = () => {
        setLoading(true);
    };

    useEffect(() => {
        dispatch(appChangeTitleNavbar(center ? `Центр: ${center!.title}` : 'Центр: Загрузка...'));
    }, [center, dispatch]);

    useEffect(() => {
        dispatch(appChangeActionNavbar('back'));
        return () => {
            dispatch(appChangeActionNavbar(null));
        };
    }, [dispatch]);

    const fetchCenters = useCallback(async () => {
        const response = await api.user_general.get(`admin/center/${match.params.center_id}`);
        setCenter(response.data);
    }, [match.params.center_id, api.user_general]);

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
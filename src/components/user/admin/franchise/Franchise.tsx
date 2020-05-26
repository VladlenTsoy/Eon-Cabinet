import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {appChangeTitleNavbar} from "../../../../store/reducers/common/app/actions";
import {Navigation, NavigationButton} from "../../../../layouts/components";
import CenterTable from "./center-table/CenterTable";
import EditorCenterButton from "./center-table/EditorCenterButton";
import {useChangeActionNavbar} from "../../../../effects/use-change-action-navbar.effect";

const Franchise: React.FC<any> = ({match}) => {
    const {api} = useSelector((state: any) => (state));
    const [loading, setLoading] = useState(false);
    const [franchise, setFranchise] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appChangeTitleNavbar(franchise ? `Франшиза: ${franchise.title}` : 'Франшиза: Загрузка...'));
    }, [franchise, dispatch]);

    useChangeActionNavbar({action: 'back'});

    const fetch = useCallback(async () => {
        const response = await api.user.get(`admin/franchise/${match.params.id}`);
        setFranchise(response.data);
    }, [api.user, match.params.id]);

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
                <NavigationButton type="primary" icon="plus">
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
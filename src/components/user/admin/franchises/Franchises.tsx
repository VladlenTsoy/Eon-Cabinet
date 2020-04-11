import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../layouts/components";
import {Link} from "react-router-dom";
import FranchiseTable from "./franchise-table/FranchiseTable";
import EditorFranchiseButton from "./EditorFranchiseButton";


const Franchises: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const fetchFranchises = async () => {
        setLoading(true);
    };

    return <>
        <Navigation>
            <EditorFranchiseButton fetch={fetchFranchises} title="Создать франшизу">
                <NavigationButton type="primary" icon="plus">
                    Создать франшизу
                </NavigationButton>
            </EditorFranchiseButton>
            <Link to="/franchises/statistic">
                <NavigationButton type="primary" icon="bar-chart">
                    Статистика
                </NavigationButton>
            </Link>
        </Navigation>
        <FranchiseTable fetch={fetchFranchises} loader={loading} setLoader={setLoading}/>
    </>;
};

export default Franchises;
import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../lib/components";
import {Link} from "react-router-dom";
import FranchiseTable from "./franchise-table/FranchiseTable";
import EditorFranchiseButton from "./EditorFranchiseButton";
import {PlusOutlined, BarChartOutlined} from "@ant-design/icons";


const Franchises: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const fetchFranchises = async () => {
        setLoading(true);
    };

    return <>
        <Navigation>
            <EditorFranchiseButton fetch={fetchFranchises} title="Создать франшизу">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать франшизу
                </NavigationButton>
            </EditorFranchiseButton>
            <Link to="/franchises/statistic">
                <NavigationButton type="primary" icon={<BarChartOutlined/>}>
                    Статистика
                </NavigationButton>
            </Link>
        </Navigation>
        <FranchiseTable fetch={fetchFranchises} loader={loading} setLoader={setLoading}/>
    </>;
};

export default Franchises;
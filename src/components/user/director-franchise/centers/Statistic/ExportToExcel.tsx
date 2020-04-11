import React, {useState} from "react";
import {NavigationButton} from "../../../../../layouts/components";
import {useSelector} from "react-redux";

const ExportToExcel: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [loading, setLoading] = useState(false);

    const saveStatistic = async () => {
        setLoading(true);
        const response = await api.user_general(`director-franchise/teachers/export/excel`);
        window.open(response.data.file_url);
        setLoading(false);
    };

    return <NavigationButton type="primary" onClick={saveStatistic} icon="save" loading={loading}>
        Сохранить в Excel
    </NavigationButton>
};

export default ExportToExcel;
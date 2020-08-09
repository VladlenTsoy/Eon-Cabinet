import React, {useState} from "react";
import {NavigationButton} from "../../../../../../lib/components";
import {SaveOutlined} from "@ant-design/icons";

// TODO - api
const ExportToExcel: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const saveStatistic = async () => {
        setLoading(true);
        // const response = await api.user(`director-franchise/teachers/export/excel`);
        // window.open(response.data.file_url);
        setLoading(false);
    };

    return <NavigationButton type="primary" onClick={saveStatistic} icon={<SaveOutlined/>} loading={loading}>
        Сохранить в Excel
    </NavigationButton>
};

export default ExportToExcel;
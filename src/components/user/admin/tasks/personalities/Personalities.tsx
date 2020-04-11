import React, {useState} from "react";
import {Table, Image} from "lib";
import {Navigation, NavigationButton} from "../../../../../layouts/components";
import EditorPersonalityButton from "./EditorPersonalityButton";
import { MenuOutlined } from '@ant-design/icons';
import PersonalityTableDropdown from "./PersonalityTableDropdown";

const Personalities = () => {
    const [loader, setLoader] = useState(false);

    const fetchPersonalities = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Фото',
        dataIndex: 'photo',
        render: (text: any, record: any) =>
            <Image src={record.url_photo} alt={record.full_name} width="50px"/>,
    }, {
        title: 'Имя',
        dataIndex: 'full_name',
        sorter: true,
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) => <PersonalityTableDropdown record={record} fetch={fetchPersonalities}/>,
    }];

    return <>
        <Navigation>
            <EditorPersonalityButton fetch={fetchPersonalities} title="Добавить личность">
                <NavigationButton type="primary" icon="plus">
                    Добавить личность
                </NavigationButton>
            </EditorPersonalityButton>
        </Navigation>
        <Table
            columns={columns}
            url="admin/personalities/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Personalities;

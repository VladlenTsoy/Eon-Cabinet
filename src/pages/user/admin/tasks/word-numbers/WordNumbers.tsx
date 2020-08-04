import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../../lib/components";
import {Table} from "lib/components";
import EditorWordNumberButton from "./EditorWordNumberButton";
import { MenuOutlined } from '@ant-design/icons';
import WordNumberTableDropdown from "./WordNumberTableDropdown";

const WordNumbers = () => {
    const [loader, setLoader] = useState(false);

    const fetchWordNumbers = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Цифра',
        dataIndex: 'number',
        sorter: true,
    },{
        title: 'Слова',
        dataIndex: 'word',
        sorter: true,
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) =>
            <WordNumberTableDropdown record={record} fetch={fetchWordNumbers}/>,
    }];

    return <>
        <Navigation>
            <EditorWordNumberButton fetch={fetchWordNumbers} title="Добавить Цифру-Слово">
                <NavigationButton type="primary" icon="plus">
                    Добавить Цифру-Слово
                </NavigationButton>
            </EditorWordNumberButton>
        </Navigation>
        <Table
            columns={columns}
            url="admin/word-numbers/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default WordNumbers;

import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../../lib";
import {Table} from "lib";
import EditorWordButton from "./EditorWordButton";
import { MenuOutlined } from '@ant-design/icons';
import WordTableDropdown from "./WordTableDropdown";
import {useAppContext} from "../../../../../store/context/use-app-context";

const Words = () => {
    const {language} = useAppContext();
    const [loader, setLoader] = useState(false);

    const fetchWords = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Слова',
        dataIndex: 'word',
        sorter: true,
    }, {
        title: 'Тип',
        dataIndex: 'type',
        sorter: true,
        render: (text: number) => language.common.tasksTraining.wordsList.mode[text]
    }, {
        title: 'Уровень',
        dataIndex: 'level',
        sorter: true,
        render: (text: number) => language.common.tasksTraining.wordsList.type[text]
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) => <WordTableDropdown record={record} fetch={fetchWords}/>,
    }];

    return <>
        <Navigation>
            <EditorWordButton fetch={fetchWords} title="Добавить слово">
                <NavigationButton type="primary" icon="plus">
                    Добавить слово
                </NavigationButton>
            </EditorWordButton>
        </Navigation>
        <Table
            columns={columns}
            url="admin/words/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Words;

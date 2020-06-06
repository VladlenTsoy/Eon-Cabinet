import React, {useState} from "react";
import {Table, Image} from "lib";
import {Navigation, NavigationButton} from "../../../../../lib";
import EditorDigitalPictureButton from "./EditorDigitalPictureButton";
import { MenuOutlined } from '@ant-design/icons';
import DigitalPictureTableDropdown from "./DigitalPictureTableDropdown";

const DigitalPicture = () => {
    const [loader, setLoader] = useState(false);

    const fetchDigitalPictures = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Номер',
        dataIndex: 'number',
        sorter: true,
    }, {
        title: 'Картинка',
        dataIndex: 'url_picture',
        render: (text: any) => <Image src={text} alt="Пусто" width="50px"/>
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) =>
            <DigitalPictureTableDropdown record={record} fetch={fetchDigitalPictures}/>,
    }];

    return <>
        <Navigation>
            <EditorDigitalPictureButton fetch={fetchDigitalPictures} title="Добавить Цифру-Картинку">
                <NavigationButton type="primary" icon="plus">
                    Добавить Цифру-Картинку
                </NavigationButton>
            </EditorDigitalPictureButton>
        </Navigation>
        <Table
            columns={columns}
            url="admin/digital-picture/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default DigitalPicture;

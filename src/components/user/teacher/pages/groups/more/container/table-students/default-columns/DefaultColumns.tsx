import React from 'react';
import ProfileColumn from "./profile/ProfileColumn";
import {useScreenWindow} from "../../../../../../../../../hooks/use-screen-window.effect";

const DefaultColumns = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            fixed: !isBreakpoint,
        },
        {
            title: 'Имя',
            fixed: !isBreakpoint,
            render: (text: any, record: any) =>
                <ProfileColumn student={record}/>,
        },
    ];
};

export default DefaultColumns;
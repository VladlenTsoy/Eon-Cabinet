import React from 'react';
import {Navigation, NavigationButton} from "layouts/components";
import UsingTablePagination from "../../../../../../layouts/components/table-pagination/usingTablePagination";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { DeleteOutlined } from '@ant-design/icons';
import {Switch, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {appChangeCustomAlgorithms, appChangeSpin} from "../../../../../../store/app/actions";
import {setCurrentUserData} from "../../../../../../store/user/actions";

const AlgorithmColumn = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SwitchWrapper = styled.div`
  padding: 1.5rem;
  
  label{
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;

    .ant-switch{
      transform: scale(1.5);
      margin-right: 1.5rem;
    }
  }
`;

const List = () => {
    const {api, user, language} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    const handlerChange = async (state: boolean) => {
        dispatch(appChangeSpin(true));
        const response = await api.user_general.patch(`/${user.id}`, {
            setting: {
                ...user.setting,
                is_custom_algorithms: state
            }
        });
        await dispatch(setCurrentUserData(response.data));
        dispatch(appChangeSpin(false));
    };

    const columns = (fetch: any) => [
        {
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: 'Мод',
            dataIndex: 'mode',
            filters: [
                {text: '+', value: 'plus'},
                {text: '-', value: 'minus'},
                {text: '+ / -', value: 'plus-minus'},
                {text: '×', value: 'multiply'},
                {text: '÷', value: 'divide'},
            ],
            render: (text: any) =>
                language.common.modeNames[text]
        }, {
            title: 'Разряд чисел',
            dataIndex: 'length',
            render: (text: any, record: any) => {
                return record.mode === 'divide' || record.mode === 'multiply' ? language.common.lengthNames[text] : text;
            }
        }, {
            title: 'Режим',
            dataIndex: 'type',
            render: (text: any, record: any) => {
                return language.common.typeNames[record.mode === 'divide' || record.mode === 'multiply' ? 1 : 0][text];
            }
        }, {
            title: 'Под тема',
            dataIndex: 'theme',
            render: (text: any) => {
                return language.common.themeNames[text] || text;
            }
        }, {
            title: 'Алгоритмы',
            dataIndex: 'algorithm',
            render: (text: any, record: any) => {
                return <AlgorithmColumn>{
                    record.mode === 'divide' ?
                        text[1] + ' ÷ ' + text[1] :
                        record.mode === 'multiply' ?
                            text[1] + ' × ' + text[1] :
                            text.join(', ')
                }</AlgorithmColumn>;
            }
        }, {
            render: (text: any, record: any) => {
                const deleteHandler = () => {
                    Modal.confirm({
                        title: 'Вы хотите удалить данный алгоритм?',
                        okType: 'danger',
                        async onOk() {
                            let response = await api.user_general.delete(`/teacher/custom-algorithms/${record.id}`);
                            await fetch();
                            dispatch(appChangeCustomAlgorithms(response.data));
                        }
                    });
                };

                return (
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        shape="circle"
                        ghost
                        onClick={deleteHandler}
                    />
                );
            }
        }
    ];

    return <>
        <Navigation>
            <Link to={`/settings/custom-algorithms/create`}>
                <NavigationButton type="primary" icon="plus">
                    Добавить
                </NavigationButton>
            </Link>
        </Navigation>
        <SwitchWrapper>
            <label>
                <Switch
                    defaultChecked={user.setting.is_custom_algorithms}
                    onChange={handlerChange}
                />
                {user.setting.is_custom_algorithms ? 'Выключить пользовательские алгоритмы' : 'Включить пользовательские алгоритмы'}
            </label>
        </SwitchWrapper>
        <UsingTablePagination
            isCard
            isSearch={false}
            columns={columns}
            url="/teacher/custom-algorithms/table"
        />
    </>;
};

export default List;
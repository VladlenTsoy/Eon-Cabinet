import React, {useEffect, useState} from 'react';
import Addition from "../../item/addition/Addition";
import {Button} from "antd";
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import Multiplication from "../../item/multiplication/Multiplication";

interface TableAdditionProps {
    tableKey: number;
    setupSetting: { control_mode: string, type_task: string };
    tableDeleteHandler: (key: number) => void;
}

const Table: React.FC<TableAdditionProps> = ({tableKey, setupSetting, tableDeleteHandler}) => {
    const [rows, setRows] = useState<number[]>([0]);
    const columns: number[] = Array(6).fill(1);

    const onClickHandler = () =>
        setRows((prevState) => [...prevState, 1]);

    const onDeleteHandler = (_key: number) =>
        setRows((prevState) => prevState.filter((row, key) => key !== _key));

    useEffect(() => {
        if (!rows.length)
            tableDeleteHandler(tableKey)
    }, [rows, tableDeleteHandler]);

    return <tbody>
    {
        rows.map((row, key) =>
            <tr key={key}>
                <td className="not-border">
                    {
                        rows.length === key + 1 ?
                            <Button
                                ghost
                                type="danger"
                                shape="circle-outline"
                                icon={<DeleteOutlined/>}
                                onClick={() => onDeleteHandler(key)}
                            /> : null
                    }
                </td>
                {
                    columns.map((td, tdKey) =>
                        <td key={tdKey}>
                            {
                                setupSetting.control_mode === 'addition' ?
                                    <Addition
                                        tableKey={tableKey}
                                        rowKey={key}
                                        columnKey={tdKey}
                                    /> :
                                    <Multiplication
                                        controlMode={setupSetting.control_mode}
                                        tableKey={tableKey}
                                        rowKey={key}
                                        columnKey={tdKey}
                                    />
                            }
                        </td>
                    )
                }
            </tr>
        )
    }
    <tr>
        <td className="not-border"/>
        <td colSpan={6}>
            <Button type="link" block icon={<PlusOutlined/>} onClick={onClickHandler}>
                Добавить строку
            </Button>
        </td>
    </tr>
    </tbody>;
};

export default Table;
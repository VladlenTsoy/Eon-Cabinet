import React from 'react';
import Addition from "../../layouts/item/addition/Addition";
import Multiplication from "../../layouts/item/multiplication/Multiplication";

interface TableAdditionProps {
    tableKey: number;
    setupSetting: any;
}

const Table: React.FC<TableAdditionProps> = ({setupSetting, tableKey}) => {
    return <tbody>
    {
        Array(setupSetting.rows).fill(1)
            .map((row, key) =>
                <tr key={key}>
                    <td className="not-border numbering">
                        <span>{key + 1}</span>
                    </td>
                    {
                        Array(setupSetting.column).fill(1)
                            .map((td, tdKey) =>
                                <td key={tdKey}>
                                    {
                                        setupSetting.mode === 'plus-minus' ?
                                            <Addition
                                                tableKey={tableKey} rowKey={key} columnKey={tdKey}
                                                setupSetting={setupSetting}
                                            /> :
                                            <Multiplication
                                                mode={setupSetting.mode}
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
    </tbody>;
};

export default Table;
import React from 'react';

interface HeaderTableProps {
    tableKey: number;
    column: number;
    leftNumbering?: boolean;
}

const HeaderTable: React.FC<HeaderTableProps> = ({tableKey, column, leftNumbering}) => {
    //
    const genCharArray = (count: number) => {
        let a = [], q = "A".charCodeAt(0);
        for (let i = q; i < (q + count); ++i)
            a.push(String.fromCharCode(i));
        return a;
    };

    return <thead>
    <tr>
        <th colSpan={20}><b>Таблица №{tableKey + 1}</b></th>
    </tr>
    <tr>
        {leftNumbering ? <th className="not-border"/> : null}
        {genCharArray(column)
            .map((char: string) =>
                <th key={char}><i>{char}</i></th>)
        }
    </tr>
    </thead>;
};

export default React.memo(HeaderTable);
import React from 'react';

interface HeaderProps {
    tableKey: number;
    column: number;
    leftNumbering?: boolean;
}

const Header: React.FC<HeaderProps> = ({tableKey, column, leftNumbering}) => {
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
        {genCharArray(Number(column))
            .map((char: string) =>
                <th key={char}><i>{char}</i></th>)
        }
    </tr>
    </thead>;
};

export default React.memo(Header);
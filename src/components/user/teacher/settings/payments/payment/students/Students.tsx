import React from 'react';
import {CheckWrapper} from "../../layouts/check-wrapper.layout";
import StudentTable from "./student-table/StudentTable";


const Students = () => {
    return <CheckWrapper>
        <thead>
        <tr>
            <th>
                Название
            </th>
            <th>
                Кол-во
            </th>
            <th>
                Стоимость
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Ученики</td>
            <td>45</td>
            <td>450 000 сум</td>
        </tr>
        <tr>
            <td colSpan={3}>
                <StudentTable/>
            </td>
        </tr>
        </tbody>
    </CheckWrapper>;
};

export default Students;
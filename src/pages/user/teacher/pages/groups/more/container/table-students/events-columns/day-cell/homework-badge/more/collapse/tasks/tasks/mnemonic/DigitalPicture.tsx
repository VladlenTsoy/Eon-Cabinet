import React from 'react';
import { TrophyOutlined } from '@ant-design/icons';
import {Avatar} from "lib/ui";

interface DigitalPictureProps {
    totals: any;
}

const DigitalPicture:React.FC<DigitalPictureProps> = ({totals}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Результат</th>
                <th>Ответ ученика</th>
                <th colSpan={2}>Упражнение</th>
            </tr>
            </thead>
            <tbody>
            {
                totals.map((total: any, key: number) =>
                    <tr key={key}>
                        <td>
                            {key + 1}
                        </td>
                        <td>
                            <TrophyOutlined className={`${total.result ? 'warning' : 'secondary'}`} />
                        </td>
                        <td>
                            {total.user.number || 'Пусто'}
                        </td>
                        <td>
                            <Avatar src={total.exercise.url_picture} alt={total.exercise.number}/>
                        </td>
                        <td>
                            {total.exercise.number || 'Пусто'}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default DigitalPicture;
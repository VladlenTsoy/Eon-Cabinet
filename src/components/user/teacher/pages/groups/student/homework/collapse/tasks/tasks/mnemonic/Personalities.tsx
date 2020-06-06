import React from "react";
import { TrophyOutlined } from '@ant-design/icons';
import {UserImage} from "../../../../../../../../../../../lib";

const Personalities = ({totals}: any) => {
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
                            <TrophyOutlined className={`${total.result? 'warning' : 'secondary'}`} />
                        </td>
                        <td>
                            {total.user.full_name ? total.user.full_name : 'Пусто'}
                            {total.user.born ? total.user.born : null}
                            {total.user.die ? total.user.die : null}
                        </td>
                        <td>
                            <UserImage src={total.exercise.url_photo} alt={total.exercise.full_name}/>
                        </td>
                        <td>
                            {total.exercise.full_name ? total.exercise.full_name : 'Пусто'}
                            {total.exercise.born ? total.exercise.born : null}
                            {total.exercise.die ? total.exercise.die : null}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};
export default Personalities;
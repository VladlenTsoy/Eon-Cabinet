import React from "react";
import { TrophyOutlined } from '@ant-design/icons';
import {UserImage} from "../../../../../../../../../../layouts/components";

interface CountriesProps {
    totals: any;
}

const Countries: React.FC<CountriesProps> = ({totals}) => {
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
                            {total.user.country ? total.user.country : 'Пусто'}
                            {total.user.capital ? total.user.capital : null}
                        </td>
                        <td>
                            <UserImage src={total.exercise.url_flag} alt={total.exercise.country}/>
                        </td>
                        <td>
                            {total.exercise.country ? total.exercise.country : 'Пусто'}
                            {total.exercise.capital ? total.exercise.capital : null}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default Countries;
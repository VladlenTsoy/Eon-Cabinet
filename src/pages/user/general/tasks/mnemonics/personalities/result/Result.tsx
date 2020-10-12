import React from 'react';
import {useSelector} from "react-redux";
import {TrophyOutlined} from '@ant-design/icons';
import {Avatar} from "../../../../../../../lib/ui";
import moment from "moment";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const ResultBlock = () => {
    const {setting, totals} = useSelector(gameSelector);

    const mode = Number(setting.mode);

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td/>
                <td colSpan={mode > 2 ? 2 : 1}>Правильный ответ</td>
                <td colSpan={mode > 2 ? 2 : 1}>Ваш ответ</td>
            </tr>
        }
        children={
            totals.map((total: any, key: number) =>
                [
                    <tr key={key}>
                        <td className="number" rowSpan={mode > 1 ? 2 : 1}>
                            {key + 1}
                        </td>
                        <td className={`trophy ${total.result ? 'warning' : 'second'}`} rowSpan={mode > 1 ? 2 : 1}>
                            <TrophyOutlined/>
                        </td>
                        <td rowSpan={mode > 1 ? 2 : 1}>
                            <Avatar
                                width="150px"
                                className="image"
                                src={total.exercise.url_photo}
                                alt={total.exercise.full_name}
                            />
                        </td>
                        <td className="answer" colSpan={mode > 2 ? 2 : 1}>
                            {total.exercise.full_name}
                        </td>
                        <td className={`user ${total.result ? 'success' : 'danger'}`} colSpan={mode > 2 ? 2 : 1}>
                            {total.user && total.user.full_name ? total.user.full_name : 'Пусто'}
                        </td>
                    </tr>,
                    <tr key={key + '-two'}>
                        {total.exercise.born &&
                        <td className="sub">{moment(total.exercise.born).format('DD-MM-YYYY')}</td>}
                        {total.exercise.die &&
                        <td className="sub">{moment(total.exercise.die).format('DD-MM-YYYY')}</td>}
                        {total.exercise.born &&
                        <td className="sub">
                            {total.user.born ? total.user.born.format('DD-MM-YYYY') : 'Пусто'}
                        </td>}
                        {total.exercise.die &&
                        <td className="sub">
                            {total.user.die ? total.user.die.format('DD-MM-YYYY') : 'Пусто'}
                        </td>}
                    </tr>
                ]
            )
        }
    />;
};

export default ResultBlock;
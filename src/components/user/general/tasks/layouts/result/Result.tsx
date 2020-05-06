import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router";
import {useSelector} from "react-redux";
import ResultLayout from "../../../../../../layouts/result/Result.layout";
import MiddleBlock from "./middle-block/MiddleBlock";
import LeftBlock from "./left-block/LeftBlock";
import RightBlock from "./right-block/RightBlock";
import {totalsSelect} from "../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../store/game/reducer";

export type ResultMatchProps = { homeworkId?: string, id?: string };

const Result: React.FC = ({children}) => {
    const match = useRouteMatch<ResultMatchProps>();

    const {api} = useSelector((state: any) => state);
    const {stats} = useSelector(game);

    const result: boolean = stats.all !== 0 && stats.all === stats.success;
    const [loading, setLoading] = useState(true);
    const [resultId, setResultId] = useState();

    const totals = useSelector(totalsSelect);

    useEffect(() => {
        if (match.params.homeworkId && match.params.id)
            (async () => {
                setLoading(true);
                const response = await api.user_general.post('/student/homework/result', {
                    task_id: match.params.id,
                    sent_id: match.params.homeworkId,
                    result: {
                        countAll: stats.all,
                        countSuccess: stats.success,
                        exodus: result,
                    },
                    totals
                });
                setResultId(response.data.id);
                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            })();
        else
            setTimeout(() => {
                setLoading(false);
            }, 4000);
    }, [match.params.homeworkId, match.params.id, api.user_general, stats, totals, result]);

    return <ResultLayout
        loading={loading}
        result={result}
        left={
            !loading && <LeftBlock resultId={resultId}>
                {children}
            </LeftBlock>
        }
        right={!loading && <RightBlock/>}
        middle={<MiddleBlock/>}
    />
};

export default Result;
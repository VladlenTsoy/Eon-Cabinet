import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router";
import {useSelector} from "react-redux";
import ResultLayout from "../../../../../../../layouts/result/Result.layout";
import MiddleBlock from "./middle-block/MiddleBlock";
import LeftBlock from "./left-block/LeftBlock";
import RightBlock from "./right-block/RightBlock";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../store/game/reducer";
import {useChangeActionNavbar} from "../../../../../../../effects/use-change-action-navbar.effect";

export type ResultMatchProps = {
    homeworkId?: string;
    id?: string;
    disciplineId?: string;
    taskId?: string;
};

const Result: React.FC = ({children}) => {
    const {params} = useRouteMatch<ResultMatchProps>();
    const {api} = useSelector((state: any) => state);
    const {stats} = useSelector(game);

    const result: boolean = stats.all !== 0 && stats.all === stats.success;
    const [loading, setLoading] = useState(true);
    const [resultData, setResultData] = useState();

    const totals = useSelector(totalsSelect);

    useChangeActionNavbar({
        action: params?.homeworkId ?
            `/homework/${params.homeworkId}` :
            `back`
    });

    useEffect(() => {
        if (params.homeworkId && params.id)
            (async () => {
                setLoading(true);
                const response = await api.user_general.post('/student/homework/result', {
                    task_id: params.id,
                    sent_id: params.homeworkId,
                    result: {
                        countAll: stats.all,
                        countSuccess: stats.success,
                        exodus: result,
                    },
                    totals
                });
                setResultData(response.data);
                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            })();
        else
            setTimeout(() => {
                setLoading(false);
            }, 4000);
    }, [params.homeworkId, params.id, api.user_general, stats, totals, result]);

    return <ResultLayout
        loading={loading}
        result={result}
        left={
            !loading && <LeftBlock resultId={resultData?.id}>
                {children}
            </LeftBlock>
        }
        right={!loading && <RightBlock resultData={resultData}/>}
        middle={<MiddleBlock/>}
    />
};

export default Result;
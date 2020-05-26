import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import ResultLayout from "../../../../../../../layouts/result/Result.layout";
import MiddleBlock from "./middle-block/MiddleBlock";
import LeftBlock from "./left-block/LeftBlock";
import RightBlock from "./right-block/RightBlock";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {game} from "../../../../../../../store/reducers/common/game/reducer";
import {useAppContext} from "../../../../../../../store/context/use-app-context";

export type ResultMatchProps = {
    homeworkId?: string;
    id?: string;
    disciplineId?: string;
    taskId?: string;
};

const Result: React.FC = ({children}) => {
    const {homeworkId, id} = useParams<ResultMatchProps>();
    const {api} = useAppContext();
    const {stats} = useSelector(game);

    const result: boolean = stats.all !== 0 && stats.all === stats.success;
    const [loading, setLoading] = useState(true);
    const [resultData, setResultData] = useState();
    const [isView, setIsView] = useState(!homeworkId);

    const totals = useSelector(totalsSelect);

    const updateIsView = useCallback((state: boolean) => {
        setIsView(state);
    }, []);

    useEffect(() => {
        if (homeworkId && id)
            (async () => {
                setLoading(true);
                const response = await api.user.post('/student/homework/result', {
                    task_id: id,
                    sent_id: homeworkId,
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
                }, result ? 4000 : 2000);
            })();
        else
            setTimeout(() => {
                setLoading(false);
            }, result ? 4000 : 2000);
    }, [homeworkId, id, api.user, stats, totals, result]);

    return <ResultLayout
        loading={loading}
        result={result}
        left={
            !loading && <LeftBlock resultId={resultData?.id} isView={isView} updateIsView={updateIsView}>
                {children}
            </LeftBlock>
        }
        right={!loading && <RightBlock isView={isView} result={result} resultData={resultData}/>}
        middle={<MiddleBlock/>}
    />
};

export default Result;
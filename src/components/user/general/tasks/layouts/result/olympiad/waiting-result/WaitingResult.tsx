import React, {useCallback, useEffect, useState} from 'react';
import Trophy from "./trophy/Trophy";
import RightBlock from "./right-block/RightBlock";
import {useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {RouteOlympiadTaskProps} from "../Result";
import {totalsSelect} from "../../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../../store/reducers/common/game/reducer";

type WaitingResultProps = RouteComponentProps<RouteOlympiadTaskProps> & {
    loading: boolean;
    sounds: {[key: string]: HTMLAudioElement};
    setLoadingResult: (loadingResult: boolean) => void;
}

const WaitingResult: React.FC<WaitingResultProps> = (
    {
        match,
        sounds,
        loading,
        setLoadingResult,
    }
) => {
    const {api} = useSelector((state: any) => state);
    const {stats} = useSelector(game);
    const totals = useSelector(totalsSelect);

    const [resultData, setResultData] = useState();
    const result: boolean = stats.all !== 0 && stats.all === stats.success;

    const save = useCallback(async () => {
        return await api.user_general.post('/student/olympiad/result', {
            task_id: match.params.taskOlympiadId,
            sent_id: match.params.sentOlympiadId,
            result: {
                countAll: stats.all,
                countSuccess: stats.success,
                exodus: result,
            },
            totals
        });
    }, [api.user_general, match.params.sentOlympiadId, match.params.taskOlympiadId, result, stats.all, stats.success, totals]);

    useEffect(() => {
        if (match.params.sentOlympiadId && match.params.taskOlympiadId)
            (async () => {
                setLoadingResult(true);
                const response = await save();
                setResultData(response.data);
                setLoadingResult(false);
            })();
    }, [match.params.sentOlympiadId, match.params.taskOlympiadId, setLoadingResult, save]);

    return <>
        <Trophy
            stats={stats}
            // stats={{all: 20, success: 18}}
            resultData={resultData}
            result={result}
            sounds={sounds}
            loading={loading}
        />
        <RightBlock
            resultData={resultData}
            loading={loading}
        />
    </>;
};

export default withRouter(React.memo(WaitingResult));
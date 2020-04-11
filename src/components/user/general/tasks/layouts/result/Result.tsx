import React, {useEffect, useState} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import TrophyTitleActions from "./tropty-title-actions/TrophyTitleActions";
import ViewDetails from "./view-details/ViewDetails";
import Details from "./details/Details";

const ResultWrapper: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  @media (max-width: 768px) {
    position: relative;
  }
`;

const TrophyWrapper = styled.div`
  position: relative;
  height: 100%;
  background: ${props => props.theme['@component-background']};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 2px 15px 0 rgba(0,0,0,.05);
  
  @media (max-width: 768px) {
    border-radius: 10px;
    padding: 1rem;
  }
`;

type ResultProps = RouteComponentProps<{ homeworkId?: string, id?: string }>;

const Result: React.FC<ResultProps> = (
    {
        match,
        children
    }
) => {
    const {api, game} = useSelector((state: any) => state);
    //
    const [loading, setLoading] = useState<boolean>(Boolean(match.params.homeworkId));
    const [resultId, setResultId] = useState();
    const [isView, setIsView] = useState(!match.params.homeworkId);
    //
    const {totals, stats} = game;
    const result: boolean = stats.all && stats.all === stats.success;

    useEffect(() => {
        document.getElementsByClassName('ant-layout-content')[0].scrollTo(0, 0);
    }, []);

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
                setLoading(false);
            })();
    }, [match.params.homeworkId, match.params.id, api.user_general, stats, totals, result]);

    return <ResultWrapper id="result">
        <TrophyWrapper>
            <TrophyTitleActions result={result}/>
            <ViewDetails setIsView={setIsView} loading={loading} resultId={resultId}/>
        </TrophyWrapper>
        {isView ? <Details>{children}</Details> : null}
    </ResultWrapper>;
};

export default withRouter(Result);
import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import { DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import {useSelector} from "react-redux";

const ViewDetailsWrapper: any = styled.div`
    font-size: 40px;
    cursor: pointer;
    transition: all 0.3s ease-in-out; 
    user-select: none;
    
    i{
      transition: all 0.3s ease-in-out; 
      transform: rotate(90deg);
      margin-right: 1rem;
      color: ${props => props.theme.color_second};
    }
    
    :hover{
      color: ${props => props.theme.color_black};
    
      i{
        color: ${props => props.theme.color_primary};
      }
    }
    
    @media (max-width: 768px) {
       font-size: 25px;
    }
`;

interface ViewDetailsProps {
    setIsView: (isView: boolean) => void;
    loading: boolean;
    resultId: number;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({setIsView, loading, resultId}) => {
    const {api} = useSelector((state: any) => state);
    const [view, setView] = useState<boolean>(!resultId);

    useEffect(() => {
        setView(!resultId);
    }, [resultId]);

    const scrollToDetails = useCallback(() => {
        const detailsElement = document.getElementById('details-for-result');
        if (detailsElement)
            document.getElementsByClassName('ant-layout-content')[0].scrollTo({
                left: 0,
                top: detailsElement.offsetTop,
                behavior: 'smooth'
            })
    }, []);

    const viewResult = useCallback(async () => {
        await api.user_general.post(`/student/homework/result/${resultId}/view`);
        await setIsView(true);
        await setView(true);
        scrollToDetails();
    }, [setIsView, scrollToDetails, api.user_general, resultId]);

    const toggleDetails = () => {
        if (!view)
            Modal.confirm({
                title: 'Просмотреть ответы?',
                content: 'После просмотра ответов вы не можете повторить упражнение с текущими примерами при следующем выполнении будут сгенерированы новые примеры.',
                onOk: viewResult
            });
        else
            scrollToDetails();
    };

    return (
        <ViewDetailsWrapper onClick={loading ? null : toggleDetails}>
            {loading ?
                <>
                    <LoadingOutlined />
                    Загрузка...
                </> :
                <>
                    <DoubleRightOutlined />
                    Посмотреть ответы
                </>
            }
        </ViewDetailsWrapper>
    );
};

export default React.memo(ViewDetails);
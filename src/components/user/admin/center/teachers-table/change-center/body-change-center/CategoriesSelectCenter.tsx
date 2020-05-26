import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Alert} from "../../../../../../../layouts/components";
import {Row} from "antd";
import styled from "styled-components";
import FormItemWrapper from "./FormItemWrapper";

const CategoriesWrapper = styled.div`
  width: 100%;
  
  .discipline-title{
    margin: 0.5rem 0;
    font-weight: bold;
    font-size: 18px;
    color: ${props => props.theme.color_second};
  }
`;

interface CategoriesSelectCenterProps {
    teacher: any;
    centerId: any;
    currentCenterId: any;
    categoriesCurrentCenter: any;
}

const CategoriesSelectCenter: React.FC<CategoriesSelectCenterProps> = ({teacher, centerId, currentCenterId, categoriesCurrentCenter}) => {
    const {api} = useSelector((state: any) => (state));
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any>([]);

    const fetch = useCallback(async () => {
        let response = await api.user.get(`admin/categories/center/${centerId}`);
        setCategories(response.data);
    }, [api.user, centerId]);

    useEffect(() => {
        (async () => {
            if (centerId && currentCenterId !== centerId) {
                setLoading(true);
                await fetch();
                setLoading(false);
            }
        })();
    }, [centerId, currentCenterId, fetch]);

    return centerId && currentCenterId !== centerId ? <CategoriesWrapper>
        <Alert type="info" message="Выберите категории в замен старых" description="dasdasd" showIcon/>
        {teacher.methods_id.includes(1) ?
            <>
                <p className="discipline-title">Ментальная арифметика</p>
                <Row gutter={15}>
                    <FormItemWrapper
                        loading={loading}
                        fetch={fetch}
                        discipline={1}
                        categories={categories}
                        categoriesCurrentCenter={categoriesCurrentCenter}/>
                </Row>
            </> : null}
        {teacher.methods_id.includes(2) ?
            <>
                <p className="discipline-title">Мнемотехника</p>
                <Row gutter={15}>
                    <FormItemWrapper
                        loading={loading}
                        fetch={fetch}
                        discipline={2}
                        categories={categories}
                        categoriesCurrentCenter={categoriesCurrentCenter}/>
                </Row>
            </> : null}
    </CategoriesWrapper> : null;
};

export default CategoriesSelectCenter;
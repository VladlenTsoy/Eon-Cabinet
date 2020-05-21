import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import {Button, Col, Empty, Row} from 'antd';
import {DescriptionTitle} from "layouts/components";
import EditorStepButton from "../editor-step-button/EditorStepButton";

const rowStyle = {
    height: '100%',
};

interface EmptyStepsProps {
    current: number;
    setSteps: (steps: any) => void;
    setCurrent: (current: number) => void;
}

const EmptySteps: React.FC<EmptyStepsProps> = (
    {
        current,
        setSteps,
        setCurrent,
    }
) => {
    return (
        <Row align="middle"  justify="center" style={rowStyle}>
            <Col xl={8} md={12} xs={24}>
                <Empty
                    description={
                        <>
                            <DescriptionTitle>Создайте этап</DescriptionTitle>
                            <span>Олимпиада делиться по этапам, ученик может перейти на следующий этап только если пройдет предыдущие этапы. Формируйте этапы по сложности от самого легкого до самого сложного.</span>
                        </>
                    }
                >
                    <EditorStepButton
                        key="empty-create"
                        first
                        stepKey={current}
                        setSteps={setSteps}
                        setCurrent={setCurrent}
                    >
                        <Button type="primary" icon={<PlusCircleOutlined />} size="large">Создать этап</Button>
                    </EditorStepButton>
                </Empty>
            </Col>
        </Row>
    );
};

export default EmptySteps;
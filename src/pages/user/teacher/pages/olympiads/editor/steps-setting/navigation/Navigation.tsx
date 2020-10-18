import React, {useCallback} from 'react';
import {Steps} from "antd";
import {confirm} from "lib/ui";
import Title from "./title/Title";
import moment from "moment";

const {Step} = Steps;

const stepStyle = {
    marginBottom: '1rem',
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

const descriptionStyle = {
    whiteSpace: 'nowrap',
    fontSize: '12px'
}  as React.CSSProperties;

interface NavigationProps {
    current: number;
    steps: any[];
    setSteps: (step: any) => void;
    deleteStep: (key: number) => void;
    onChangeHandler: (current: any) => void;
}

const Navigation: React.FC<NavigationProps> = (
    {
        current,
        steps,
        setSteps,
        deleteStep,
        onChangeHandler
    }
) => {
    const deleteHandler = useCallback((key: number) => {
        confirm({
            okType: 'danger',
            title: `Хотите удалить этап (${steps[key].title})?`,
            onOk() {
                if (key !== 0)
                    onChangeHandler(current === key ? key - 1 : key);
                deleteStep(key);
            },
            okText: 'Да',
            cancelText: 'Нет'
        });
    }, [deleteStep, onChangeHandler, steps, current]);

    return <Steps type="navigation" current={current} onChange={onChangeHandler} style={stepStyle}>
        {
            steps.map((step: any, key) =>
                <Step
                    status="process"
                    title={
                        <Title
                            step={step}
                            stepKey={key}
                            setSteps={setSteps}
                            deleteHandler={deleteHandler}
                            onChangeHandler={onChangeHandler}
                        />
                    }
                    description={
                        <p style={descriptionStyle}>
                            {moment(step.start_at).format('HH:mm DD/MM/YY')} - {moment(step.end_at).format('HH:mm DD/MM/YY')}
                        </p>
                    }
                    key={key}
                />
            )
        }
    </Steps>;
};

export default Navigation;
import React from 'react';
import {Col, Row} from "antd";
import {FormItem} from "../../../../../../../../../../../layouts/components";
import Stepper from "../../../../../../../../../../../lib/stepper/Stepper";

interface BasicProps {
    length: string;
    mods?: string;
    multi?: boolean;
    isMultiplication: boolean;
}

const Basic: React.FC<BasicProps> = (
    {
        length,
        mods,
        multi,
        isMultiplication
    }
) => {
    return <Row gutter={15}>
        {!isMultiplication ?
            <Col sm={multi ? 12 : 8} xs={12}>
                <FormItem
                    name="count"
                    label="Количество цифр"
                    requiredMsg="Введите количество цифр!">
                    <Stepper
                        min={1}
                        max={
                            isMultiplication ? 200 :
                                Number(length) === 1 ? 10 :
                                    Number(length) === 2 ? 20 : 200
                        }
                    />
                </FormItem>
            </Col> : null
        }
        {!multi || mods === 'multiplication' ?
            <Col sm={isMultiplication ? 12 : 8} xs={12}>
                <FormItem
                    name="times"
                    label="Количество раз"
                    requiredMsg="Введите количество раз!">
                    <Stepper min={1}/>
                </FormItem>
            </Col> : null
        }
        <Col sm={multi || isMultiplication ? 12 : 8} xs={multi || isMultiplication ? 12 : 24}>
            <FormItem
                name="time"
                label="Время (секунды)"
                requiredMsg="Введите время!">
                <Stepper min={0.2} max={10} step={0.1}/>
            </FormItem>
        </Col>
    </Row>;
};

export default React.memo(Basic);
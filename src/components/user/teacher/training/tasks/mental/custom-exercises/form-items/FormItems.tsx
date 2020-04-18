import React, {useEffect, useState} from 'react';
import {Col, InputNumber, Radio, Row, Select} from "antd";
import {RadioWrapper} from "../../anzan/forms/type-form/TypeForm";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {FormInstance} from "antd/es/form";
import {FormItem} from "lib";
import {FileOutlined} from "@ant-design/icons";

const RadioStyleWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
    }
  }
`;

const DescriptionWrapper = styled.div`
  text-align: center;
  padding: 1rem;
  border: 1px dashed ${props => props.theme.light_color_border};
`;

const {Option} = Select;

interface FormItemsProps {
    form: FormInstance;
    categories: string[];
    typeTasks: string[];
    modes: string[];
    titles: any[];
}

const FormItems: React.FC<FormItemsProps> = (
    {
        form,
        categories,
        typeTasks,
        modes,
        titles
    }
) => {
    const {app} = useSelector((state: any) => state);
    const [description, setDescription] = useState('');
    const defCategories = app.categories;

    let typeTask = form.getFieldValue('anzan');
    let mode = form.getFieldValue('mode');
    let customExercisesId = form.getFieldValue('custom_exercises_id');

    const onChangeHandler = (item: any, select: any) =>
        setDescription(select['data-description']);

    useEffect(() => {
        if (customExercisesId && titles) {
            let title = titles.find((title: any) => title.id === customExercisesId);
            if (title)
                setDescription(title.description)
        }
    }, [customExercisesId, titles]);

    return <>
        <FormItem name="category_id" requiredMsg="Выберите категорию!">
            <RadioStyleWrapper size="large">
                {
                    defCategories.filter((category: any) => category.discipline_id === 1)
                        .map((category: any) =>
                            <Radio.Button
                                key={category.id}
                                value={category.id}
                                disabled={!categories.includes(String(category.id))}
                            >
                                {category.title}
                            </Radio.Button>
                        )
                }
            </RadioStyleWrapper>
        </FormItem>

        <FormItem name="anzan" requiredMsg="Выберите тип задания!">
            <RadioWrapper size="large" column="1fr 1fr">
                <Radio.Button
                    disabled={!typeTasks.includes('basic')}
                    value="basic"
                >
                    Обычный
                </Radio.Button>
                <Radio.Button
                    disabled={!typeTasks.includes('list')}
                    value="list"
                >
                    <FileOutlined/> Листы
                </Radio.Button>
            </RadioWrapper>
        </FormItem>

        <FormItem name="mode" requiredMsg="Выберите действие!">
            <RadioStyleWrapper size="large">
                <Radio.Button
                    disabled={!modes.includes('plus-minus')}
                    value="plus-minus"
                >
                    + <span className="slash">/</span> -
                </Radio.Button>
                <Radio.Button
                    disabled={!modes.includes('multiply')}
                    value="multiply"
                >
                    ×
                </Radio.Button>
                <Radio.Button
                    disabled={!modes.includes('divide')}
                    value="divide"
                >
                    ÷
                </Radio.Button>
            </RadioStyleWrapper>
        </FormItem>

        <Row gutter={15}>
            <Col xl={12}>
                <FormItem label="Уровень" name="custom_exercises_id" size="large" requiredMsg="Выберите уровень!">
                    <Select onChange={(item: any, a: any) => onChangeHandler(item, a)}>
                        {
                            titles
                                .map((item: any) =>
                                    <Option value={item.id} key={item.id} data-description={item.description}>
                                        {item.title}
                                    </Option>
                                )
                        }
                    </Select>
                </FormItem>
            </Col>
            <Col xl={12}>
                <FormItem
                    label={`Время (${typeTask === 'basic' ? 'Секундах' : 'Минутах'})`}
                    name="time"
                    size="large"
                    requiredMsg="Введите время!"
                >
                    <InputNumber
                        style={{width: '100%'}}
                        step={typeTask === 'basic' ? 0.1 : 1}
                        min={0}
                        max={10}
                    />
                </FormItem>
            </Col>
        </Row>

        <DescriptionWrapper>
            {description}
        </DescriptionWrapper>

        <ConfigBlock
            sounds={
                typeTask === 'basic' && mode === 'plus-minus' ?
                    {
                        language: false,
                    } : false
            }
            mods={
                mode !== 'plus-minus' ?
                    {
                        group: typeTask !== 'list'
                    } :
                    {
                        plus: true,
                        group: typeTask !== 'list',
                        comma: true,
                        mirror: true,
                        abacus: typeTask !== 'list'
                    }
            }
        />
    </>;
};

export default usingFormBodyLayout(FormItems);
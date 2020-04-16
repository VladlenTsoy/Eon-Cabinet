import React, {useState} from 'react';
import usingFormBodyLayout from "../layout/form-body/usingFormBody.layout";
import {FormItem} from "layouts/components";
import {Col, InputNumber, Radio, Row, Select} from "antd";
import {RadioWrapper} from "../anzan/anzan-form-body/type-setting-anzan/TypeSettingAnzan";
import {FileOutlined} from '@ant-design/icons';
import {FormInstance} from "antd/es/form";
import ConfigBlock from "../../config/Config";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import {LoadingBlock} from "../../../../../../../lib";
import styled from "styled-components";
import {useSelector} from "react-redux";


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

interface CustomExercisesProps {
    form: FormInstance;
}

const CustomExercises: React.FC<CustomExercisesProps> = ({form}) => {
    const {app} = useSelector((state: any) => state);
    const [description, setDescription] = useState('');
    const {categories} = app;
    const [loading, exercises] = useApiUserGeneral({url: '/teacher/custom-exercises/form'});
    let categoryId = form.getFieldValue('category_id');
    let typeTask = form.getFieldValue('type_task');
    let controlMode = form.getFieldValue('control_mode');

    const onChangeHandler = (item: any, select: any) =>
        setDescription(select['data-description']);

    return !loading ?
        <>
            <FormItem name="category_id" requiredMsg="Выберите категорию!">
                <RadioStyleWrapper size="large">
                    {
                        categories.filter((category: any) => category.discipline_id === 1)
                            .map((category: any) =>
                                <Radio.Button
                                    key={category.id}
                                    value={category.id}
                                    disabled={!Object.keys(exercises).includes(String(category.id))}
                                >
                                    {category.title}
                                </Radio.Button>
                            )
                    }
                </RadioStyleWrapper>
            </FormItem>

            {
                categoryId ?
                    <FormItem name="type_task" requiredMsg="Выберите тип задания!">
                        <RadioWrapper size="large" column="1fr 1fr">
                            <Radio.Button
                                disabled={!Object.keys(exercises[categoryId]).includes('basic')}
                                value="basic"
                            >
                                Обычный
                            </Radio.Button>
                            <Radio.Button
                                disabled={!Object.keys(exercises[categoryId]).includes('list')}
                                value="list"
                            >
                                <FileOutlined/> Листы
                            </Radio.Button>
                        </RadioWrapper>
                    </FormItem> : null
            }

            {
                categoryId && typeTask ?
                    <FormItem name="control_mode" requiredMsg="Выберите действие!">
                        <RadioStyleWrapper size="large">
                            <Radio.Button
                                disabled={!Object.keys(exercises[categoryId][typeTask]).includes('addition')}
                                value="addition"
                            >
                                + <span className="slash">/</span> -
                            </Radio.Button>
                            <Radio.Button
                                disabled={!Object.keys(exercises[categoryId][typeTask]).includes('multiplication')}
                                value="multiplication"
                            >
                                ×
                            </Radio.Button>
                            <Radio.Button
                                disabled={!Object.keys(exercises[categoryId][typeTask]).includes('division')}
                                value="division"
                            >
                                ÷
                            </Radio.Button>
                        </RadioStyleWrapper>
                    </FormItem> : null
            }

            <Row gutter={15}>
                <Col xl={12}>
                    <FormItem label="Уровень" name="custom_exercises_id" size="large" requiredMsg="Выберите уровень!">
                        <Select onChange={(item: any, a: any) => onChangeHandler(item, a)}>
                            {
                                categoryId && typeTask && controlMode ?
                                    Object.values(exercises[categoryId][typeTask][controlMode])
                                        .map((item: any) =>
                                            <Option value={item.id} key={item.id} data-description={item.description}>
                                                Уровень {item.level}
                                            </Option>
                                        ) : null
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
                    typeTask === 'basic' && typeTask === 'addition' ? {
                        language: false,
                    } : false
                }
                mods={
                    typeTask !== 'addition' ?
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
        </> :
        <LoadingBlock/>;
};

export default usingFormBodyLayout(CustomExercises);
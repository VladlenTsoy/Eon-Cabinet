import React from 'react';
import {RadioWrapper} from "../../../../anzan/forms/type-form/TypeForm";
import {Radio} from "antd";
import {FormItem} from "../../../../../../../../../../../lib";
import {FileOutlined} from "@ant-design/icons";

interface TypeItemProps {
    typeTasks: any[];
}

const TypeItem:React.FC<TypeItemProps> = ({typeTasks}) => {
    return <FormItem name="anzan" requiredMsg="Выберите тип задания!">
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
};

export default React.memo(TypeItem);
import React, {useState} from 'react';
import {Button, InputNumber} from "antd";
import {FormItem} from "layouts/components";
import {PlusOutlined} from "@ant-design/icons";

interface AdditionProps {
    times: number;
}

const Addition: React.FC<AdditionProps> = ({times}) => {
    const [inputs, setInputs] = useState<any[]>([]);

    const onClickHandler = () => {
        setInputs((prevState) => [...prevState, true])
    };

    return <>
        {
            inputs.map((input: any, key: number) =>
                <FormItem name={['exercises', times, key]} requiredMsg={`Введите число #${key + 1}!`} marginBottom="0.5rem" key={key}>
                    <InputNumber style={{width: '100%'}} placeholder={`Введите число #${key + 1}`}/>
                </FormItem>
            )
        }
        <Button type="dashed" block onClick={onClickHandler} icon={<PlusOutlined/>}>
            Добавить
        </Button>
    </>;
};

export default Addition;
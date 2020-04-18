import React from 'react';
import {Col, Select} from "antd";
import {FormItem} from "../../../../../../../../../../../layouts/components";
import {useSelector} from "react-redux";

const {Option} = Select;

interface SelectLengthProps {
    typeAnzan: string;
    lengths: any[];
    isMultiplication: boolean;
    isThemes: boolean;
}

const SelectLength: React.FC<SelectLengthProps> = (
    {
        typeAnzan,
        lengths,
        isMultiplication,
        isThemes,
    }
) => {
    const {language} = useSelector((state: any) => state);

    return <Col sm={isMultiplication && !isThemes ? 12 : 8} xs={12}>
        <FormItem
            name={`length`}
            label="Разряд чисел"
            requiredMsg="Выберите разряд чисел!"
        >
            <Select loading={!lengths.length}>
                {lengths.length ? lengths.map((leng: any) =>
                    <Option
                        disabled={typeAnzan === 'double' && Number(leng) > 7}
                        key={leng}
                        value={leng}>
                        {isMultiplication ? language.common.lengthNames[leng] : leng}
                    </Option>
                ) : null}
            </Select>
        </FormItem>
    </Col>;
};

export default React.memo(SelectLength);
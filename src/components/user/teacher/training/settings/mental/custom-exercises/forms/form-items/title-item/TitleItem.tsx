import React from 'react';
import {FormItem} from "../../../../../../../../../../lib";
import {Select} from "antd";

const {Option} = Select;

interface TitleItemProps {
    titles: any[]
    onChangeHandler: any;
}

const TitleItem: React.FC<TitleItemProps> = ({titles, onChangeHandler}) => {
    return <FormItem label="Уровень" name="custom_exercises_id" requiredMsg="Выберите уровень!">
        <Select onChange={(item: any, select:any) => onChangeHandler(item, select)} size="large">
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
};

export default React.memo(TitleItem);
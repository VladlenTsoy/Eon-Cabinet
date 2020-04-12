import React from 'react';
import {Select} from "antd";
import {FormItem} from "layouts/components";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";

const {Option, OptGroup} = Select;

interface CentersListBodyChangeCenter {
    currentCenterId: any;
    handlerChange: any;
}

const CentersListBodyChangeCenter: React.FC<CentersListBodyChangeCenter> = ({currentCenterId, handlerChange}) => {
    const [loading, centers] = useApiUserGeneral({url: 'admin/centers/all'});

    return <FormItem
        name="center_id"
        requiredMsg="Выберите центр!"
        label="Выберите центр для превода учителя"
    >
        <Select style={{width: '100%'}} onChange={handlerChange} loading={loading}>
            {!loading ? Object.keys(centers).map((franchise: any, key: any) =>
                <OptGroup label={franchise} key={key}>
                    {centers[franchise].map((center: any) =>
                        <Option
                            value={center.id}
                            key={center.id}>
                            {center.id === currentCenterId ? `${center.title} - Текущий центр` : center.title}
                        </Option>
                    )}
                </OptGroup>
            ) : null}
        </Select>
    </FormItem>
};

export default CentersListBodyChangeCenter;
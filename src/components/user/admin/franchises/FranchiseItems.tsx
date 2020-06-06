import React from "react";
import {FormItem, SelectData, Upload} from "../../../../lib";
import { PlusOutlined } from '@ant-design/icons';
import { Col, Input, Row } from "antd";
import EditorPriceButton from "../settings/prices/EditorPriceButton";

const {TextArea} = Input;

interface FranchiseItemsProps {
    form: any;
}

const FranchiseItems: React.FC<FranchiseItemsProps> = ({form}) => {
    return (
        <Row gutter={15}>
            <Col span={24}>
                <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
            </Col>
            <Col span={12}>
                <SelectData
                    url="/admin/directors"
                    name="director_id"
                    label="Директор"
                    optRender={(item: any) => `${item.first_name} ${item.last_name}`}
                    // evtBtn={(update: any) =>
                    //     <EditorDirectorButton
                    //         title="Создать директора"
                    //         fetch={update}
                    //         isMouseDown={true}
                    //         isFranchise={true}
                    //     >
                    //         <Icon type="plus"/> Создать директора
                    //     </EditorDirectorButton>
                    // }
                />
            </Col>
            <Col span={12}>
                <SelectData
                    label="Прайс"
                    name="price_id"
                    url="/admin/prices"
                    evtBtn={(update: any) =>
                        <EditorPriceButton
                            title="Создать прайс"
                            fetch={update}
                            isMouseDown={true}
                        >
                            <PlusOutlined /> Создать прайс
                        </EditorPriceButton>
                    }
                />
            </Col>
            <Col span={24}>
                <FormItem name="description" label="Описание">
                    <TextArea/>
                </FormItem>
                <Upload form={form} label="Логотип" name="image"/>
            </Col>
        </Row>
    );
};

export default FranchiseItems;
import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Row } from "antd";
import ProfileBlock from "../../general/profile/profile-block/ProfileBlock";
import ProfileData from "../../general/profile/profile-data/ProfileData";
import {useAppContext} from "../../../../store/context/use-app-context";

const Profile:React.FC = () => {
    const {user} = useAppContext();
    return <Row  gutter={15} align="middle">
        <Col lg={6} md={12} xs={24}>
            <ProfileBlock user={user} settingMenu={{password: true}}/>
        </Col>
        <Col lg={12} md={24} xs={24}>
            <ProfileData/>
        </Col>
    </Row>;
};

export default Form.create<any>()(Profile);
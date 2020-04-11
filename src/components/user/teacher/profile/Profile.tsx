import React from "react";
import {useSelector} from "react-redux";
import {Col, Row} from "antd";
import ProfileBlock from "../../general/profile/profile-block/ProfileBlock";
import ProfileData from "../../general/profile/profile-data/ProfileData";

const Profile: React.FC = () => {
    const {user} = useSelector((state: any) => state);
    return <Row  gutter={15} align="middle">
        <Col lg={6} md={12} xs={24}>
            <ProfileBlock user={user} settingMenu={{password: true, color: true, email: true}}/>
        </Col>
        <Col lg={12} md={24} xs={24}>
            <ProfileData/>
        </Col>
    </Row>;
};

export default Profile;
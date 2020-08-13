import React from 'react';
import {CardStatistic} from "../../../../../../../../lib/components";
import {HomeOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentSlice";

const Homework = () => {
    const {statistic} = useSelector(studentsSelector)

    return <CardStatistic
        title="Дом. заданий"
        icon={<HomeOutlined/>}
        theme="primary"
        loading={statistic.loading}
        items={[{
            title: 'Отправленных',
            type: 'main',
            count: statistic.homework.count
        }]}/>
};

export default Homework;
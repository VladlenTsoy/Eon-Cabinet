import React from 'react';
import {CardStatistic} from "../../../../../../../../lib/ui";
import {HomeOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentsSlice";

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
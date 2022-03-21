import React, {useEffect} from 'react';
import styled from "styled-components";
import moment from "moment";
import {Popover} from "antd";
import StepSuccess from "assets/images/olympiad/step_success.svg";
import {useDispatch} from "store/store";
import {fetchOlympiadStepStudents} from "store/olympiad/detail/students/fetchOlympiadStudents";
import {useSelector} from "react-redux";
import {olympiadSelector} from "store/olympiad/olympiadSlice";
import {TablePagination, Avatar, Title} from "lib/ui";

const Wrapper = styled.div`
  padding: 2rem 0;
  text-align: center;
  
  > h4.ant-typography{
    margin-bottom: 1.5rem;
  }
  
  .numbers{
    cursor: pointer;
    
    > span {
      border-bottom: 1px dashed ${props => props.theme.color_second};
    }
        
    .numbers-success{ 
      color: ${props => props.theme.color_success};
    }

    .count-success{
     font-size: 18px;
    }

    .count-all{
      color: ${props => props.theme.color_second};
    }
  }
`;

interface TrophyProps {
    win: boolean;
}

const TrophyWrapper: React.FC<TrophyProps> = styled.div<TrophyProps>`
  display: block;
    
  img{
    filter: grayscale(${props => props.win ? 0 : 1});
    cursor: pointer;
    width: 40px;
  }
`;

interface StudentsMoreProps {
    step: any;
}

const Columns = () => [
    {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true
    },
    {
        render: (text: number, record: any) =>
            <TrophyWrapper win={record.numbers.all === record.numbers.success}>
                <img src={StepSuccess} alt="Победа"/>
            </TrophyWrapper>
    },
    {
        render: (text: string, record: any) =>
            <Avatar src={record.image} alt={record.first_name}/>
    },
    {
        title: 'Имя',
        render: (text: string, record: any) =>
            <>{record.first_name} {record.last_name}</>
    },
    {
        title: 'Лет',
        dataIndex: 'date_of_birth',
        sorter: true,
        render: (text: string) => text ? moment().diff(text, 'years') : 'Неизвестно'
    },
    {
        title: 'Центр',
        dataIndex: 'center',
    },
    {
        title: 'Группа',
        dataIndex: 'group',
    },
    {
        title: 'Дата участия',
        dataIndex: 'date_of_participation',
        render: (text: string) => moment(text).format('DD/MM/YY')
    },
    {
        title: 'Упражнений',
        dataIndex: 'numbers',
        render: (numbers: any) => <div
            className={numbers.success === numbers.all ? 'numbers numbers-success' : 'numbers'}
        >
            <Popover
                title="Упражнений"
                content={`Побед: ${numbers.success} / Выполнил: ${numbers.done} / Всего: ${numbers.all}`}
            >
                <>
                    <span className="count-success">{numbers.success}</span>
                    <span className="count-all"> / {numbers.done}</span>
                    <span className="count-all"> / {numbers.all}</span>
                </>
            </Popover>
        </div>
    }
];

const StudentsMore: React.FC<StudentsMoreProps> = ({step}) => {
    const {detail} = useSelector(olympiadSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchOlympiadStepStudents({stepId: step.id}))
        return () => {
            promise.abort()
        }
    }, [dispatch, step.id])

    return <Wrapper>
        <Title level={4}>Участники</Title>
        <TablePagination
            columns={Columns()}
            pagination={false}
            loading={detail.students.loading}
            data={detail.students.data?.data || []} fetch={() => false}
        />
    </Wrapper>;
};

export default StudentsMore;

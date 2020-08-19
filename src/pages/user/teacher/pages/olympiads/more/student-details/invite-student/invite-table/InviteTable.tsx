import React, {useState} from 'react';
import {Input, Empty} from "antd";
import styled from "styled-components";
import {LoadingBlock} from "lib/ui";
import InviteColumn from "./column/InviteColumn";
import {DescriptionTitle} from "../../../../../../../../../lib/ui";
import {useLanguage} from "../../../../../../../../../hooks/use-language";

const {Search} = Input;

const SearchWrapper = styled(Search)`
  margin-bottom: 1rem;
`;

export const ScrollWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

export const TableWrapper = styled.table`
    width: 100%;
    
    thead{
      th{
        color: ${props => props.theme.color_second};
        font-weight: 300;
      }
    }
    
    tbody{
      td{
        padding: 0.75rem 0.3rem;
      }
    }
    
    .avatar-wrapper{
      padding-right: 0.5rem;
      padding-bottom: 0.5rem;
    }
    
    .full-name-wrapper{
      h4{
        margin-bottom: 0;   
      }
      
      p{
        margin-bottom: 0;
        color: ${props => props.theme.color_second};
        font-size: 12px;
        
        span{
          color: ${props => props.theme.color_warning};
        }
      }
    }
    
    .center-wrapper{
      .center{
        display: block;
      }
      .franchise{
        display: block;
        font-size: 12px;
        color: ${props => props.theme.color_second};
      }
    }
`;

interface InviteTableProps {
    olympiad: any;
    fetch: any;
}

// TODO - api
const InviteTable: React.FC<InviteTableProps> = ({olympiad, fetch}) => {
    const {language} = useLanguage();
    const [timer, setTimer] = useState<any>(0);
    const [students, setStudents] = useState<never[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<any>([]);

    const searchStudent = async (search: string) => {
        if (search) {
            setLoading(true);
            // let response = await api.user.post(`teacher/olympiad/${olympiad.id}/search/students`, {search});
            // setStudents(response.data);
            setLoading(false);
        }
    };

    const changeHandler = (e: any) => {
        clearTimeout(timer);
        let search = e.currentTarget.value;
        setTimer(setTimeout(() => searchStudent(search), 1000));
    };

    return <>
        <SearchWrapper placeholder="Введите логин, почту, имя, фамилию или id ученика" onKeyUp={changeHandler}/>
        {!loading ?
            students.length ?
                <ScrollWrapper>
                    <TableWrapper>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Логин</th>
                            <th>Группа</th>
                            <th>Центр</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student: any, key: any) =>
                            <InviteColumn
                                student={student}
                                fetch={fetch}
                                selected={selected}
                                setSelected={setSelected}
                                olympiad={olympiad}
                                key={key}
                            />
                        )}
                        </tbody>
                    </TableWrapper>
                </ScrollWrapper> :
                <Empty
                    description={
                        <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                    }
                /> :
            <LoadingBlock/>
        }
    </>;
};

export default InviteTable;
import React from 'react';
import {Avatar, Button} from "lib/ui";
import { MinusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {Link} from "react-router-dom";

const StudentsTable = styled.table`
  width: 100%;
  
  tr{
  
    &:not(:last-child){
      border-bottom: 1px solid ${props => props.theme['@layout-body-background']};
    }

    td{
      font-size: 14px;
      border: 0;
      color: ${props => props.theme.color_second};
      
      a{
        color: ${props => props.theme.color_main};
        
        &:hover{
          color: ${props => props.theme.color_primary};
        }
      }
    }
  }
`;

const UserNameWrapper = styled(Link)`
   display: flex;
   align-items: center;
`;

const StudentTable = () => {
    return (
        <StudentsTable>
            <tbody>
            <tr>
                <td>
                    <UserNameWrapper to={`/groups/1/student/5`}>
                        <Avatar
                            src="http://api.eon.loc/images/users/5/65fee7998e5521175390b9ac1b127dc6.jpg"
                            alt={''}
                            width="38px"
                            mr="0.75rem"/>
                        Цой Владлен
                    </UserNameWrapper>
                    {/*<UserNameWrapper to={`/groups/${record.group_id}/student/${record.id}`}>*/}
                    {/*    <Avatar*/}
                    {/*        src={record.image}*/}
                    {/*        alt={`${record.last_name} ${record.first_name}`}*/}
                    {/*        width="38px"*/}
                    {/*        mr="0.75rem"/>*/}
                    {/*    {record.last_name} {record.first_name}*/}
                    {/*</UserNameWrapper>*/}
                </td>
                <td>
                    <Link to={`/groups/1`}>Group</Link>
                </td>
                <td>Ментальная арифметика</td>
                <td>10 000 сум</td>
                <td>
                    <Button type="danger" icon={<MinusOutlined />} shape="circle" size="small"/>
                </td>
            </tr>
            <tr>
                <td>
                    <UserNameWrapper to={`/groups/1/student/5`}>
                        <Avatar
                            src="http://api.eon.loc/images/users/5/65fee7998e5521175390b9ac1b127dc6.jpg"
                            alt={''}
                            width="38px"
                            mr="0.75rem"/>
                        Цой Владлен
                    </UserNameWrapper>
                    {/*<UserNameWrapper to={`/groups/${record.group_id}/student/${record.id}`}>*/}
                    {/*    <Avatar*/}
                    {/*        src={record.image}*/}
                    {/*        alt={`${record.last_name} ${record.first_name}`}*/}
                    {/*        width="38px"*/}
                    {/*        mr="0.75rem"/>*/}
                    {/*    {record.last_name} {record.first_name}*/}
                    {/*</UserNameWrapper>*/}
                </td>
                <td>
                    <Link to={`/groups/1`}>Group</Link>
                </td>
                <td>Ментальная арифметика</td>
                <td>10 000 сум</td>
                <td>
                    <Button type="danger" icon={<MinusOutlined />} shape="circle" size="small"/>
                </td>
            </tr>
            </tbody>
        </StudentsTable>
    );
};

export default StudentTable;
import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
tr.ant-table-expanded-row, tr.ant-table-expanded-row:hover{
  //background: none;
}

.ant-table-scroll &{
  border-collapse: collapse;
  background: white;

  th{
    text-align: center;

  }

  th, td {
    padding: 0.5rem;
    border: 1px solid #E8E8E8;
    text-align: center;

    b{
      color: ${props => props.theme.color_second};
    }
  }
}

.success{
  color: ${props => props.theme.color_success};
}
.danger{
  color: ${props => props.theme.color_danger};
}

.warning{
  color: ${props => props.theme.color_warning};
}

.primary{
  color: ${props => props.theme.color_primary};
}
`;

const FranchiseTableExpanded: React.FC<any> = ({record}) => {
    return <TableWrapper>
        <thead>
        <tr>
            <th colSpan={2}>Центров</th>
            <th colSpan={4}>Учителей</th>
            <th colSpan={4}>Учеников</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><b>Всего:</b> {record.number_of_centers.all}</td>
            <td><b>Активные:</b> <span className="success">{record.number_of_centers.active}</span></td>

            <td><b>Всего:</b> {record.number_of_teachers.all}</td>
            <td><b>Открытых:</b> <span className="success">{record.number_of_teachers.open}</span></td>
            <td><b>Активных:</b> <span className="primary">{record.number_of_teachers.active}</span></td>
            <td><b>Тестовых:</b> <span className="warning">{record.number_of_teachers.test}</span></td>

            <td><b>Всего:</b> {record.number_of_students.all}</td>
            <td><b>Открытых:</b> <span className="success">{record.number_of_students.open}</span></td>
            <td><b>Активных:</b> <span className="primary">{record.number_of_students.active}</span></td>
        </tr>
        <tr>
            <td colSpan={2}/>
            <td colSpan={4}>
                <b>Стоимость:</b> {record.number_of_teachers.cost} сум
            </td>
            <td colSpan={4}>
                <b>Стоимость:</b> {record.number_of_students.cost} сум
            </td>
        </tr>
        </tbody>
    </TableWrapper>
};

export default FranchiseTableExpanded;
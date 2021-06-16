import React from "react"
import {useApiUserGeneral} from "effects/use-api-user-general.effect"
import {useParams} from "react-router-dom"
import {LoadingBlock} from "lib"
import Avatar from "../../../../../../../../../../../../lib/avatar/Avatar"
import styled from "styled-components"
import {Tag} from "antd"

const StepStyled = styled.div`
  h3 {
    text-align: center;
    
    span {
      color: ${props => props.theme.color_second};
    }
  }
`

const TableStyled = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  
  thead {
      
  }
  
  td, th {
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.light_color_border};
  }
`

const Results = () => {
    const {id} = useParams<any>()
    const [loading, results] = useApiUserGeneral({url: `teacher/olympiad/${id}/results`})

    if (loading)
        return <LoadingBlock/>

    return (
        <div>
            {results.map((result: any, key: number) =>
                <StepStyled key={key}>
                    <h3>Этап #{result.step + 1} <span>/</span> {result.title}</h3>
                    <TableStyled>
                        <thead>
                        <th>ID</th>
                        <th>Фото</th>
                        <th>Имя</th>
                        <th>Название</th>
                        <th>Результат</th>
                        <th>Всего</th>
                        <th>Выполненно</th>
                        </thead>
                        <tbody>
                        {result.users.map((user: any, key: number) => {
                                const rowSpan = user.results.length > 0 ? user.results.length : 1
                                return user.student && [
                                    <tr key={`a_${key}`}>
                                        <td rowSpan={rowSpan}>{user.student.id}</td>
                                        <td rowSpan={rowSpan}>
                                            <Avatar src={user.student.image} alt={user.student.first_name}/>
                                        </td>
                                        <td rowSpan={rowSpan}>{user.student.first_name} {user.student.last_name}</td>
                                        {
                                            user.results[0] && [
                                                <td key={`title-${key}`}>{user.results[0].title}</td>,
                                                <td key={`exodus-${key}`}>
                                                    {
                                                        user.results[0].result.exodus ?
                                                            <Tag color="success">Успех</Tag> :
                                                            <Tag color="error">Ошибка</Tag>
                                                    }
                                                </td>,
                                                <td key={`countAll-${key}`}>{user.results[0].result.countAll}</td>,
                                                <td key={`countSuccess-${key}`}>{user.results[0].result.countSuccess}</td>
                                            ]
                                        }
                                    </tr>,
                                    user.results && user.results.length > 1 &&
                                    user.results.map((result: any, index: number) =>
                                        index !== 0 ? <tr key={`b_${key}_${index}`}>
                                            <td>{result.title}</td>
                                            <td>
                                                {
                                                    result.result.exodus ?
                                                        <Tag color="success">Успех</Tag> :
                                                        <Tag color="error">Ошибка</Tag>
                                                }
                                            </td>
                                            <td>{result.result.countAll}</td>
                                            <td>{result.result.countSuccess}</td>
                                        </tr> : null
                                    )
                                ]
                            }
                        )}
                        </tbody>
                    </TableStyled>
                </StepStyled>
            )}
        </div>
    )
}

export default Results
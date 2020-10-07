import React from "react"
import styled from "styled-components"
import {PlusOutlined} from "@ant-design/icons"

const TasksContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
`

const AddTaskStyled = styled.div`
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 1rem;
    background: ${(props) => props.theme["@layout-body-background"]};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    .anticon {
        font-size: 65px;
        margin-bottom: 1rem;
    }

    .title {
        font-size: 25px;
    }

    :hover {
        color: ${(props) => props.theme.color_black};
    }
`

const TaskStyled = styled.div`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 1rem;
`

const Container = () => {
    return (
        <>
            <TasksContainerStyled>

                <TaskStyled>
                    <h2>Анзан</h2>
                </TaskStyled>

                <AddTaskStyled>
                    <PlusOutlined/>
                    <span className="title">Добавить задание</span>
                </AddTaskStyled>
            </TasksContainerStyled>
        </>
    )
}

export default Container

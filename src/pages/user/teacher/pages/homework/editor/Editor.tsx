import React, {useEffect, useState} from "react"
// import {LoadingBlock} from "lib/ui"
import {Prompt} from "react-router-dom"
// import TabsTasks from "./tabs-tasks/TabsTasks"
// import ButtonSaveHomework from "./save/ButtonSaveHomework"
import {useChangeTitle} from "../../../../../../hooks/old/use-change-title.effect"
import {useChangeActionNavbar} from "../../../../../../hooks/old/use-change-action-navbar.effect"
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect"
import Container from "./container/Container"
import styled from "styled-components"

const EditorHomeworkStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${props => props.theme["@component-background"]};
`

interface EditorHomeworkProps {
    match: any
}

const EditorHomework: React.FC<EditorHomeworkProps> = ({match}) => {
    // const [exercises, setExercises]: any = useState([])
    const [, setExercises]: any = useState([])
    const [loading, homework] = useApiUserGeneral({
        url: `/teacher/homework/${match.params.id}`,
        cancel: !match.params.id
    })

    useChangeActionNavbar({action: "back"})
    useChangeTitle({
        title: match.params.id
            ? match.params.duplication
                ? "Дублировать домашнее задание"
                : "Редактировать домашнее задание"
            : "Создать домашнее задание"
    })

    useEffect(() => {
        if (!loading && homework?.tasks) setExercises(homework.tasks)
    }, [homework, loading])


    const formIsHalfFilledOut = () => {
        return window.confirm('sasasas')
    }

    return (
        <EditorHomeworkStyled>
            <Prompt
                message={formIsHalfFilledOut}
            />
            <Container/>
            {/*{!loading ? (*/}
            {/*    <TabsTasks*/}
            {/*        homework={homework}*/}
            {/*        exercises={exercises}*/}
            {/*        setExercises={setExercises}*/}
            {/*    >*/}
            {/*        <ButtonSaveHomework*/}
            {/*            homework={homework}*/}
            {/*            exercises={exercises}*/}
            {/*        />*/}
            {/*    </TabsTasks>*/}
            {/*) : (*/}
            {/*    <LoadingBlock />*/}
            {/*)}*/}
        </EditorHomeworkStyled>
    )
}

export default EditorHomework

import React, {useEffect, useState} from "react"
// import {LoadingBlock} from "lib/ui"
import {Prompt} from "react-router-dom"
// import TabsTasks from "./tabs-tasks/TabsTasks"
// import ButtonSaveHomework from "./save/ButtonSaveHomework"
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect"
import Container from "./container/Container"
import {useChangeConfigPageEffect} from "../../../../../../hooks/use-change-config-page.effect"

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

    useChangeConfigPageEffect({
        title: match.params.id
            ? match.params.duplication
                ? "Дублировать домашнее задание"
                : "Редактировать домашнее задание"
            : "Создать домашнее задание",
        action: "back",
        container: true
    })

    useEffect(() => {
        if (!loading && homework?.tasks) setExercises(homework.tasks)
    }, [homework, loading])


    const formIsHalfFilledOut = () => {
        return window.confirm('sasasas')
    }

    return (
        <>
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
        </>
    )
}

export default EditorHomework

import React from "react"
import SentHomeworkStudentButton from "./sent-homework-button/SentHomeworkStudentButton"

const HomeworkActions = () => {
    return (
        <>
            <SentHomeworkStudentButton/>
        </>
    )
}

export default React.memo(HomeworkActions)
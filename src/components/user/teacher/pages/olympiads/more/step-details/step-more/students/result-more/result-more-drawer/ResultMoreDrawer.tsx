import React from "react"
import {useApiUserGeneral} from "../../../../../../../../../../../effects/use-api-user-general.effect"
import CollapseHomework from "../../../../../../../groups/student/homework/collapse/Collapse"
import {LoadingBlock} from "../../../../../../../../../../../lib"

interface ResultMoreDrawerProps {
    student: any
    stepId: any
}

const ResultMoreDrawer:React.FC<ResultMoreDrawerProps> = ({student, stepId}) => {
    const [loading, result] = useApiUserGeneral({url: `teacher/olympiad/step/${stepId}/student/${student.id}/result`});

    if(loading)
        return <LoadingBlock/>

    return <div>
        <CollapseHomework homework={result}/>
    </div>
}

export default ResultMoreDrawer
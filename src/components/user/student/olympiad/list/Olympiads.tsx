import React, {useState} from "react"
import CurrentOlympiads from "./current/CurrentOlympiads"
import Available from "./available/Available"

interface OlympiadProps {

}

const Olympiads: React.FC<OlympiadProps> = () => {
    const [key, setKey] = useState(1)

    return <>
        <CurrentOlympiads key={`current-${key}`} setKey={setKey}/>
        <Available key={`available-${key}`} setKey={setKey}/>
    </>
}

export default Olympiads
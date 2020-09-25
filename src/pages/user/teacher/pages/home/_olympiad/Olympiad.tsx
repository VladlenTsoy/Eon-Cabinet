import React from "react"
import Header from "../_header/Header"
import Step from "./step/Step"
import Final from "./final/Final"

const Olympiad = () => {
    return (
        <>
            <Header type="olympiad" title="Тренировка мозга" date="16:20 18 авг"/>
            <Step/>
            <Header type="olympiad" title="Тренировка мозга" date="16:20 18 авг"/>
            <Final/>
        </>
    )
}

export default Olympiad

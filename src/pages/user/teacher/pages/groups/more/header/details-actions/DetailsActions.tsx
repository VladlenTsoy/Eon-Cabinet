import React from "react"
import CoinButton from "./coin-button/CoinButton"
import AddStudent from "./add-student/AddStudent"

const DetailsActions = () => {
    return (
        <>
            <AddStudent/>
            <CoinButton/>
        </>
    )
}

export default React.memo(DetailsActions)

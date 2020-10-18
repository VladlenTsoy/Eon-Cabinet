import React from "react"

interface TabProps {
    active: boolean
}

const Tab: React.FC<TabProps> = ({children, active}) => {
    return (
        <div className="animated fadeIn" style={{display: active ? "block" : "none"}}>
            {children}
        </div>
    )
}

export default Tab

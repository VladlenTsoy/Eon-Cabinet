import React from "react"

interface TabProps {
    title: String | React.ReactNode
}

const Tab: React.FC<TabProps> = ({children}) => {
    return <div>{children}</div>
}

export default Tab

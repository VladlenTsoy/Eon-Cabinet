import React from "react"
import styled from "styled-components"

const TabStyle = styled.div``

interface TabProps {
    title: String | React.ReactNode
}

const Tab: React.FC<TabProps> = ({children}) => {
    return <TabStyle>{children}</TabStyle>
}

export default Tab

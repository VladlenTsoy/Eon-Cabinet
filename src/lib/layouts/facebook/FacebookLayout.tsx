import React from "react"
import {Layout} from "antd"
import Header from "./header/Header"
import {NavigationItemProps} from "./header/navigation/Navigation"
import styled from "styled-components"

const ContainerStyled = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const ScrollStyled = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 1rem;
`

interface FacebookLayout {
    navigations: NavigationItemProps[],
    sidebars: React.ReactFragment[],
    accountMenu: React.ReactFragment[],
}

const FacebookLayout: React.FC<FacebookLayout> = ({children, navigations, sidebars, accountMenu}) => {
    return <Layout style={{height: "100vh"}}>
        <Header navigations={navigations} sidebars={sidebars} accountMenu={accountMenu}/>
        <ContainerStyled id="container" className="draw-container">
            <ScrollStyled>
                {children}
            </ScrollStyled>
        </ContainerStyled>
    </Layout>
}

export default FacebookLayout
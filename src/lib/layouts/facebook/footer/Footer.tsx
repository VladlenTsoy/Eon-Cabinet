import React from "react"
import styled from "styled-components"
import Navigation, {NavigationItemProps} from "../header/navigation/Navigation"

const FooterStyled = styled.div`
  height: 60px;
  background: ${props => props.theme['@component-background']};
  box-shadow: rgba(0,0,0,0.05) 0 2px 15px 0;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

interface FooterProps {
    navigations: NavigationItemProps[],
}

const Footer:React.FC<FooterProps> = ({navigations}) => {
    return (
        <FooterStyled>
            <Navigation menu={navigations} />
        </FooterStyled>
    )
}

export default Footer
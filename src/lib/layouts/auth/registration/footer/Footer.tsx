import React from "react"
import styled from "styled-components"

const FooterStyled = styled.div`
    text-align: center;
    margin-bottom: 0.5rem;
`

const Footer = () => {
    return (
        <FooterStyled>
            Copyright © 2020 Eon. Developed by Vladlen
        </FooterStyled>
    )
}

export default React.memo(Footer)
import React from 'react';
import styled from "styled-components";

const FooterStyled = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Footer = () => {
    const d = new Date()
    const currentYear = d.getFullYear()

    return <FooterStyled>
         Copyright &copy; {currentYear} Eon. Developed by Vladlen
    </FooterStyled>;
};

export default Footer;
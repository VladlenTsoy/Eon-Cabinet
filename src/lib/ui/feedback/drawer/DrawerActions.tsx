import styled from "styled-components";

const DrawerActions = styled.div`
  position: absolute;
  background: ${props => props.theme['@component-background']};
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 16px;
  text-align: right;
  z-index: 1;
  box-shadow: 0 -2px 15px 0 rgba(0,0,0,.05);
`;

export default DrawerActions;
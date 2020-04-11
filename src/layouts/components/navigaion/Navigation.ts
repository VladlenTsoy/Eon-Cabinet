import React from "react";
import styled from "styled-components";

type Navigation = React.HTMLAttributes<HTMLDivElement>

const Navigation: React.FC<Navigation> = styled.div`
  //margin-bottom: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  //padding: 0 0 1rem;
  padding: 1rem;
  margin: -1rem -1rem 0;
`;

export default Navigation;
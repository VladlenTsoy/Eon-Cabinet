import {Link} from "react-router-dom";
import styled from "styled-components";

const TextLink = styled(Link)<any>`
  float: ${props => props.position || 'inherit'}
  vertical-align: center;

  i{
    vertical-align: center;
    margin-right: 0.5rem;
  }
`;

export default TextLink;
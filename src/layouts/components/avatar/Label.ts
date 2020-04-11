import styled from "styled-components";

const AvatarLabelWrapper = styled.label`
  cursor: pointer;
  height: 140px;
  width: 140px;
  border: 4px solid #fff;
  margin: 0 auto 1.5rem;
  box-shadow: ${props => props.theme.shadow_primary};
  overflow: hidden;
  position: relative;
  text-align: center;
  border-radius: 50%;
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input[type='file'] {
    display: none;
  }
`;

export default AvatarLabelWrapper;
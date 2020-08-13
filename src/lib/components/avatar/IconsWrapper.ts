import styled from "styled-components";

export const IconsWrapper = styled.div`
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 color: #ffffff;
 display: flex;
 align-items: center;
 justify-content: center;
 background: rgba(0, 0, 0, 0.2);
`;

export const IconWrapper = styled.p`
 margin-bottom: 0;
 display: flex;
 align-items: center;

 .anticon {
    font-size: 25px;
 }
`;

export const IconEditWrapper = styled(IconsWrapper)`
 .anticon {
    font-size: 20px;
    margin-right: 0.5rem;
 }
`;
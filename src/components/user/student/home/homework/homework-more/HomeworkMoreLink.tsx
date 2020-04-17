import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const MoreWrapper: any = styled(Link)`
   height: calc(100% - 1.5rem);
   margin-bottom: 1.5rem;
   // border: 2px dashed ${props => props.theme.light_color_border};;
   color: ${props => props.theme.color_second};
   border-radius: 10px;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: center;
   text-transform: uppercase;
   font-size: 20px;
   font-weight: 900;
   padding: 2rem 1rem;
   text-align: center;
   transition: all 0.5s ease-in-out;
   
   &:hover{
     color: ${props => props.theme.color_main};
   }
   
   .anticon{
     margin-bottom: 0.5rem;
     font-size: 60px;
   }
   
   @media (max-width: 576px) {
    padding: 3rem 2rem;
   }
`;

const HomeworkMoreLink = () => {
    const {language} = useSelector((state: any) => state);

    return (
      <MoreWrapper to="/homework" className="animated fadeIn">
          <ArrowRightOutlined />
          <span>{language.student.view_all_homework}</span>
      </MoreWrapper>
    );
};

export default React.memo(HomeworkMoreLink);
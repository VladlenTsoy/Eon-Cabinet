import React from "react";
import styled from "styled-components";
import {FlagOutlined, HomeOutlined, CheckCircleOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {Card} from "lib";
import {Button} from "antd";
import {useAppContext} from "store/context/use-app-context";

const HomeworkWrapper = styled.div`
  display: block;
  text-align: center;
  padding: 0.5rem 0;
  
  .icon-block{
    font-size: 45px;
    margin-bottom: 0.5rem;

    .anticon-home{
       color: ${props => props.theme.color_warning};
    }
        
    .anticon-check-circle{
       color: ${props => props.theme.color_success};
    }
  }
  
  .info-block{
     margin-bottom: 1.5rem;
     
     p {
      margin: 0;
     }
     
     .sub-title{
      font-size: 12px;
      color: ${props => props.theme.color_second};
     }
     
     .title{
      font-size: 20px;
      font-weight: 900;
     }
  }
`;

interface HomeworkBlockProps {
    homework: any;
}

const HomeworkBlock: React.FC<HomeworkBlockProps> = ({homework}) => {
    const {language} = useAppContext();
    return (
        <Card className="animated fadeIn">
            <HomeworkWrapper>
                <div className="icon-block">
                    {homework.status === 1 ? <CheckCircleOutlined/> : <HomeOutlined/>}
                </div>
                <div className="info-block">
                    <p className="sub-title">{language.common.homework}</p>
                    <p className="title">{language.common.level} № {homework.level}</p>
                </div>
                <Link to={`/homework/${homework.id}`}>
                    <Button icon={<FlagOutlined/>} block>
                        {language.common.more}
                    </Button>
                </Link>
            </HomeworkWrapper>
        </Card>
    );
};

export default HomeworkBlock;
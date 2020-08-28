import React from 'react';
import styled from "styled-components";
import {CloseOutlined, ArrowLeftOutlined, SearchOutlined} from '@ant-design/icons'

const HeaderStyled = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  // border-bottom: 1px solid ${props => props.theme.light_color_border};  
  //color: ${props => props.theme.color_black};
  
  > div {
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    
    > div {
      padding: 0.5rem 0.5rem;
      
      &.back, &.close{
        cursor: pointer;
        
        :hover {
          color: ${props => props.theme.color_primary};
        }
      }
    }
  }
`

interface HeaderProps {
    close: () => void
    contact: any
    back: () => void
}

const Header: React.FC<HeaderProps> = ({contact, back, close}) => {
    return <HeaderStyled>
        {
            contact ?
                <div>
                    <div className="back" onClick={back}><ArrowLeftOutlined/></div>
                    <div>
                        {contact.first_name} {contact.last_name}
                    </div>
                    <div className="close" onClick={close}><CloseOutlined/></div>
                </div> :
                <div>
                    <div>
                        <SearchOutlined/>
                    </div>
                    <div>Список контактов</div>
                    <div className="close" onClick={close}><CloseOutlined/></div>
                </div>
        }
    </HeaderStyled>
};

export default Header;
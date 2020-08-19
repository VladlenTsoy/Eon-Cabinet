import * as React from "react";
import styled from "styled-components";
import {Typography} from "antd";

const {Title} = Typography;

interface StyledProps {
    icons?: boolean;
}

const CardHeaderWrapper: React.FC<StyledProps> = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  h4.ant-typography{
    margin: 0;
    color: ${props => props.icons ? props.theme['@text-color-secondary'] : props.theme['@text-color']};
  }
`;

const CardHeaderActionWrapper: React.FC<StyledProps> = styled.div<StyledProps>`
    .anticon {
    font-size: ${props => props.icons ? '18px' : 'initial'};
    cursor: pointer;

    :hover {
      color: ${props => props.theme.color_primary};
    }

    :first-child {
      margin-right: ${props => props.icons ? '1rem' : 'initial'};
    }
  }
`;

type CardHeaderProps = StyledProps & {
    title: string,
}

const CardHeader: React.FC<CardHeaderProps> = ({title, icons, children}) => {
    return <CardHeaderWrapper icons={icons}>
        <Title level={4}>{title}</Title>
        <CardHeaderActionWrapper icons={icons}>
            {children}
        </CardHeaderActionWrapper>
    </CardHeaderWrapper>
};

export default CardHeader;
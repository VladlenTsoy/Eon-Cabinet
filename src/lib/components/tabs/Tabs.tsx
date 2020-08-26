import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const TabsStyled = styled.div`
  display: flex;
`

const MenuStyled = styled.div`
  
`

interface ItemStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
}

const ItemStyled: React.FC<ItemStyledProps> = styled.div<ItemStyledProps>`
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#ffffff' : '#ffffff73'};
  margin-bottom: 0.25rem;
  box-shadow: ${props => props.active ? '0 5px 10px 0 rgba(0,0,0,0.1)' : 'none'};
  white-space: nowrap;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`

const ContainerStyled = styled.div`
  padding-left: 1rem;
  width: 100%;
`

interface TabStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const TabStyled: React.FC<TabStyledProps> = styled.div<TabStyledProps>`
  display: ${props => props.visible ? 'block' : 'none'};
`

interface TabsProps {
    defaultValue?: string
}

const Tabs: React.FC<TabsProps> = ({defaultValue = null, children}) => {
    const [visible, setVisible] = useState<string | null>(defaultValue)

    const clickHandler = (key: string) => {
        setVisible(key)
    }

    useEffect(() => {
        if (!defaultValue) {
            // @ts-ignore
            setVisible(children[0].key)
        }
    }, [defaultValue])

    return <TabsStyled>
        <MenuStyled>
            {React.Children.map(children, (child: any) =>
                <ItemStyled
                    key={child.key} active={visible === child.key}
                    onClick={() => clickHandler(child.key)}
                >
                    {child.props.title}
                </ItemStyled>
            )}
        </MenuStyled>
        <ContainerStyled>
            {React.Children.map(children, (child: any) =>
                <TabStyled key={child.key} visible={visible === child.key} className="animated fadeIn">
                    {child}
                </TabStyled>
            )}
        </ContainerStyled>
    </TabsStyled>
};

export default Tabs;
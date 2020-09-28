import React, {useState} from "react"
import styled from "styled-components"

const TabsStyled = styled.div`
    display: flex;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`

const MenuStyled = styled.div`
    @media (max-width: 480px) {
        display: flex;
        overflow-x: auto;
    }
`

interface ItemStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
}

const ItemStyled: React.FC<ItemStyledProps> = styled.div<ItemStyledProps>`
    padding: 0.75rem 1rem;
    background: ${(props) =>
        props.active
            ? props.theme["@component-background"]
            : `${props.theme["@component-background"]}73`};
    color: ${(props) =>
        props.active ? props.theme.color_main : props.theme.color_second};
    margin-bottom: 0.3rem;
    box-shadow: ${(props) =>
        props.active ? "0 5px 10px 0 rgba(0,0,0,0.1)" : "none"};
    white-space: nowrap;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    > span {
        .anticon {
            margin-right: 0.5rem;
        }
    }

    @media (max-width: 480px) {
        :not(:last-child) {
            margin-right: 0.5rem;
        }
    }
`

const ContainerStyled = styled.div`
    padding-left: 1rem;
    width: 100%;

    @media (max-width: 480px) {
        padding-top: 1rem;
        padding-left: 0;
    }
`

interface TabStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const TabStyled: React.FC<TabStyledProps> = styled.div<TabStyledProps>`
    display: ${(props) => (props.visible ? "block" : "none")};
`

interface TabsProps {
    defaultValue?: string | null
    onChange?: (key: string) => void
}

const Tabs: React.FC<TabsProps> = ({
    defaultValue = null,
    children,
    onChange
}) => {
    const [visible, setVisible] = useState<string | null>(defaultValue)

    const clickHandler = (key: string) => {
        onChange && onChange(key)
        setVisible(key)
    }

    return (
        <TabsStyled>
            <MenuStyled>
                {React.Children.map(children, (child: any) => (
                    <ItemStyled
                        key={child.key}
                        active={visible === child.key}
                        onClick={() => clickHandler(child.key)}
                    >
                        {typeof child.props.title === "function"
                            ? child.props.title(child.key === visible)
                            : child.props.title}
                    </ItemStyled>
                ))}
            </MenuStyled>
            <ContainerStyled>
                {React.Children.map(
                    children,
                    (child: any) =>
                        visible === child.key && (
                            <TabStyled
                                key={child.key}
                                visible={visible === child.key}
                                className="animated fadeIn"
                            >
                                {child}
                            </TabStyled>
                        )
                )}
            </ContainerStyled>
        </TabsStyled>
    )
}

export default Tabs

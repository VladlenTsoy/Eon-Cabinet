import React from "react"
import style from "./Container.module.css"
import Tab from "./tab/Tab"

interface ContainerProps {
    visible: string | null
}

const Container: React.FC<ContainerProps> = ({children, visible}) => {
    return (
        <div className={style.container}>
            {React.Children.map(
                children,
                (child: any) =>
                    visible === child.key && (
                        <Tab key={child.key} active={visible === child.key}>
                            {child}
                        </Tab>
                    )
            )}
        </div>
    )
}

export default Container

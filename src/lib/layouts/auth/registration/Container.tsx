import React from "react"
import {Form} from "antd"
import {useLanguage} from "../../../../hooks/use-language"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"
import styles from "./Container.module.less"

interface ContainerProps {
    handleSubmit: (params: any) => void
}

const Container: React.FC<ContainerProps> = ({children, handleSubmit}) => {
    const {l} = useLanguage()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    return (
        <div className={styles.container}>
            {!isBreakpoint && <div className={styles.image} />}
            <div className={styles.content}>
                <h1 className={styles.title}>{l("registration")}</h1>
                <p className={styles.subTitle}>{l("registration_sub_title")}</p>
                <Form layout="vertical" size="large" onFinish={handleSubmit}>
                    {children}
                </Form>
            </div>
        </div>
    )
}

export default Container

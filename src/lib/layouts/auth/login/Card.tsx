import React from "react"
import {Form} from "antd"
import {Card as CardStyled} from "lib/ui"
import styles from "./Card.module.less"

interface CardProps {
    title: string;
    subTitle?: string;
    onFinish: (values: any) => void;
}

const Card: React.FC<CardProps> = ({title, subTitle, onFinish, children}) => {
    return <CardStyled>
        <h1 className={styles.title}>{title}</h1>
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        <Form onFinish={onFinish} size="large" layout="vertical" className={styles.form}>
            {children}
        </Form>
    </CardStyled>
}

export default Card

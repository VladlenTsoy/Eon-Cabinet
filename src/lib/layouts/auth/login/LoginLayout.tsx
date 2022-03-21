import React from "react"
import styles from "./LoginLayout.module.less"
import Footer from "./Footer"
import Card from "./Card"
import HeaderLanguage from "./HeaderLanguage"

interface LoginLayoutProps {
    title: string
    subTitle?: string
    onFinish: (values: any) => void
}

const LoginLayout: React.FC<LoginLayoutProps> = (
    {
        title,
        subTitle,
        onFinish,
        children
    }
) => {
    return (
        <div className={styles.layout}>
            <HeaderLanguage />
            <div className={styles.scroll}>
                <div className={styles.content}>
                    <Card
                        title={title}
                        subTitle={subTitle}
                        onFinish={onFinish}
                    >
                        {children}
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginLayout

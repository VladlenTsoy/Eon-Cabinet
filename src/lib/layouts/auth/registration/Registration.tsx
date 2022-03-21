import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Container from "./Container"
import styles from "./Registration.module.less"

interface RegistrationProps {
    handleSubmit: (params: any) => void
}

const RegistrationLayout: React.FC<RegistrationProps> = (
    {
        handleSubmit,
        children
    }
) => {
    return (
        <div className={styles.registration}>
            <Header />
            <Container handleSubmit={handleSubmit}>{children}</Container>
            <Footer />
        </div>
    )
}

export default RegistrationLayout

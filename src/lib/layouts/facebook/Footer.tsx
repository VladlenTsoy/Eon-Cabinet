import React from "react"
import styles from "./Footer.module.less"
import Navigation, {NavigationItemProps} from "./header/navigation/Navigation"

interface FooterProps {
    navigations: NavigationItemProps[],
}

const Footer: React.FC<FooterProps> = ({navigations}) => {
    return (
        <div className={styles.footer}>
            <Navigation menu={navigations} />
        </div>
    )
}

export default Footer

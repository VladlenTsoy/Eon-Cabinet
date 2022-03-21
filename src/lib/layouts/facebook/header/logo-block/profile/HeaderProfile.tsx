import React from "react"
import {Link} from "react-router-dom"
import styles from "./HeaderProfile.module.less"
import {Avatar} from "lib/ui"
import {useUser} from "../../../../../../hooks/use-user"
import cn from "classnames"

interface HeaderProfileProps {
    mr?: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({mr}) => {
    const {user} = useUser()

    return (
        <Link className={styles.headerProfile} to="/profile" style={{marginRight: mr || "0.5rem"}}>
            <Avatar src={user.url_image} alt={`${user.last_name} ${user.first_name}`} />
            <div className={styles.data}>
                <span className={styles.userName}>
                    {user.last_name} {user.first_name}
                </span>
                <span className={cn(styles.userId, "second")}>
                    Ваш ID: <span>{user.id}</span>
                </span>
            </div>
        </Link>
    )
}

export default HeaderProfile

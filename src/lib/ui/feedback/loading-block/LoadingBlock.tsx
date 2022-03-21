import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {Spin} from "antd"
import styles from "./LoadingBlock.module.less"
import cn from "classnames"
import {useTranslation} from "react-i18next"

interface LoadingBlockProps {
    title?: string | null
    maxHeight?: string
}

const LoadingBlock: React.FC<LoadingBlockProps> = (
    {
        title,
        maxHeight = "100%"
    }
) => {
    const {t} = useTranslation("common")

    return (
        <div
            className={cn("animated fadeIn", styles.loading)}
            style={{maxHeight, padding: title === null ? "0" : "2rem"}}
        >
            <div className={styles.container} style={{marginBottom: title === null ? "0" : "1rem"}}>
                <Spin indicator={<LoadingOutlined />} />
                {title === null ? (
                    <></>
                ) : (
                    <p>{title || `${t("loading")}...`}</p>
                )}
            </div>
        </div>
    )
}

export default React.memo(LoadingBlock)

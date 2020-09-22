import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {Spin} from "antd"
import styled from "styled-components"
import {useLanguage} from "../../../hooks/use-language"

interface LoadingStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    maxHeight: string
    padding: string
}

const LoadingWrapper: React.FC<LoadingStyledProps> = styled.div<
    LoadingStyledProps
>`
    display: flex;
    //height: calc(100% - 150px);
    height: 100%;
    max-height: ${(props) => props.maxHeight};
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${(props) => props.padding};
`

interface ContainerStyledProps {
    marginBottom: string
}

const Container: React.FC<ContainerStyledProps> = styled.div<
    ContainerStyledProps
>`
    text-align: center;
    font-size: 30px;

    .anticon {
        font-size: 50px;
        margin-bottom: ${(props) => props.marginBottom};
    }

    p {
        margin-bottom: 0;
    }
`

interface LoadingBlockProps {
    title?: string | null
    maxHeight?: string
}

const LoadingBlock: React.FC<LoadingBlockProps> = ({
    title,
    maxHeight = "100%"
}) => {
    const {l} = useLanguage()

    return (
        <LoadingWrapper
            className="animated fadeIn"
            maxHeight={maxHeight}
            padding={title === null ? "0" : "2rem"}
        >
            <Container marginBottom={title === null ? "0" : "1rem"}>
                <Spin indicator={<LoadingOutlined />} />
                {title === null ? (
                    <></>
                ) : (
                    <p>{title || `${l("loading")}...`}</p>
                )}
            </Container>
        </LoadingWrapper>
    )
}

export default React.memo(LoadingBlock)

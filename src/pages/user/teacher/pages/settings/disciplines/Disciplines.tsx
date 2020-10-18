import React from "react"
import Tabs from "../../../../../../lib/ui/data-display/tabs/Tabs"
import Tab from "../../../../../../lib/ui/data-display/tabs/Tab"
import {FolderOutlined, FolderOpenOutlined} from "@ant-design/icons"
import {Card} from "../../../../../../lib/ui"

const Disciplines = () => {
    return (
        <>
            <Tabs>
                <Tab
                    title={(visible: boolean) =>
                        visible ? (
                            <span>
                                <FolderOpenOutlined />
                                Категории
                            </span>
                        ) : (
                            <span>
                                <FolderOutlined />
                                Категории
                            </span>
                        )
                    }
                    key={`categories`}
                >
                    <Card>
                        <div>asd</div>
                    </Card>
                </Tab>
                <Tab
                    title={(visible: boolean) =>
                        visible ? (
                            <span>
                                <FolderOpenOutlined />
                                Дисциплины
                            </span>
                        ) : (
                            <span>
                                <FolderOutlined />
                                Дисциплины
                            </span>
                        )
                    }
                    key={`disciplines`}
                >
                    <Card>
                        <div>asd</div>
                    </Card>
                </Tab>
                <Tab
                    title={(visible: boolean) =>
                        visible ? (
                            <span>
                                <FolderOpenOutlined />
                                Название формул
                            </span>
                        ) : (
                            <span>
                                <FolderOutlined />
                                Название формул
                            </span>
                        )
                    }
                    key={`formulas`}
                >
                    <Card>
                        <div>asd</div>
                    </Card>
                </Tab>
            </Tabs>
        </>
    )
}

export default Disciplines
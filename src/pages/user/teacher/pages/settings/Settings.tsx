import React from "react"
import Tab from "../../../../../lib/components/tabs/Tab"
import {Card} from "../../../../../lib/ui"
import Tabs from "../../../../../lib/components/tabs/Tabs"
import {FolderOutlined} from "@ant-design/icons"

const Categories = React.lazy(() => import("./categories/Categories"))
const Payments = React.lazy(() => import("./payments/Payments"))
const CustomExercises = React.lazy(
    () => import("./custom-exercises/CustomExercises")
)

const Settings: React.FC = () => {
    return (
        <>
            <Tabs>
                <Tab
                    title={
                        <span>
                            <FolderOutlined />
                            Дисциплины
                        </span>
                    }
                    key={`disciplines`}
                >
                    <Card>
                        <div>asd</div>
                    </Card>
                </Tab>
                <Tab
                    title={
                        <span>
                            <FolderOutlined />
                            Категории
                        </span>
                    }
                    key={`categories`}
                >
                    <React.Suspense fallback={<>Загрузка...</>}>
                        <Categories/>
                    </React.Suspense>

                </Tab>
                <Tab
                    title={
                        <span>
                            <FolderOutlined />
                            Название формул
                        </span>
                    }
                    key={`formulas`}
                >
                    <Card>
                        <div>asd</div>
                    </Card>
                </Tab>
                <Tab
                    title={
                        <span>
                            <FolderOutlined />
                            asdasd
                        </span>
                    }
                    key={`custom-exercises`}
                >
                    <React.Suspense fallback={<>Загрузка...</>}>
                        <CustomExercises />
                    </React.Suspense>
                </Tab>
                <Tab
                    title={
                        <span>
                            <FolderOutlined />
                            Оплата
                        </span>
                    }
                    key={`payments`}
                >
                    <React.Suspense fallback={<>Загрузка...</>}>
                        <Payments />
                    </React.Suspense>
                </Tab>
            </Tabs>
        </>
    )
}

export default Settings

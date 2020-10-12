import React from "react"
import {Loader} from "../../lib/ui"

const Auth = React.lazy(() => import("./auth/index"))

const Index = () => {
    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            <Auth />
        </React.Suspense>
    )
}

export default Index

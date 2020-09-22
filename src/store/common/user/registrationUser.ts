import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "../../../utils/api"
import {detect} from "detect-browser"
import {CommonThunkProps} from "../store"

const browser = detect()

type ReturnedType = {
    token: string
}

interface ArgProps {
    first_name: string
    last_name: string
    email: string
    password: string

    browser: any
    browserVersion: any
    device: any
    screen: any
}

export const registrationUser = createAsyncThunk<
    ReturnedType,
    ArgProps,
    CommonThunkProps
>("user/registration", async (data, {signal}) => {
    data.browser = browser?.name
    data.browserVersion = browser?.version
    data.device = browser?.os
    data.screen = {
        width: window.screen.width,
        height: window.screen.height
    }
    return await apiRequest("post", `registration`, {
        data,
        api2: true,
        signal,
        type: "guest"
    })
})

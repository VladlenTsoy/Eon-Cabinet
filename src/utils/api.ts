import axios from "axios"
import {message} from "./message"
import {Discipline} from "../lib/types/common/Discipline"
import {getCookie, removeCookie, setCookie} from "./cookie"

const CancelToken = axios.CancelToken
const DOMAIN_API = process.env.NODE_ENV === "production" ? "https://api.eon.uz/api" : "http://192.168.1.37:8000/api"
const DOMAIN_API_2 = process.env.NODE_ENV === "production" ? "https://api2.eon.uz/api" : "http://192.168.1.37:4000/api"
// export const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://localhost:3001';

const TOKEN = getCookie("token_access")

export const api = {
    token: TOKEN || null,
    guest: axios.create({
        baseURL: DOMAIN_API,
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    user: axios.create({
        baseURL: DOMAIN_API + "/user",
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    teacher: axios.create({
        baseURL: DOMAIN_API + "/user/teacher/1",
        headers: {common: {Authorization: "Bearer " + TOKEN}}
    }),
    guest_2: axios.create({
        baseURL: DOMAIN_API_2,
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    user_2: axios.create({
        baseURL: DOMAIN_API_2 + "/user",
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    teacher_2: axios.create({
        baseURL: DOMAIN_API_2 + "/user/teacher/1",
        headers: {common: {Authorization: "Bearer " + TOKEN}}
    })
}

export const updateToken = (token: string | null) => {
    api.token = token
    if (token)
        setCookie("token_access", token, {expires: 30})
    else
        removeCookie("token_access")

    api.user.defaults.headers.common["Authorization"] = "Bearer " + token
    api.teacher.defaults.headers.common["Authorization"] = "Bearer " + token
    api.user_2.defaults.headers.common["Authorization"] = "Bearer " + token
    api.teacher_2.defaults.headers.common["Authorization"] = "Bearer " + token
}

export const updateDiscipline = (disciplineId: Discipline["id"]) => {
    api.teacher.defaults.baseURL = DOMAIN_API + "/user/teacher/" + disciplineId
    api.teacher_2.defaults.baseURL = DOMAIN_API_2 + "/user/teacher/" + disciplineId
}

type MethodProps =
    | "get"
    | "delete"
    | "post"
    | "put"
    | "patch";

interface ConfigRequestProps {
    type?: "teacher" | "user" | "guest"
    api2?: boolean
    data?: any;
    signal?: any,
    params?: any,
}

type ApiRequestProps = (method: MethodProps, url: string, conf?: ConfigRequestProps) => Promise<any>;

export const apiRequest: ApiRequestProps = async (method = "get", url: string, conf = {}) => {
    const {data, type = "user", signal, params, api2 = false} = conf
    const source = CancelToken.source()
    const _config = {cancelToken: source.token}

    if (signal)
        signal.addEventListener("abort", () => source.cancel())


    const selectTypeApi: any = api2 ? type + "_2" : type

    try {
        const response = method === "get" ?
            // @ts-ignore
            await api[selectTypeApi].get(url, {..._config, params}) :
            method === "patch" ?
                // @ts-ignore
                await api[selectTypeApi].patch(url, data, {..._config, params}) :
                method === "delete" ?
                    // @ts-ignore
                    await api[selectTypeApi].delete(url, {..._config, params, data}) :
                    method === "put" ?
                        // @ts-ignore
                        await api[selectTypeApi].put(url, data, {..._config, params}) :
                        // @ts-ignore
                        await api[selectTypeApi].post(url, data, {..._config, params})

        return response.data
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error("-----> ", e)
            if (e.response.status === 401) {
                message({type: "error", content: "Ошибка токена!"})
                throw Error("error_token")
            }
            message({type: "error", content: e?.response?.data?.message || e?.message || "Неизвестная ошибка!"})
            throw Error(e?.response?.data?.message || e?.message || "Неизвестная ошибка!")
        }
    }
}
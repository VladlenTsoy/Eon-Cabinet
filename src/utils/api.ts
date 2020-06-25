import axios from "axios";
import {message} from "./message";

const CancelToken = axios.CancelToken;
const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.37:8000/api';

export const api = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS') || '',
    guest: axios.create({baseURL: DOMAIN_API}),
    user: axios.create({baseURL: DOMAIN_API + '/user'}),
    teacher: axios.create({baseURL: DOMAIN_API + '/user/teacher/1'}),
};

export const updateToken = (token: string) => {
    api.token = token;
    api.user.defaults.headers.common["Authorization"] = "Bearer " + token
    api.teacher.defaults.headers.common["Authorization"] = "Bearer " + token
}

export const updateDiscipline = (disciplineId: number) => {
    api.teacher.defaults.baseURL = DOMAIN_API + '/user/teacher/' + disciplineId
}

type MethodProps =
    | 'get'
    | 'delete'
    | 'post'
    | 'put'
    | 'patch';

interface ConfigRequestProps {
    type?: 'teacher' | 'user'
    data?: any;
    signal?: any,
}

type ApiRequestProps = (method: MethodProps, url: string, conf?: ConfigRequestProps) => Promise<any>;

export const apiRequest: ApiRequestProps = async (method = 'get', url: string, conf = {}) => {
    const {data, type = 'user', signal} = conf;
    const source = CancelToken.source();
    const _config = {cancelToken: source.token}

    if (signal)
        signal.addEventListener('abort', () => source.cancel());

    try {
        const response = method === 'get' ?
            await api[type].get(url, {..._config}) :
            method === 'patch' ?
                await api[type].patch(url, data, {..._config}) :
                method === 'delete' ?
                    await api[type].delete(url, {..._config}) :
                    method === 'put' ?
                        await api[type].put(url, data, {..._config}) :
                        await api[type].post(url, data, {..._config});

        return response.data;
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error('-----> ', e);
            message({type: 'error', content: e?.response?.data?.message || e?.message || 'Неизвестная ошибка!'});
            throw Error(e?.response?.data?.message || e?.message || 'Неизвестная ошибка!');
        }
    }
}
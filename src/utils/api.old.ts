import axios from "axios";
import {message} from "./message";

const CancelToken = axios.CancelToken;
// const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.37:8000/api';
const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.37:8000/api';

export const apiOld = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS') || '',
    guest: axios.create({baseURL: DOMAIN_API}),
    user: axios.create({baseURL: DOMAIN_API + '/user'}),
    teacher: axios.create({baseURL: DOMAIN_API + '/user/teacher/1'}),
};

export const updateToken = (token: string) => {
    apiOld.token = token;
    apiOld.user.defaults.headers.common["Authorization"] = "Bearer " + token
    apiOld.teacher.defaults.headers.common["Authorization"] = "Bearer " + token
}

export const updateDiscipline = (disciplineId: number) => {
    apiOld.teacher.defaults.baseURL = DOMAIN_API + '/user/teacher/' + disciplineId
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
    params?: any,
}

type ApiRequestProps = (method: MethodProps, url: string, conf?: ConfigRequestProps) => Promise<any>;

export const apiRequest: ApiRequestProps = async (method = 'get', url: string, conf = {}) => {
    const {data, type = 'user', signal, params} = conf;
    const source = CancelToken.source();
    const _config = {cancelToken: source.token}

    if (signal)
        signal.addEventListener('abort', () => source.cancel());

    try {
        const response = method === 'get' ?
            await apiOld[type].get(url, {..._config, params}) :
            method === 'patch' ?
                await apiOld[type].patch(url, data, {..._config, params}) :
                method === 'delete' ?
                    await apiOld[type].delete(url, {..._config, params, data}) :
                    method === 'put' ?
                        await apiOld[type].put(url, data, {..._config, params}) :
                        await apiOld[type].post(url, data, {..._config, params});

        return response.data;
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error('-----> ', e);
            message({type: 'error', content: e?.response?.data?.message || e?.message || 'Неизвестная ошибка!'});
            throw Error(e?.response?.data?.message || e?.message || 'Неизвестная ошибка!');
        }
    }
}
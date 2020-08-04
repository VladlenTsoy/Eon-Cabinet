import axios from "axios";
import {message} from "./message";
import cookie from "js-cookie";
import {Discipline} from "../store/access/teacher/discipline/disciplineSlice";

const CancelToken = axios.CancelToken;
const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://192.168.1.37:8000/api';
// export const DOMAIN_API = process.env.NODE_ENV === 'production' ? 'https://api.eon.uz/api' : 'http://localhost:3001';

const TOKEN = cookie.get('token_access');

export const api = {
    token: TOKEN || null,
    guest: axios.create({baseURL: DOMAIN_API, headers: {common: {Authorization: 'Bearer ' + TOKEN}}, withCredentials: true}),
    user: axios.create({baseURL: DOMAIN_API + '/user', headers: {common: {Authorization: 'Bearer ' + TOKEN}}, withCredentials: true}),
    teacher: axios.create({
        baseURL: DOMAIN_API + '/user/teacher/1',
        headers: {common: {Authorization: 'Bearer ' + TOKEN}}
    }),
};

export const updateToken = (token: string | null) => {
    api.token = token;
    if (token)
        cookie.set('token_access', token, {expires: 30 });
    else
        cookie.remove('token_access');
    api.user.defaults.headers.common["Authorization"] = "Bearer " + token
    api.teacher.defaults.headers.common["Authorization"] = "Bearer " + token
}

export const updateDiscipline = (disciplineId: Discipline["id"]) => {
    api.teacher.defaults.baseURL = DOMAIN_API + '/user/teacher/' + disciplineId
}

type MethodProps =
    | 'get'
    | 'delete'
    | 'post'
    | 'put'
    | 'patch';

interface ConfigRequestProps {
    type?: 'teacher' | 'user' | 'guest'
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
            await api[type].get(url, {..._config, params}) :
            method === 'patch' ?
                await api[type].patch(url, data, {..._config, params}) :
                method === 'delete' ?
                    await api[type].delete(url, {..._config, params, data}) :
                    method === 'put' ?
                        await api[type].put(url, data, {..._config, params}) :
                        await api[type].post(url, data, {..._config, params});

        return response.data;
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error('-----> ', e);
            if (e.response.status === 401) {
                message({type: 'error', content: 'Ошибка токена!'});
                throw Error('error_token');
            }
            message({type: 'error', content: e?.response?.data?.message || e?.message || 'Неизвестная ошибка!'});
            throw Error(e?.response?.data?.message || e?.message || 'Неизвестная ошибка!');
        }
    }
}
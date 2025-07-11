import request from '../utils/request';
import type { ResDataType } from '../utils/request';



// 获取用户信息
export async function getUserInfoApi(username: string): Promise<ResDataType> {
    const url = '/api/user/info';
    const data = await request.get(url,{
        params: {
            username
        }
    });
    return data as ResDataType;

}

// 注册用户
export async function registerApi(
    username: string,
    password: string,
    nickname?: string
): Promise<ResDataType> {
    const url = '/api/user/register';
    const body = {
        username,
        password,
        nickname: nickname || username
    };

    const data = await request.post(url, body);
    return data as ResDataType;

}

// 用户登录
export async function loginApi(
    username: string,
    password: string
): Promise<ResDataType> {
    const url = '/api/user/login';
    const body = { username, password };

    const data = await request.post(url, body);
    return data as ResDataType;

}


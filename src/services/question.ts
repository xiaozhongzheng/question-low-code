import request from './request';
import type { ResDataType } from './request';

type SearchType = {
    keyword: string, // 搜索框的内容
    isStar: boolean, // 是否标星
    isDeleated: boolean, // 是否放到回收站中
    page: number,
    pageSize: number
}

export async function getQuestionApi(id:string): Promise<ResDataType>{
    const url = `/api/question/${id}`;
    const data = (await request.get(url)) as ResDataType;
    return data;
}


export async function saveQuestionApi(): Promise<ResDataType>{
    const url = `/api/question/save`;
    const data = (await request.post(url)) as ResDataType;
    return data;
}

export async function getQuestionListApi(opt: Partial<SearchType> = {}): Promise<ResDataType>{
    const url = `/api/question`;
    const data = (await request.get(url,{
        params: opt
    })) as ResDataType;
    return data;
}
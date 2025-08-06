import request from '../utils/request';
import type { ResDataType } from '../utils/request';

// 获取问卷统计数据
export async function getQuestionStatApi(id: string): Promise<ResDataType> {
  const url = `/api/question/stat/${id}`;
  const data = await request.get(url);
  return data as ResDataType;
}

// 提交问卷答案
export async function submitQuestionApi(id: string, answers: any[]): Promise<ResDataType> {
  const url = `/api/question/submit/${id}`;
  const data = await request.post(url, { answers });
  return data as ResDataType;
}

// 获取问卷答案列表
export async function getQuestionAnswersApi(id: string, page = 1, pageSize = 10): Promise<ResDataType> {
  const url = `/api/question/answers/${id}`;
  const data = await request.get(url, {
    params: { page, pageSize }
  });
  return data as ResDataType;
}

// 获取问卷统计图表数据
export async function getQuestionChartDataApi(id: string): Promise<ResDataType> {
  const url = `/api/question/chart/${id}`;
  const data = await request.get(url);
  return data as ResDataType;
}

// 导出问卷数据
export async function exportQuestionDataApi(id: string, format: 'excel' | 'csv' = 'excel'): Promise<ResDataType> {
  const url = `/api/question/export/${id}`;
  const data = await request.get(url, {
    params: { format },
    responseType: 'blob'
  });
  return data as ResDataType;
} 
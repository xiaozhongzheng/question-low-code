import Mock from 'mockjs';
import { getQuestionList } from '../data/getQuestionList.js';


const Random = Mock.Random;
export default [
    {
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle()
                }
            };
        }
    },
    {
        url: '/api/question/save',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id()
                }
            };
        }
    },
    {
        url: '/api/question',
        method: 'get',
        response(ctx) {
            const { url = '' } = ctx
            console.log(url, 'url')
            const isStar = url.includes('isStar=true')
            const isDeleted = url.includes('isDeleted=true')
            return {
                errno: 0,
                data: {
                    list: getQuestionList(
                        {
                            isStar,
                            isDeleted
                        }
                    ), // 当前页
                    total: 100 // 总页数
                }
            };
        }
    },

];
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
            const { url = '',query = {} } = ctx
            console.log(url, 'url')
            console.log(ctx.query,'query')
            const {page,pageSize,isDeleted = false,isStar = false} = query
            return {
                errno: 0,
                data: {
                    list: getQuestionList(
                        {
                            isStar: !!isStar,
                            isDeleted: !!isDeleted,
                            page: +page,
                            pageSize: +pageSize
                        }
                    ), // 当前页
                    total: 50 // 总页数
                }
            };
        }
    },
    {
        url: '/api/question/:id',
        method: 'patch',
        response() {
            return {
                errno: 0,
                
            };
        }
    },
    {
        url: '/api/question',
        method: 'delete',
        response() {
            return {
                errno: 0,
                
            };
        }
    },
];
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
                    title: Random.ctitle(),
                    componentList:[
                        // Title
                        {
                            fe_id: Random.id(),
                            type: 'questionTitle', // 组件类型，不能重复
                            title: '标题',
                            isHidden: false, // 是否隐藏画布中的组件
                            isLock: false, // 是否锁定组件
                            props: {text: '个人信息调研',level: 1,isCenter: true}
                        },
                        // Input
                        {
                            fe_id: Random.id(),
                            type: 'questionInput', // 组件类型，不能重复
                            title: '输入框1',
                            isHidden: false, // 是否隐藏画布中的组件
                            isLock: false, // 是否锁定组件
                            props: {title: '你的姓名',placeholder: '请输入姓名'}
                        },
                         {
                            fe_id: Random.id(),
                            type: 'questionInput', // 组件类型，不能重复
                            title: '输入框2',
                            isHidden: false, // 是否隐藏画布中的组件
                            isLock: false, // 是否锁定组件
                            props: {title: '你的电话',placeholder: '请输入电话'}
                        },
                    ]
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
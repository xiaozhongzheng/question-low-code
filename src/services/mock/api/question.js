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
                    componentList: [
                        {
                            fe_id: Random.id(),
                            type: 'questionTitle',
                            title: '标题',
                            isHidden: false,
                            isLock: false,
                            props: { text: '个人信息调研', level: 1, color: '#000', isCenter: true }
                        },
                        {
                            fe_id: Random.id(),
                            type: 'questionInput',
                            title: '输入框',
                            isHidden: false,
                            isLock: false,
                            props: { title: '你的姓名', placeholder: '请输入姓名' }
                        },
                        {
                            fe_id: Random.id(),
                            type: 'questionParagraph',
                            title: '段落内容',
                            isHidden: false,
                            isLock: false,
                            props: { text: '这是一个低代码项目' }
                        },
                        {
                            fe_id: Random.id(),
                            type: 'questionRadio',
                            title: '单选',
                            isHidden: false,
                            isLock: false,
                            props: {
                                title: '你的喜好',
                                options: [
                                    { label: '打篮球', value: 'item1' },
                                    { label: '打游戏', value: 'item2' },
                                    { label: '看电影', value: 'item3' },
                                ],
                                value: '',
                                isVertical: false
                            }
                        },
                        {
                            fe_id: Random.id(),
                            type: 'questionCheckbox',
                            title: '多选',
                            isHidden: false,
                            isLock: false,
                            props: {
                                title: '你的梦想',
                                list: [
                                    { label: '看世界', value: 'item1', checked: false },
                                    { label: '一生平安', value: 'item2', checked: false },
                                    { label: '学有所成', value: 'item3', checked: false },
                                ],
                                values: [],
                                isVertical: false
                            }
                        },
                    ],
                    pageInfo: {
                        title: '老人与海',
                        desc: '',
                        js: '',
                        css: ''
                    }
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
            const { url = '', query = {} } = ctx;
            console.log(url, 'url');
            console.log(ctx.query, 'query');
            const { page, pageSize, isDeleted = false, isStar = false } = query;
            return {
                errno: 0,
                data: {
                    list: getQuestionList({
                        isStar: !!isStar,
                        isDeleted: !!isDeleted,
                        page: +page,
                        pageSize: +pageSize
                    }),
                    total: 50
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
import Mock from 'mockjs';
const Random = Mock.Random;

// export function getQuestionList(opt={}) {
//     const { page = 1, pageSize = 5, isStar, isDeleted } = opt;
//     const list = [];
//     for (let i = 0; i < pageSize; i++) {
//         list.push({
//             id: Random.id(3),
//             title: Random.ctitle(),
//             isPublished: Random.boolean(),
//             isStar,
//             answerCount: Random.natural(50, 100),
//             createdAt: Random.datetime(),
//             isDeleted,
//         });
//     }
//     return list;
// }



export function getQuestionList(opt = {}) {
    const list = [
        {
            "id": "abc",
            "title": "如何学习React",
            "isPublished": true,
            "isStar": false,
            "answerCount": 72,
            "createdAt": "2023-05-12 14:30:00",
            "isDeleted": false
        },
        {
            "id": "def",
            "title": "前端性能优化技巧",
            "isPublished": true,
            "isStar": true,
            "answerCount": 89,
            "createdAt": "2023-06-18 09:15:00",
            "isDeleted": false
        },
        {
            "id": "ghi",
            "title": "TypeScript入门指南",
            "isPublished": false,
            "isStar": true,
            "answerCount": 65,
            "createdAt": "2023-07-22 16:45:00",
            "isDeleted": false
        },
        {
            "id": "jkl",
            "title": "Node.js最佳实践",
            "isPublished": true,
            "isStar": false,
            "answerCount": 93,
            "createdAt": "2023-08-05 11:20:00",
            "isDeleted": true
        },
        {
            "id": "mno",
            "title": "CSS Grid布局详解",
            "isPublished": true,
            "isStar": false,
            "answerCount": 57,
            "createdAt": "2023-09-30 13:10:00",
            "isDeleted": false
        },
        {
            "id": "pqr",
            "title": "Webpack配置优化",
            "isPublished": false,
            "isStar": true,
            "answerCount": 78,
            "createdAt": "2023-10-15 10:05:00",
            "isDeleted": false
        },
        {
            "id": "stu",
            "title": "Vue3新特性",
            "isPublished": true,
            "isStar": false,
            "answerCount": 84,
            "createdAt": "2023-11-20 15:30:00",
            "isDeleted": false
        },
        {
            "id": "vwx",
            "title": "前端安全防护",
            "isPublished": true,
            "isStar": true,
            "answerCount": 91,
            "createdAt": "2023-12-25 08:00:00",
            "isDeleted": false
        },
        {
            "id": "yz1",
            "title": "移动端适配方案",
            "isPublished": false,
            "isStar": false,
            "answerCount": 63,
            "createdAt": "2024-01-10 17:25:00",
            "isDeleted": true
        },
        {
            "id": "234",
            "title": "前端面试题汇总",
            "isPublished": true,
            "isStar": true,
            "answerCount": 97,
            "createdAt": "2024-02-14 12:15:00",
            "isDeleted": false
        }
    ]
    return list;
}
import Mock from 'mockjs';
const Random = Mock.Random;

export function getQuestionList(opt={}) {
    const { page = 1, pageSize = 5, isStar, isDeleted } = opt;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
        list.push({
            id: Random.id(3),
            title: Random.ctitle(),
            isPublished: Random.boolean(),
            isStar,
            answerCount: Random.natural(50, 100),
            createdAt: Random.datetime(),
            isDeleted,
        });
    }
    return list;
}
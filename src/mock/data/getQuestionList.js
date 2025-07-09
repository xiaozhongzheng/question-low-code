import Mock from 'mockjs';
const Random = Mock.Random;

/**
 * 生成问题列表
 * @param {number} len - 要生成的列表长度，默认为10
 * @param {boolean} isDeleted - 标记问题是否被删除，默认为false
 * @returns {Array} 返回生成的问题列表
 */
export function getQuestionList(opt = {}) {
    const { page = 1, pageSize = 5, isStar, isDeleted } = opt
    const list = [];
    for (let i = 0; i < pageSize; i++) {
        list.push({
            id: Random.id(3),          // 生成唯一ID
            title: Random.ctitle(),      // 生成随机标题
            isPublished: Random.boolean(),  // 是否发布
            isStar,    // 是否标星
            answerCount: Random.natural(50, 100), // 回答数(50-100)
            createdAt: Random.datetime(), // 创建时间
            isDeleted,                   // 假删除标记
        });
    }

    return list;
}


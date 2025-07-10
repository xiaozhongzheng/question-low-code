// src/services/mockService.ts
import { db } from '../db';

export const UserService = {
  // 初始化Mock数据
  async initUser() {
    const count = await db.user.count();
    if (count === 0) {
      await db.user.bulkAdd([
        { username: 'xzz',nickname: 'xzz'}
      ]);
    }
  },

  // 获取Mock数据
  async getUser(username: string): Promise<any> {
    const record = await db.user.where('username').equals(username).first();
    return record;
  },

//   // 更新Mock数据
//   async updateUser(name: string, value: any) {
//     await db.user.where('name').equals(name).modify({ value });
//   },

//   // 添加Mock数据
//   async addUser(name: string, value: any) {
//     await db.user.add({ name, value, createdAt: new Date() });
//   }
};
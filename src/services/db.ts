// src/services/db.ts
import Dexie from 'dexie';

interface User {
  id?: number;
  username: string;
  nickname: string;
}

class AppDatabase extends Dexie {
  user!: Dexie.Table<User, number>;

  constructor() {
    super('MockAppDB');
    
    this.version(1).stores({
      user: '++id, username, nickname'
    });
  }
}

export const db = new AppDatabase();
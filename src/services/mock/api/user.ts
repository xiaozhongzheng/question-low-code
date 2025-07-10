import Mock from 'mockjs';
import {UserService} from '../../service/userService.js'
import { type MockMethodType } from '../index.ts';
const Random = Mock.Random;
const list: MockMethodType[] = [
    {
        url: '/api/user/info',
        method: 'get',
        response: async () => {
            const data = await UserService.getUser("xzz")
            return {
                errno: 0,
                data
            };
        }
    },
   {
        url: '/api/user/register',
        method: 'post',
        response() {
            return {
                errno: 0,
                
            };
        }
    },
    {
        url: '/api/user/login',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    token: Random.word(20)
                }
            };
        }
    },
];
export default list;
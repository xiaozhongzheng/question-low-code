import Mock from 'mockjs';
import { getQuestionList } from '../data/getQuestionList.js';


const Random = Mock.Random;
export default [
    {
        url: '/api/user/info',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    username: Random.title(),
                    nickname: Random.cname()
                }
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
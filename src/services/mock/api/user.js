import Mock from 'mockjs';
import { UserService } from '../../service/userService.js';
const Random = Mock.Random;
const userService = UserService()
const list = [
    {
        url: '/api/user/info',
        method: 'get',
        response:  ({query}) => {
            const data =  userService.getUserByUsername(query.username)
            return {
                errno: 0,
                data
            };
        }
    },
    {
        url: '/api/user/update',
        method: 'put',
        response:  ({query}) => {
            const data =  userService.updateUserData(query)
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
        response:  (ctx) => {
            console.log(ctx.request.body,'body')
            const body = ctx.request.body
            const data =  userService.loginUser(body)
            return {
                errno: 0,
                data
            };
        }
    },
];
export default list;
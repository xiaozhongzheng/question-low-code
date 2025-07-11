import Mock from 'mockjs';
const Random = Mock.Random;

let userList = [
     {
        id: '01',
        username: 'xzz',
        nickname: '',
        password: '123',
    },
    {
        id: '02',
        username: 'lyt',
        nickname: '',
        password: '123',
    },
]
export const UserService = () => {

    function updateUserData(users = null) {  
        userList = users || userList
        return userList
    }

    function getUserByUsername(username) {
        const user = userList.find(u => u.username === username)
        if(!user) {
            return null
        }
        return user;
    }

    function loginUser(userData){
        console.log(userData,'userData')
        const {username,password} = userData
        const user = getUserByUsername(username)
        if(!user || user.password !== password){
            return null
        }
        return {
            ...user,
            userList,
            token: Random.word(20)
        }
    }

    function register(user){

    }

    return {
        updateUserData,
        getUserByUsername,
        loginUser
    }
};
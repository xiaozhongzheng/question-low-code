/**
 * 存放用户信息
 */
const USER_KEY = 'userInfo'
const USER_LIST_KEY = 'userList'

type UserInfo = {
    username: string,
    nickname: string
}

export function setUserInfo(user: UserInfo){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
}

export function getUserInfo(){
    const user = localStorage.getItem(USER_KEY)
    if(!user) return ''
    return JSON.parse(user)
}


export function removeUserInfo(){
    localStorage.removeItem(USER_KEY)
}

export function setUserList(userList: UserInfo[]){
    localStorage.setItem(USER_LIST_KEY,JSON.stringify(userList))
}

export function getUserList(){
    const userList = localStorage.getItem(USER_LIST_KEY) || []
    if(userList || userList?.length) return []
    return JSON.parse(userList)
}


export function removeUserList(){
    localStorage.removeItem(USER_LIST_KEY)
}
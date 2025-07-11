/**
 * 将登录后返回的token存放在本地浏览器中
 */
export const KEY = 'user_token'

export function setToken(token: string){
    localStorage.setItem(KEY,token)
}


export function getToken(){
    return localStorage.getItem(KEY)
}


export function removeToken(){
    localStorage.removeItem(KEY)
}
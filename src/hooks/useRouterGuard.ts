import { useEffect } from "react"
import { useGetUserInfo } from "./useGetUserInfo"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * 自定义路由守卫hooks
 * 需求：如果用户已经登录了，再跳转到登录页或者注册页就应该重定向到首页；
 *      如果用户未登录，访问需要登录信息的页面就应该重定向到登录页
 * @param waitingUserData 加载状态，表示页面是否获取到了用户信息
 */
export const useRouterGuard = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo() // 获取用户信息
  const { pathname } = useLocation() // 获取当前页面的路径
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return // 页面还在加载数据，不需要跳转

    if (username) {
      // 已登录，访问登录/注册页时重定向到首页
      if (isLoginOrRegisterPage(pathname)) {
        nav('/', { replace: true })
      }
      // 已登录，访问其他页面，允许通过
      return
    }

    // 未登录，访问需要登录的页面时重定向到登录页
    if (!isPublicPage(pathname)) {
      nav('/login', { replace: true })
    }
    // 未登录，访问公开页面（如登录/注册/首页），允许通过
  }, [username, pathname, waitingUserData, nav])
}

// 判断是否为登录或注册页
export const isLoginOrRegisterPage = (pathname: string) => {
  return ['/login', '/register'].includes(pathname)
}

// 判断是否为无需登录的公开页面
export const isPublicPage = (pathname: string) => {
  return ['/', '/login', '/register'].includes(pathname)
}
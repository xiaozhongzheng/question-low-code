import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoApi } from "@/api/user";
import { useDispatch } from "react-redux";
import { loginReducers } from "@/store/userReducer";
import { getUserInfo } from "@/utils/storage/userInfo";
/**
 * 该hooks可以用来初始化时加载用户信息的场景
 * @returns 返回一个加载状态
 */
export function useLoadUserData() {
    const dispatch = useDispatch()
    const { username } = useGetUserInfo()
    const userInfo = getUserInfo()
    const { run,loading: waitingUserData } = useRequest(async () => getUserInfoApi(username || userInfo.username), {
        manual: true,
        onSuccess: (res) => {
            const { username, nickname } = res
            // 将获取的数据保存在redux store中
            dispatch(loginReducers({ username, nickname }))
        }
    })
    useEffect(() => {
    run()

    },[])
    // useEffect(() => {
    //     if (username) {
    //         // 已存在用户信息
    //         setWaitingUserData(false)
    //         return
    //     }
    //     // 不存在用户信息，需要发送请求加载用户信息
    //     run()
    // }, [username])

    return { waitingUserData }
}
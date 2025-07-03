import { useSelector } from "react-redux";
import type { StateType } from "@/store";
import type { UserStateType } from "@/store/userReducer";
/**
 * 通过redux store 获取用户信息
 * @returns 返回用户的信息
 */
export const useGetUserInfo = () => {
    const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
    return {
        username,
        nickname
    }
}

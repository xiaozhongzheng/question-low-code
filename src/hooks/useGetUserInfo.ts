import { useSelector } from "react-redux";
import type { StateType } from "@/store";
import type { UserStateType } from "@/store/userReducer";

export const useGetUserInfo = () => {
    const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
    return {
        username,
        nickname
    }
}

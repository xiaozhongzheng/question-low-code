import { useSelector } from "react-redux"
import { type StateType } from "@/store"
import type { QuestionPageInfo } from "@/components/Question"
export const useGetPageInfo = () => {
    const pageInfo = useSelector<StateType>(state => state.pageInfo) as QuestionPageInfo
    return {
        pageInfo
    }
}
import { useSelector } from "react-redux"
import { type StateType } from "@/store"
import { type PageInfoStateType } from "@/store/pageInfoReducer"
export const useGetPageInfo = () => {
    const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoStateType
    console.log(pageInfo,'pageInfo===')
    return {
        pageInfo
    }
}
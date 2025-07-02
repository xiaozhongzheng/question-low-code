import { getComponentConfigByType } from '@/components/Question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { type ComponentsPropsType } from '@/components/Question'
import { useDispatch } from 'react-redux'
import { updateComponentProps } from '@/store/componentsReducer'
const NoProps = () => {
    return <div style={{textAlign: 'center'}}>未选中组件</div>
}
const ComponentProps = () => {
    const dispatch = useDispatch()
    const { selectComponent } = useGetComponentInfo()
    if(!selectComponent) return <NoProps />
    const {type,props,fe_id,isLock = false} = selectComponent
    const componentConfig = getComponentConfigByType(type)
    if(!componentConfig) return <NoProps />
    const {PropsComponent} = componentConfig
    const handleChange = (newProps: ComponentsPropsType) => {
        console.log(newProps,'newProps')
        dispatch(updateComponentProps({fe_id,newProps}))
    }
    return (
        <div >
            <PropsComponent {...props} onChange={handleChange} disabled={isLock} />
        </div>
    )
}

export default ComponentProps
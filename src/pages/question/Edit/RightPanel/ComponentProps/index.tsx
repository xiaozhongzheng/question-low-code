import { getComponentConfigByType } from '@/components/Question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { type ComponentsPropsType } from '@/components/Question'
const NoProps = () => {
    return <div style={{textAlign: 'center'}}>未选中组件</div>
}
const ComponentProps = () => {
    const { selectComponent } = useGetComponentInfo()
    if(!selectComponent) return <NoProps />
    const {type,props,fe_id} = selectComponent
    const componentConfig = getComponentConfigByType(type)
    if(!componentConfig) return <NoProps />
    const {PropsComponent} = componentConfig
    const handleChange = (newProps: ComponentsPropsType) => {
        console.log(newProps,'newProps')
    }
    return (
        <PropsComponent {...props} onChange={handleChange} />
    )
}

export default ComponentProps
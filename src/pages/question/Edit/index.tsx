import styles from './index.module.scss'
import Canvas from './EditCanvas'
import { useTitle } from 'ahooks'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
import MyLoading from '@/components/MyLoading';
import { useDispatch } from 'react-redux';
import { setSelectedId } from '@/store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
export default function Edit() {
  const { loading, question } = useLoadingQuestion();
  useTitle('小穆问卷-编辑问卷')
  if (loading) return <MyLoading />
  const dispatch = useDispatch()
  const clearSelect = () => {
    // 清除选中id
    console.log('清除id')
    dispatch(setSelectedId(''))
  }
  const handlePropagation = (e:MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div className={styles.edit}>
      <header className={styles.head}>
        头部
      </header>
      <main className={styles.main} onClick={clearSelect}>
        <div className={styles.left} onClick={handlePropagation}>
          <LeftPanel />
        </div>
        <div className={styles.container}>
          <div className={styles.canvasBox}>
            <Canvas />
          </div>
        </div>
        <div className={styles.right} onClick={handlePropagation}>
          <RightPanel />
        </div>
      </main>
    </div>
  )
}

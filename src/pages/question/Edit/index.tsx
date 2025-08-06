import styles from './index.module.scss'
import Canvas from './EditCanvas'
import { useTitle } from 'ahooks'
import { useDispatch } from 'react-redux';
import { setSelectedId } from '@/store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
export default function Edit() {
  useTitle('小穆问卷-编辑问卷')
  const dispatch = useDispatch()
  const clearSelect = () => {
    // 清除选中id
    console.log('清除id')
    dispatch(setSelectedId(''))
  }
  const handlePropagation = (e: MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div className={styles.edit}>
      <header className={styles.head}>
        <EditHeader></EditHeader>
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

import styles from './index.module.scss'
import Canvas from './EditCanvas'
import { useTitle } from 'ahooks'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
import MyLoading from '@/components/MyLoading';
export default function Edit() {
  const {loading,question} = useLoadingQuestion();
  useTitle('小穆问卷-编辑问卷')
  if(loading) return <MyLoading />
  return (
    <div className={styles.edit}>
      <header className={styles.head}>
        头部
      </header>
      <main className={styles.main}>
        <div className={styles.left}></div>
        <div className={styles.container}>
          <div className={styles.canvasBox}>
            <Canvas />
          </div>
        </div>
        <div className={styles.right}></div>
      </main>
    </div>
  )
}

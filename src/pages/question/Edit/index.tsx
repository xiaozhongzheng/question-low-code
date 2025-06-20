import styles from './index.module.scss'
import Canvas from './Canvas'
import { useTitle } from 'ahooks'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
export default function Edit() {
  const {loading,question} = useLoadingQuestion();
  useTitle('小穆问卷-编辑问卷')
  
  return (
    <div className={styles.edit}>
      <header className={styles.head}>
        {loading ? <p>加载中...</p>:<p>{JSON.stringify(question)}</p>}
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

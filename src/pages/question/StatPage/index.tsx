import { useTitle } from 'ahooks'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
import styles from './index.module.scss'
export default function Edit() {
  const {loading,question} = useLoadingQuestion();
  useTitle('小穆问卷-标星问卷')
  
  return (
    <div className={styles.edit}>
      <header className={styles.head}>
        {loading ? <p>加载中...</p>:<p>{JSON.stringify(question)}</p>}
      </header>
   
    </div>
  )
}

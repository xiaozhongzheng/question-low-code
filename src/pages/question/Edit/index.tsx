import React from 'react'
import styles from './index.module.scss'
import Canvas from './Canvas'
import { useParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
export default function Edit() {
  const { id = '' } = useParams()
  useTitle('小穆问卷-我的问卷')
  return (
    <div className={styles.edit}>
      {id}
      <header className={styles.head}>

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

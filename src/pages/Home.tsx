import React, { useEffect, type FC } from 'react'
import axios from 'axios';
import styles from './Home.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const Home: FC = () => {
  const nav = useNavigate();
  useEffect(() => {
    axios.post('/api/add').then(res => {
      console.log(res, 'res')
    })
  }, [])
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>问卷调查-在线投票</h1>
        <p>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</p>
        <Button size='large' type="primary" onClick={() => nav('/manage/list')}>开始使用</Button>

      </div>
    </div>
  )
}

export default Home
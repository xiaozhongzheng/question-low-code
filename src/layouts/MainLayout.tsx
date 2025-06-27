import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Layout } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';
import { useLoadUserData } from '@/hooks/useLoadUserData';
import MyLoading from '@/components/MyLoading';
import { useRouterGuard } from '@/hooks/useRouterGuard';
const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useRouterGuard(waitingUserData)
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Logo />
        <UserInfo />
      </Header>
      <Content className={styles.main}>
        {
          waitingUserData? <MyLoading style={{marginTop: '120px'}} title='页面加载中...' /> : <Outlet />
        }
      </Content>
      <Footer className={styles.footer}>main footer</Footer>
    </Layout>
  )
}

export default MainLayout
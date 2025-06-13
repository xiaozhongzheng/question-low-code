import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Layout } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';

const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
  return (
    <Layout className={styles.container}>
        <Header className={styles.header}>
          <Logo />
          <UserInfo />
        </Header>
        <Content className={styles.main}>
            <Outlet />
        </Content>
        <Footer className={styles.footer}>main footer</Footer>
    </Layout>
  )
}

export default MainLayout
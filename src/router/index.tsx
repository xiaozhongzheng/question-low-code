import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Demo from '@/pages/demo'
// 使用 lazy 动态导入组件
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ManageLayout = lazy(() => import("../layouts/ManageLayout"));
const List = lazy(() => import("../pages/manage/List"));
const Star = lazy(() => import("../pages/manage/Star"));
const Trash = lazy(() => import("../pages/manage/Trash"));
const QuestionLayout = lazy(() => import("../layouts/QuestionLayout"));
const Edit = lazy(() => import("../pages/question/Edit"));
const Stat = lazy(() => import("../pages/question/StatPage"));
const Fill = lazy(() => import("../pages/question/Fill"));

// 创建 Suspense 包装组件
const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 主布局不需要懒加载
    children: [
      {
        path: "/",
        element: withSuspense(Home),
      },
      {
        path: "/login",
        element: withSuspense(Login),
      },
      {
        path: "/register",
        element: withSuspense(Register),
      },
      {
        path: "manage",
        element: withSuspense(ManageLayout),
        children: [
          {
            path: "list",
            element: withSuspense(List),
          },
          {
            path: "star",
            element: withSuspense(Star),
          },
          {
            path: "trash",
            element: withSuspense(Trash),
          },
        ],
      },
    ],
  },
  {
    path: "question",
    element: withSuspense(QuestionLayout),
    children: [
      {
        path: "edit/:id?",
        element: withSuspense(Edit),
      },
      {
        path: "stat/:id",
        element: withSuspense(Stat),
      },
      {
        path: "fill/:id",
        element: withSuspense(Fill),
      },
    ],
  },
  {
    path: "demo",
    element: <Demo />
  },
  {
    path: "*", // 404路由配置
    element: <NotFound />, // 404页面通常不需要懒加载
  },
]);

export default router;
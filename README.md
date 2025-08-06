# 低代码问卷平台

一个基于 React + TypeScript + Ant Design 的现代化低代码问卷平台，支持拖拽式问卷设计、实时预览、数据统计等功能。

## 🚀 功能特性

### 核心功能
- **拖拽式问卷设计** - 支持多种组件类型，拖拽即可创建问卷
- **实时预览** - 所见即所得的编辑体验
- **组件库** - 丰富的问卷组件（标题、段落、单选、多选、评分等）
- **属性面板** - 可视化配置组件属性
- **撤销重做** - 支持操作历史记录
- **问卷填写** - 用户友好的问卷填写界面
- **数据统计** - 问卷数据可视化分析

### 技术特性
- **TypeScript** - 完整的类型支持
- **React 18** - 最新的 React 特性
- **Redux Toolkit** - 现代化的状态管理
- **Ant Design** - 企业级 UI 组件库
- **Vite** - 快速的构建工具
- **SCSS** - 模块化样式管理

## 📦 项目结构

```
src/
├── api/                 # API 接口
├── components/          # 组件库
│   └── Question/       # 问卷组件
├── hooks/              # 自定义 Hooks
├── layouts/            # 布局组件
├── pages/              # 页面组件
│   ├── manage/         # 管理页面
│   └── question/       # 问卷相关页面
├── router/             # 路由配置
├── store/              # 状态管理
├── styles/             # 全局样式
├── utils/              # 工具函数
└── services/           # 服务层
```

## 🛠️ 开发环境

### 环境要求
- Node.js >= 16
- pnpm >= 7

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
# 启动前端开发服务器
pnpm dev

# 启动 Mock 服务器
pnpm dev:server

# 同时启动前端和 Mock 服务器
pnpm dev:all
```

### 构建生产版本
```bash
pnpm build
```

### 代码检查
```bash
pnpm lint
```

## 📋 组件说明

### 问卷组件类型

1. **标题组件 (QuestionTitle)**
   - 支持多级标题
   - 可配置对齐方式和颜色

2. **段落组件 (QuestionParagraph)**
   - 支持文本内容
   - 可配置字体大小和颜色

3. **输入框组件 (QuestionInput)**
   - 文本输入
   - 支持必填验证

4. **单选组件 (QuestionRadio)**
   - 单选选项
   - 支持横向/纵向排列

5. **多选组件 (QuestionCheckbox)**
   - 多选选项
   - 支持选项管理

6. **评分组件 (QuestionRate)**
   - 星级评分
   - 支持半星和自定义提示

## 🔧 技术栈

### 前端框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **React Router** - 路由管理
- **Redux Toolkit** - 状态管理

### UI 组件
- **Ant Design** - 企业级 UI 组件库
- **@ant-design/icons** - 图标库

### 构建工具
- **Vite** - 快速的前端构建工具
- **SCSS** - CSS 预处理器

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查

## 📱 页面路由

### 主要页面
- `/` - 首页
- `/login` - 登录页
- `/register` - 注册页
- `/manage/list` - 问卷列表
- `/manage/star` - 星标问卷
- `/manage/trash` - 回收站
- `/question/edit/:id` - 问卷编辑
- `/question/stat/:id` - 问卷统计
- `/question/fill/:id` - 问卷填写

## 🎨 设计规范

### 颜色系统
- 主色调: `#1677ff`
- 成功色: `#52c41a`
- 警告色: `#faad14`
- 错误色: `#ff4d4f`

### 布局规范
- 头部高度: `64px`
- 侧边栏宽度: `240px`
- 面板宽度: `300px`

## 🔌 API 接口

### 用户相关
- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `GET /api/user/info` - 获取用户信息

### 问卷相关
- `GET /api/question/:id` - 获取问卷详情
- `POST /api/question/save` - 保存问卷
- `GET /api/question` - 获取问卷列表
- `PATCH /api/question/:id` - 更新问卷
- `DELETE /api/question` - 删除问卷

### 统计相关
- `GET /api/question/stat/:id` - 获取统计数据
- `POST /api/question/submit/:id` - 提交问卷答案
- `GET /api/question/answers/:id` - 获取答案列表

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢以下开源项目的支持：
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

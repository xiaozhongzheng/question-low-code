// 问卷相关常量
export const QUESTION_TYPES = {
  QUESTION_TITLE: 'questionTitle',
  QUESTION_PARAGRAPH: 'questionParagraph',
  QUESTION_INPUT: 'questionInput',
  QUESTION_RADIO: 'questionRadio',
  QUESTION_CHECKBOX: 'questionCheckbox',
  QUESTION_RATE: 'questionRate',
} as const;

// 组件类型
export const COMPONENT_TYPES = {
  TEXT_DISPLAY: 'textDisplay',
  USER_INPUT: 'userInput',
  USER_SELECT: 'userSelect',
  USER_RATE: 'userRate',
} as const;

// 页面状态
export const PAGE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CLOSED: 'closed',
} as const;

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_INFO: 'userInfo',
  QUESTION_DATA: 'questionData',
} as const;

// API 响应码
export const API_CODE = {
  SUCCESS: 0,
  ERROR: 1,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  PAGE_SIZE: 10,
  MAX_SNAPSHOT_COUNT: 20,
  AUTO_SAVE_INTERVAL: 30000, // 30秒
  MAX_TITLE_LENGTH: 100,
  MAX_DESC_LENGTH: 500,
} as const;

// 组件默认属性
export const DEFAULT_COMPONENT_PROPS = {
  title: {
    text: '一行标题',
    level: 1,
    isCenter: false,
    color: '#262626',
  },
  paragraph: {
    text: '一段文字',
    isCenter: false,
    fontSize: 14,
    color: '#262626',
  },
  input: {
    title: '输入框标题',
    placeholder: '请输入',
    isRequired: false,
  },
  radio: {
    title: '单选标题',
    options: [
      { label: '选项1', value: 'item1' },
      { label: '选项2', value: 'item2' },
      { label: '选项3', value: 'item3' },
    ],
    value: '',
    isVertical: false,
  },
  checkbox: {
    title: '多选标题',
    options: [
      { label: '选项1', value: 'item1' },
      { label: '选项2', value: 'item2' },
      { label: '选项3', value: 'item3' },
    ],
    value: [],
    isVertical: false,
  },
  rate: {
    title: '评分',
    value: 0,
    count: 5,
    allowHalf: false,
    tooltips: ['很差', '较差', '一般', '满意', '非常满意'],
  },
} as const; 
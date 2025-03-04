# JSON Format 技术架构文档

本文档详细介绍了 JSON Format 项目的技术架构、核心功能实现和开发指南，旨在帮助开发者快速理解项目结构并进行功能扩展。

## 目录

1. [项目概述](#项目概述)
2. [技术栈](#技术栈)
3. [项目结构](#项目结构)
4. [核心功能实现](#核心功能实现)
5. [数据流](#数据流)
6. [状态管理](#状态管理)
7. [UI 组件](#UI-组件)
8. [性能优化](#性能优化)
9. [扩展指南](#扩展指南)
10. [常见问题](#常见问题)

## 项目概述

JSON Format 是一个功能丰富的 Web 应用程序，专为 JSON 数据的可视化、分析和处理而设计。它提供了多种功能，包括 JSON 可视化（图形视图和树形视图）、格式转换、类型生成和 JSON Schema 工具等。

项目的主要目标是：
- 提供直观的 JSON 数据可视化方式
- 支持多种数据格式之间的转换
- 从数据自动生成多种编程语言的类型定义
- 提供 JSON Schema 验证和生成功能
- 支持多语言界面

## 技术栈

JSON Format 使用以下技术构建：

- **前端框架**：[React](https://reactjs.org/) + [Next.js](https://nextjs.org/)
- **UI 组件库**：[Mantine UI](https://mantine.dev/)
- **可视化库**：[Reaflow](https://github.com/reaviz/reaflow)
- **状态管理**：[Zustand](https://github.com/pmndrs/zustand)
- **代码编辑器**：[Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **国际化**：[next-i18next](https://github.com/i18next/next-i18next)
- **样式**：[Styled Components](https://styled-components.com/)
- **SEO**：[Next SEO](https://github.com/garmeeh/next-seo)
- **通知**：[React Hot Toast](https://react-hot-toast.com/)
- **图标**：[React Icons](https://react-icons.github.io/react-icons/)

## 项目结构

```
/
├── public/                  # 静态资源
│   ├── locales/             # 国际化翻译文件
│   │   ├── en/              # 英文翻译
│   │   └── zh/              # 中文翻译
│   └── ...
├── src/                     # 源代码
│   ├── assets/              # 资源文件
│   ├── components/          # 通用组件
│   ├── constants/           # 常量定义
│   ├── contexts/            # React 上下文
│   ├── enums/               # 枚举定义
│   ├── features/            # 功能模块
│   │   ├── editor/          # 编辑器功能
│   │   ├── modals/          # 模态框组件
│   │   └── ...
│   ├── hooks/               # 自定义 Hooks
│   ├── layout/              # 布局组件
│   ├── lib/                 # 工具库
│   │   ├── converters/      # 格式转换器
│   │   ├── typegen/         # 类型生成器
│   │   └── utils/           # 通用工具函数
│   ├── pages/               # Next.js 页面
│   ├── store/               # Zustand 状态管理
│   └── types/               # TypeScript 类型定义
├── docs/                    # 文档
├── next.config.js           # Next.js 配置
├── next-i18next.config.js   # 国际化配置
└── ...
```

## 核心功能实现

### 1. JSON 可视化

JSON 可视化功能通过两种视图实现：图形视图和树形视图。

#### 图形视图

图形视图使用 Reaflow 库将 JSON 数据转换为节点和边的图形表示。

**关键文件**：
- `src/features/editor/views/GraphView/index.tsx` - 图形视图主组件
- `src/features/editor/views/GraphView/stores/useGraph.ts` - 图形视图状态管理
- `src/features/editor/views/GraphView/CustomNode/` - 自定义节点组件

**实现流程**：
1. 解析 JSON 数据为节点和边的数据结构
2. 使用 Reaflow 渲染图形
3. 实现节点拖拽、缩放、展开/折叠等交互功能

#### 树形视图

树形视图使用自定义组件将 JSON 数据以层次结构展示。

**关键文件**：
- `src/features/editor/views/TreeView/index.tsx` - 树形视图主组件
- `src/features/editor/views/TreeView/TreeNode.tsx` - 树节点组件

**实现流程**：
1. 递归解析 JSON 数据为树形结构
2. 渲染树节点组件
3. 实现展开/折叠功能

### 2. 格式转换

格式转换功能支持 JSON、CSV、XML 和 YAML 之间的相互转换。

**关键文件**：
- `src/lib/converters/` - 各种格式转换器
- `src/pages/converter/[type].tsx` - 转换器页面

**实现流程**：
1. 解析源格式数据
2. 转换为中间表示（通常是 JavaScript 对象）
3. 生成目标格式数据

### 3. 类型生成

类型生成功能从数据自动生成多种编程语言的类型定义。

**关键文件**：
- `src/lib/typegen/` - 类型生成器
- `src/pages/type/[source]-to-[target].tsx` - 类型生成页面

**实现流程**：
1. 解析源数据（JSON、CSV、XML 或 YAML）
2. 分析数据结构和类型
3. 生成目标语言（Go、Kotlin、Rust 或 TypeScript）的类型定义代码

### 4. JSON Schema 工具

JSON Schema 工具用于验证 JSON 数据和生成 JSON Schema。

**关键文件**：
- `src/pages/tools/json-schema.tsx` - JSON Schema 工具页面
- `src/lib/utils/json-schema.ts` - JSON Schema 相关工具函数

**实现流程**：
1. 从 JSON 数据生成 JSON Schema
2. 或从 JSON Schema 生成示例 JSON 数据
3. 验证 JSON 数据是否符合 Schema

## 数据流

JSON Format 的数据流主要遵循以下模式：

1. **用户输入** → 编辑器组件捕获输入
2. **数据解析** → 将输入解析为适当的数据结构
3. **数据处理** → 根据功能需求处理数据（可视化、转换、生成类型等）
4. **结果渲染** → 将处理结果渲染到界面

对于编辑器功能，数据流如下：
```
用户输入 JSON → 解析 JSON → 转换为图形/树形数据结构 → 渲染视图
```

对于转换功能，数据流如下：
```
用户输入源格式 → 解析为中间表示 → 转换为目标格式 → 显示结果
```

## 状态管理

项目使用 Zustand 进行状态管理，主要状态存储包括：

### 编辑器状态

**文件**：`src/store/useEditorStore.ts`

管理编辑器的状态，包括：
- 当前编辑的内容
- 视图模式（图形/树形）
- 布局设置
- 主题设置

### 应用状态

**文件**：`src/store/useAppStore.ts`

管理应用级别的状态，包括：
- 用户偏好设置
- UI 状态（侧边栏开关、模态框等）

## UI 组件

项目使用 Mantine UI 作为主要 UI 组件库，并结合自定义组件构建界面。

### 主要布局组件

- `src/layout/PageLayout/` - 页面通用布局
- `src/layout/ConverterLayout/` - 转换器布局
- `src/layout/TypeLayout/` - 类型生成器布局
- `src/layout/Landing/` - 首页布局

### 自定义组件

- `src/components/LanguageSwitcher.tsx` - 语言切换组件
- `src/components/ThemeSwitcher.tsx` - 主题切换组件
- `src/features/editor/Toolbar/` - 编辑器工具栏组件

## 性能优化

项目采用了多种性能优化策略：

### 代码分割

使用 Next.js 的动态导入功能进行代码分割，减少初始加载时间。

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 虚拟化

对于大型数据集，使用虚拟化技术只渲染可见区域的内容，提高渲染性能。

### 缓存

使用 React.memo 和 useMemo 缓存组件和计算结果，避免不必要的重新渲染。

```tsx
const MemoizedComponent = React.memo(({ data }) => {
  // 组件实现
});

// 在函数组件中
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 懒加载

对于非关键资源，使用懒加载策略延迟加载，提高初始加载速度。

## 扩展指南

### 添加新的格式转换器

1. 在 `src/lib/converters/` 目录下创建新的转换器文件
2. 实现从新格式到中间表示和从中间表示到新格式的转换函数
3. 在 `src/enums/file.enum.ts` 中添加新格式
4. 在转换器页面中添加新格式的支持

### 添加新的类型生成器

1. 在 `src/lib/typegen/` 目录下创建新的类型生成器文件
2. 实现从数据到新语言类型定义的转换函数
3. 在 `src/enums/file.enum.ts` 中添加新语言
4. 在类型生成页面中添加新语言的支持

### 添加新功能

1. 在 `src/features/` 目录下创建新功能的组件和逻辑
2. 在 `src/pages/` 目录下创建新功能的页面
3. 如果需要，在 `src/store/` 目录下添加新的状态管理
4. 在导航菜单中添加新功能的入口

## 常见问题

### 1. 如何处理大型 JSON 数据？

对于大型 JSON 数据（超过 10MB），建议：
- 使用树形视图而不是图形视图
- 启用虚拟化渲染
- 考虑分批处理数据

### 2. 如何优化图形视图的性能？

- 限制初始显示的节点数量
- 实现节点懒加载
- 使用 React.memo 缓存节点组件
- 优化布局算法

### 3. 如何添加新的主题？

1. 在 `src/constants/theme.ts` 中定义新主题
2. 在 `src/contexts/ThemeContext.tsx` 中添加新主题支持
3. 更新主题切换组件

### 4. 如何处理复杂的 JSON Schema？

- 对于复杂的 JSON Schema，考虑分段处理
- 实现递归验证逻辑
- 提供详细的错误信息和位置指示

### 5. 如何优化国际化性能？

- 使用命名空间分割翻译文件
- 只加载当前页面需要的翻译
- 考虑使用翻译缓存 
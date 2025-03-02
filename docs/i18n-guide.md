# 多语言开发规范与模板

本文档提供了在JsonFormat项目中添加和管理多语言支持的完整指南。遵循这些规范可以确保多语言功能的一致性和可维护性。

## 目录

1. [支持的语言](#支持的语言)
2. [文件结构](#文件结构)
3. [添加新语言](#添加新语言)
4. [翻译最佳实践](#翻译最佳实践)
5. [组件中使用翻译](#组件中使用翻译)
6. [服务端渲染支持](#服务端渲染支持)
7. [语言切换](#语言切换)
8. [测试多语言功能](#测试多语言功能)

## 支持的语言

当前项目支持以下语言：

| 语言代码 | 语言名称 | 状态 |
|---------|---------|------|
| en      | English | 默认语言 |
| zh      | 中文    | 已支持 |

## 文件结构

多语言文件存储在以下位置：

```
/public/locales/
  ├── en/                 # 英文翻译
  │   ├── common.json     # 通用翻译
  │   └── editor.json     # 编辑器页面翻译
  └── zh/                 # 中文翻译
      ├── common.json     # 通用翻译
      └── editor.json     # 编辑器页面翻译
```

主要配置文件：

- `/next-i18next.config.js` - next-i18next配置
- `/src/contexts/LanguageContext.tsx` - 语言上下文管理
- `/src/components/LanguageSwitcher.tsx` - 语言切换组件

## 添加新语言

要添加新语言支持，请按照以下步骤操作：

### 1. 更新配置文件

在 `next-i18next.config.js` 中添加新语言：

```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'your_new_locale'], // 添加新语言代码
    localeDetection: false,
  },
  localePath: './public/locales',
}
```

### 2. 创建翻译文件

为新语言创建翻译文件目录和文件：

```
/public/locales/your_new_locale/
  ├── common.json
  └── editor.json
```

从英文版本复制翻译文件并翻译内容：

```bash
cp -r public/locales/en/* public/locales/your_new_locale/
```

### 3. 更新LanguageContext

在 `src/contexts/LanguageContext.tsx` 中添加新语言支持：

```typescript
// 1. 导入新语言的翻译文件
import newLocaleTranslations from '../../public/locales/your_new_locale/common.json';

// 2. 更新Language类型
type Language = 'en' | 'zh' | 'your_new_locale';

// 3. 更新translations对象
const translations: Record<Language, Translations> = {
  en: enTranslations,
  zh: zhTranslations,
  your_new_locale: newLocaleTranslations,
};
```

### 4. 更新语言切换组件

在 `src/components/LanguageSwitcher.tsx` 中添加新语言选项：

```tsx
<Menu.Dropdown>
  <Menu.Item onClick={() => changeLanguage('en')}>English</Menu.Item>
  <Menu.Item onClick={() => changeLanguage('zh')}>中文</Menu.Item>
  <Menu.Item onClick={() => changeLanguage('your_new_locale')}>新语言名称</Menu.Item>
</Menu.Dropdown>
```

同时更新显示当前语言的逻辑：

```tsx
<Button variant="subtle" leftSection={<FaGlobe />}>
  {language === 'en' ? 'English' : language === 'zh' ? '中文' : '新语言名称'}
</Button>
```

## 翻译最佳实践

### 命名空间

项目使用以下命名空间组织翻译：

- `common.json` - 通用翻译，如导航、按钮、通用文本等
- `editor.json` - 编辑器页面特定翻译

添加新功能时，请考虑翻译应该放在哪个命名空间中。如果需要创建新的命名空间，请确保在所有语言中都添加相应的文件。

### 键名规范

- 使用点表示法组织嵌套结构，如 `features.clearPresentation`
- 使用有意义的键名，反映内容而不是位置
- 保持键名一致性，避免重复

### 变量插值

对于包含变量的文本，使用双大括号标记变量：

```json
{
  "welcome": "欢迎，{{name}}！"
}
```

在代码中使用：

```tsx
t('welcome', { name: userName })
```

## 组件中使用翻译

### 使用LanguageContext

在函数组件中使用翻译：

```tsx
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
};
```

### 使用next-i18next (服务端渲染)

在页面组件中使用服务端渲染的翻译：

```tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page = () => {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default Page;
```

## 服务端渲染支持

对于需要服务端渲染的页面，必须在 `getStaticProps` 或 `getServerSideProps` 中加载翻译：

```tsx
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'other-namespace'])),
    },
  };
};
```

确保加载页面所需的所有命名空间。

## 语言切换

语言切换通过以下方式实现：

1. 更新 LanguageContext 中的语言状态
2. 通过 Next.js 路由切换更新 URL 中的语言参数
3. 将语言选择保存到 localStorage 以便持久化

```tsx
const changeLanguage = (locale: string) => {
  // 更新LanguageContext中的语言状态
  setLanguage(locale as Language);
  
  // 同时更新next-i18next的语言设置，通过路由切换
  router.push({ pathname, query }, asPath, { locale });
};
```

## 测试多语言功能

添加新语言或更新翻译后，请测试以下内容：

1. 所有页面在新语言下是否正确显示
2. 语言切换是否正常工作
3. 刷新页面后是否保持选择的语言
4. 服务端渲染页面是否正确显示翻译
5. 检查是否有缺失的翻译键

### 新语言添加检查清单

- [ ] 在 `next-i18next.config.js` 中添加新语言
- [ ] 创建所有必要的翻译文件
- [ ] 更新 LanguageContext 支持新语言
- [ ] 更新语言切换组件
- [ ] 测试所有页面和功能

## 语言文件模板

以下是添加新语言时可以使用的模板：

### common.json 模板

```json
{
  "title": "JSON Crack",
  "subtitle": "[翻译此处]",
  "description": "[翻译此处]",
  "useForFree": "[翻译此处]",
  "features": {
    "clearPresentation": "[翻译此处]",
    "fastDecision": "[翻译此处]",
    "graspPatterns": "[翻译此处]",
    "shareInsights": "[翻译此处]"
  },
  "goToEditor": "[翻译此处]",
  "vsCode": "[翻译此处]",
  "openSource": "[翻译此处]",
  "tools": "[翻译此处]",
  "converter": "[翻译此处]",
  "converterDesc": "[翻译此处]",
  "generateTypes": "[翻译此处]",
  "generateTypesDesc": "[翻译此处]",
  "jsonSchema": "[翻译此处]",
  "jsonSchemaDesc1": "[翻译此处]",
  "jsonSchemaDesc2": "[翻译此处]",
  "upgrade": "[翻译此处]",
  "editor": "[翻译此处]"
}
```

### editor.json 模板

```json
{
  "// 从英文版复制并翻译所有键": ""
}
```
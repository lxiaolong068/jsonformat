# JSON Format 国际化开发指南

本文档提供了在 JSON Format 项目中添加和管理多语言支持的完整指南。遵循这些规范可以确保多语言功能的一致性和可维护性。

## 目录

1. [支持的语言](#支持的语言)
2. [文件结构](#文件结构)
3. [添加新语言](#添加新语言)
4. [翻译最佳实践](#翻译最佳实践)
5. [组件中使用翻译](#组件中使用翻译)
6. [服务端渲染支持](#服务端渲染支持)
7. [语言切换](#语言切换)
8. [测试多语言功能](#测试多语言功能)
9. [常见问题与解决方案](#常见问题与解决方案)
10. [图片和资源路径处理](#图片和资源路径处理)

## 支持的语言

当前项目支持以下语言：

| 语言代码 | 语言名称 | 状态 |
|---------|---------|------|
| en      | English | 默认语言 |
| zh      | 中文    | 已支持 |
| ja      | 日本語  | 已支持 |

## 文件结构

多语言文件存储在以下位置：

```
/public/locales/
  ├── en/                 # 英文翻译
  │   ├── common.json     # 通用翻译
  │   └── editor.json     # 编辑器页面翻译
  ├── zh/                 # 中文翻译
  │   ├── common.json     # 通用翻译
  │   └── editor.json     # 编辑器页面翻译
  └── ja/                 # 日语翻译
      ├── common.json     # 通用翻译
      └── editor.json     # 编辑器页面翻译
```

主要配置文件：

- `/next-i18next.config.js` - next-i18next 配置
- `/src/contexts/LanguageContext.tsx` - 语言上下文管理
- `/src/components/LanguageSwitcher.tsx` - 语言切换组件

### 翻译文件示例

**common.json**

```json
{
  "navbar": {
    "home": "首页",
    "editor": "编辑器",
    "converter": "格式转换",
    "type": "类型生成",
    "docs": "文档"
  },
  "buttons": {
    "copy": "复制",
    "download": "下载",
    "clear": "清除",
    "import": "导入",
    "export": "导出"
  },
  "messages": {
    "copied": "已复制到剪贴板",
    "downloaded": "文件已下载",
    "error": "发生错误"
  }
}
```

**editor.json**

```json
{
  "toolbar": {
    "file": "文件",
    "view": "视图",
    "tools": "工具",
    "options": "选项"
  },
  "views": {
    "graph": "图形视图",
    "tree": "树形视图"
  },
  "fileMenu": {
    "new": "新建",
    "open": "打开",
    "save": "保存",
    "saveAs": "另存为"
  }
}
```

## 添加新语言

要添加新语言支持，请按照以下步骤操作：

### 1. 更新配置文件

在 `next-i18next.config.js` 中添加新语言：

```javascript
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'your_new_locale'], // 添加新语言代码
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: {
    useSuspense: false,
  }
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

### 3. 更新 LanguageContext

在 `src/contexts/LanguageContext.tsx` 中添加新语言支持：

```typescript
// 1. 导入新语言的翻译文件
import enTranslations from "../../public/locales/en/common.json";
import zhTranslations from "../../public/locales/zh/common.json";
import jaTranslations from "../../public/locales/ja/common.json";
import newLocaleTranslations from '../../public/locales/your_new_locale/common.json';

// 2. 更新 Language 类型
type Language = "en" | "zh" | "ja" | "your_new_locale";

// 3. 更新 translations 对象
const translations: Record<Language, Translations> = {
  en: enTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  your_new_locale: newLocaleTranslations,
};
```

### 4. 更新语言切换组件

在 `src/components/LanguageSwitcher.tsx` 中添加新语言选项：

```tsx
import { Menu, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "src/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanguage = (locale: string) => {
    // 更新 LanguageContext 中的语言状态
    setLanguage(locale as Language);
    
    // 同时更新 next-i18next 的语言设置，通过路由切换
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <Menu>
      <Menu.Target>
        <Button variant="subtle" leftSection={<FaGlobe />}>
          {language === 'en' ? 'English' : 
           language === 'zh' ? '中文' : 
           language === 'ja' ? '日本語' :
           language === 'your_new_locale' ? '新语言名称' : 'English'}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => changeLanguage('en')}>English</Menu.Item>
        <Menu.Item onClick={() => changeLanguage('zh')}>中文</Menu.Item>
        <Menu.Item onClick={() => changeLanguage('ja')}>日本語</Menu.Item>
        <Menu.Item onClick={() => changeLanguage('your_new_locale')}>新语言名称</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
```

### 5. 语言显示规范

在语言切换组件中，必须使用各语言的原生写法显示语言名称，而不是用中文或英文来描述其他语言：

- 英语：使用 "English"（而非"英语"或"英文"）
- 中文：使用 "中文"（而非"Chinese"）
- 日语：使用 "日本語"（而非"日本语"或"Japanese"）
- 其他语言：必须使用该语言自己的原生写法

这确保了用户能够在自己的语言中识别语言选项，提高了用户体验。特别是对于非拉丁字母的语言（如日语、阿拉伯语、俄语等），使用其原生文字表示更有助于用户识别。

示例：
```tsx
// 正确的实现
<Button>
  {language === "en" ? "English" : 
   language === "zh" ? "中文" : 
   language === "ja" ? "日本語" : "English"}
</Button>

// 错误的实现 - 不要使用中文描述其他语言
<Button>
  {language === "en" ? "英语" : 
   language === "zh" ? "中文" : 
   language === "ja" ? "日本语" : "英语"}
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
- 使用小驼峰命名法（camelCase）

**推荐的键名结构：**

```
功能区域.子区域.具体功能
```

例如：
- `navbar.home` - 导航栏中的首页链接
- `editor.toolbar.file` - 编辑器工具栏中的文件菜单
- `converter.formats.json` - 转换器中的 JSON 格式选项

### 变量插值

对于包含变量的文本，使用双大括号标记变量：

```json
{
  "welcome": "欢迎，{{name}}！",
  "fileSize": "文件大小：{{size}} KB",
  "itemCount": "共有 {{count}} 个项目"
}
```

在代码中使用：

```tsx
t('welcome', { name: userName })
t('fileSize', { size: (fileSize / 1024).toFixed(2) })
t('itemCount', { count: items.length })
```

### 复数形式

对于需要处理复数形式的文本，使用以下格式：

```json
{
  "itemCount_one": "{{count}} 个项目",
  "itemCount_other": "{{count}} 个项目"
}
```

在英文版本中可能需要区分单复数：

```json
{
  "itemCount_one": "{{count}} item",
  "itemCount_other": "{{count}} items"
}
```

## 组件中使用翻译

JSON Format 项目使用两种翻译方法：

1. 自定义的 `LanguageContext` 用于客户端翻译
2. `next-i18next` 用于服务端渲染的翻译

### 使用 LanguageContext

在函数组件中使用翻译：

```tsx
import { useLanguage } from 'src/contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
      <button>{t('buttons.save')}</button>
      
      {/* 使用变量 */}
      <p>{t('welcome', { name: userName })}</p>
    </div>
  );
};
```

### 使用 next-i18next (服务端渲染)

在页面组件中使用服务端渲染的翻译：

```tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page = () => {
  const { t } = useTranslation(['common', 'editor']);
  
  return (
    <div>
      <h1>{t('common:title')}</h1>
      <p>{t('common:description')}</p>
      
      {/* 使用特定命名空间 */}
      <div>
        <h2>{t('editor:toolbar.file')}</h2>
        <button>{t('editor:fileMenu.new')}</button>
      </div>
      
      {/* 使用变量 */}
      <p>{t('common:welcome', { name: userName })}</p>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'editor'])),
    },
  };
};

export default Page;
```

## 服务端渲染支持

对于需要服务端渲染的页面，必须在 `getStaticProps` 或 `getServerSideProps` 中加载翻译：

```tsx
// 使用 getStaticProps（静态生成的页面）
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'editor'])),
    },
  };
};

// 使用 getServerSideProps（服务端渲染的页面）
export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'editor'])),
    },
  };
};
```

确保加载页面所需的所有命名空间。如果页面使用了多个组件，每个组件可能需要不同的命名空间，请确保所有需要的命名空间都被加载。

## 语言切换

语言切换通过以下方式实现：

1. 更新 LanguageContext 中的语言状态
2. 通过 Next.js 路由切换更新 URL 中的语言参数
3. 将语言选择保存到 localStorage 以便持久化

```tsx
const changeLanguage = (locale: string) => {
  // 更新 LanguageContext 中的语言状态
  setLanguage(locale as Language);
  
  // 同时更新 next-i18next 的语言设置，通过路由切换
  router.push({ pathname, query }, asPath, { locale });
};
```

### 语言检测与默认语言

项目使用以下逻辑确定用户语言：

1. 首先检查 URL 中的 locale 参数
2. 如果 URL 中没有 locale 参数，则从 localStorage 获取保存的语言设置
3. 如果 localStorage 中没有保存语言设置，则使用默认语言（英文）

```tsx
useEffect(() => {
  // 首先检查 URL 中的 locale 参数
  if (router?.locale && (router.locale === "en" || router.locale === "zh" || router.locale === "ja")) {
    setLanguage(router.locale as Language);
    localStorage.setItem("language", router.locale);
  } else {
    // 如果 URL 中没有 locale 参数，则从 localStorage 获取保存的语言设置
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh" || savedLanguage === "ja")) {
      setLanguage(savedLanguage);
    }
  }
}, [router?.locale]);
```

## 测试多语言功能

添加新语言或更新翻译后，请测试以下内容：

1. 所有页面在新语言下是否正确显示
2. 语言切换是否正常工作
3. 刷新页面后是否保持选择的语言
4. 服务端渲染页面是否正确显示翻译
5. 检查是否有缺失的翻译键

### 测试方法

1. **视觉检查**：切换到新语言，浏览所有页面和功能，确保所有文本都已翻译。
2. **功能测试**：确保语言切换后所有功能仍然正常工作。
3. **刷新测试**：切换语言后刷新页面，确保语言设置被保留。
4. **URL 测试**：检查 URL 中的语言参数是否正确更新。
5. **控制台检查**：查看浏览器控制台是否有与翻译相关的错误或警告。

### 新语言添加检查清单

- [ ] 在 `next-i18next.config.js` 中添加新语言
- [ ] 创建所有必要的翻译文件
- [ ] 更新 LanguageContext 支持新语言
- [ ] 更新 LanguageSwitcher 组件
- [ ] 测试所有页面和功能
- [ ] 更新文档

## 常见问题与解决方案

### 1. 翻译未显示或显示键名

**问题**：页面上显示翻译键名而不是翻译文本。

**可能原因**：
- 翻译文件中缺少该键
- 命名空间不正确
- 翻译文件未正确加载

**解决方案**：
- 检查翻译文件中是否存在该键
- 确保使用了正确的命名空间
- 在服务端渲染页面中，确保在 `getStaticProps` 或 `getServerSideProps` 中加载了正确的命名空间

### 2. 服务端渲染页面显示默认语言

**问题**：切换语言后，服务端渲染的页面仍显示默认语言。

**可能原因**：
- 未在 `getStaticProps` 或 `getServerSideProps` 中正确处理 locale 参数
- next-i18next 配置问题

**解决方案**：
- 确保在 `getStaticProps` 或 `getServerSideProps` 中正确使用 locale 参数
- 检查 next-i18next 配置是否正确

### 3. 语言切换后 URL 未更新

**问题**：切换语言后 URL 中的语言参数未更新。

**可能原因**：
- 路由切换代码有问题

**解决方案**：
- 确保正确使用 `router.push` 方法，包含 locale 参数

### 4. i18next 警告：NO_I18NEXT_INSTANCE

**问题**：控制台显示警告 "react-i18next:: useTranslation: You will need to pass in an i18next instance by using initReactI18next"

**可能原因**：
- i18next 未正确初始化

**解决方案**：
- 在 `_app.tsx` 中添加 i18next 初始化代码：

```tsx
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// 初始化 i18next
i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
```

### 5. 新添加的翻译不生效

**问题**：添加新的翻译后，页面上未显示新翻译。

**可能原因**：
- 开发服务器缓存问题
- 翻译文件格式错误

**解决方案**：
- 重启开发服务器
- 检查翻译文件格式是否正确（有效的 JSON）
- 确保翻译键的路径正确

## 图片和资源路径处理

在多语言应用中，图片和资源路径的处理需要特别注意，以确保在不同语言环境下资源能够正确加载和显示。

### 资源路径规范

1. **静态资源路径**：所有静态资源（图片、图标、字体等）应统一存放在 `/public/assets/` 目录下，并使用绝对路径引用：

```tsx
// 正确的引用方式
<Image src="/assets/logo.png" alt="Logo" />

// 错误的引用方式
<Image src="../images/logo.png" alt="Logo" />
```

2. **语言特定资源**：如果某些图片或资源需要根据语言变化（如带有文字的图片），应按照语言代码组织目录结构：

```
/public/assets/
  ├── common/           # 通用资源，不随语言变化
  │   ├── logo.png
  │   └── favicon.ico
  ├── en/               # 英文特定资源
  │   ├── banner.png
  │   └── diagram.svg
  ├── zh/               # 中文特定资源
  │   ├── banner.png
  │   └── diagram.svg
  └── ja/               # 日语特定资源
      ├── banner.png
      └── diagram.svg
```

在代码中根据当前语言动态引用：

```tsx
import { useLanguage } from 'src/contexts/LanguageContext';

const Banner = () => {
  const { language } = useLanguage();
  
  return (
    <Image 
      src={`/assets/${language}/banner.png`} 
      alt="Banner" 
    />
  );
};
```

### 图片替换最佳实践

当需要替换图片资源时，请遵循以下最佳实践：

1. **保持一致的命名规则**：新资源应遵循项目的命名规则，使用有意义的名称。

2. **更新所有引用**：确保更新所有引用该资源的组件和文件。

3. **维护图片尺寸一致性**：替换图片时应保持相似的尺寸比例，或在组件中明确设置尺寸属性。

4. **检查响应式行为**：确保替换后的图片在不同屏幕尺寸下仍然表现良好。

5. **优化图片大小**：新添加的图片应进行适当的压缩和优化，以提高加载性能。

### 图片国际化示例

以下是一个完整的示例，展示如何根据当前语言环境加载不同的图片资源：

```tsx
import { useLanguage } from 'src/contexts/LanguageContext';
import { Image, Box } from '@mantine/core';

const LocalizedDiagram = () => {
  const { language } = useLanguage();
  
  // 根据语言选择合适的图片路径
  const getImagePath = () => {
    // 首先检查是否存在语言特定版本
    if (['zh', 'ja'].includes(language)) {
      return `/assets/${language}/diagram.png`;
    }
    
    // 默认使用英文版本
    return '/assets/en/diagram.png';
  };
  
  return (
    <Box>
      <Image 
        src={getImagePath()} 
        alt="Diagram" 
        width={600}
        height="auto"
        loading="lazy"
      />
    </Box>
  );
};
```

### 图片路径审查清单

在提交代码前，请检查以下内容：

- [ ] 所有图片资源使用正确的绝对路径（`/assets/...`）
- [ ] 语言特定的图片已为所有支持的语言提供对应版本
- [ ] 图片加载逻辑正确处理语言切换
- [ ] 图片具有适当的 `alt` 属性，且该属性已翻译
- [ ] 图片尺寸设置合理，支持响应式布局
- [ ] 所有新增图片已优化大小
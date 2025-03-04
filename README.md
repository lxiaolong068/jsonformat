# JSON Format

[![GitHub Stars](https://img.shields.io/github/stars/AykutSarac/jsoncrack.com.svg)](https://github.com/AykutSarac/jsoncrack.com)

## 概述

JSON Format 是一个功能强大的 Web 工具，专为可视化、分析和处理 JSON 数据而设计。它提供了图形视图和树形视图两种方式来展示 JSON 结构，使复杂的数据关系更加直观易懂。除了可视化功能外，JSON Format 还提供了多种数据格式（JSON、CSV、XML 和 YAML）之间的无缝转换，并能直接从您的数据生成多种编程语言的类型定义（Go、Kotlin、Rust、TypeScript），从而简化您的开发工作流程。

## 主要功能

*   **数据可视化：**
    *   **图形视图：** 将 JSON 数据以交互式图形方式展示，直观呈现数据结构和关系。
    *   **树形视图：** 以层次结构展示 JSON 数据，方便浏览和理解。
*   **格式转换：** 支持 JSON、CSV、XML 和 YAML 格式之间的相互转换，满足不同场景需求。
*   **类型生成：** 从 JSON、CSV、XML 和 YAML 数据自动生成 Go、Kotlin、Rust 和 TypeScript 的类型定义。
*   **多语言支持：** 界面支持多种语言，包括英文和中文，未来将支持更多语言。
*   **JSON 编辑器：** （未来功能）直接在应用程序中编辑 JSON 数据。
*   **JSON Schema 工具：** 验证 JSON 数据并生成 JSON Schema。
*   **嵌入式组件：** 提供可嵌入的组件，方便将 JSON Format 功能集成到其他应用程序中。
*   **文档：** 应用内提供全面的使用文档。

## 在线演示

体验 JSON Format：[https://jsoncrack.com](https://jsoncrack.com)

## 使用指南

### 数据可视化
1. 在编辑器中粘贴您的 JSON 数据或导入文件。
2. 使用顶部工具栏切换视图模式（图形视图/树形视图）。
3. 在图形视图中，您可以：
   - 拖动节点重新排列布局
   - 使用鼠标滚轮或触控板缩放视图
   - 点击节点展开/折叠子节点
   - 使用搜索功能快速定位特定数据
4. 在树形视图中，您可以：
   - 点击箭头展开/折叠节点
   - 使用搜索功能过滤数据

### 格式转换
1. 导航至"转换器"（Converter）部分。
2. 从左侧下拉菜单选择输入格式（JSON、CSV、XML 或 YAML）。
3. 从右侧下拉菜单选择输出格式。
4. 在左侧编辑器中输入或粘贴源数据。
5. 右侧编辑器将自动显示转换后的结果。
6. 使用"复制"按钮复制转换结果，或使用"下载"按钮保存为文件。

### 类型生成
1. 导航至"类型"（Type）部分。
2. 选择源数据格式（JSON、CSV、XML 或 YAML）。
3. 选择目标编程语言（Go、Kotlin、Rust 或 TypeScript）。
4. 在左侧编辑器中输入或粘贴源数据。
5. 右侧编辑器将自动生成相应的类型定义代码。
6. 使用"复制"按钮复制生成的代码，或使用"下载"按钮保存为文件。

### JSON Schema 工具
1. 导航至"工具" > "JSON Schema"部分。
2. 在左侧编辑器中输入或粘贴 JSON 数据。
3. 右侧编辑器将自动生成对应的 JSON Schema。
4. 您也可以在左侧输入 JSON Schema，右侧将生成符合该 Schema 的示例 JSON 数据。

## 文档

详细文档可在以下位置找到：

- [用户指南](docs/user-guide.md) - 详细的使用说明和功能介绍
- [技术架构](docs/architecture.md) - 项目架构和技术实现
- [国际化指南](docs/i18n-guide.md) - 多语言支持和翻译指南

## 安装说明
这是一个 Web 应用程序，无需安装。直接访问 [https://jsoncrack.com](https://jsoncrack.com) 即可使用。

对于希望在本地运行的开发者：

1. 克隆仓库：
   ```bash
   git clone https://github.com/AykutSarac/jsoncrack.com.git
   ```
2. 安装依赖：
   ```bash
   pnpm install
   ```
3. 运行开发服务器：
   ```bash
   pnpm run dev
   ```
4. 构建生产版本：
   ```bash
   pnpm run build
   ```
5. 启动生产服务器：
   ```bash
   pnpm run start
   ```

## 技术栈

JSON Format 使用以下技术构建：

- **前端框架**：React、Next.js
- **UI 组件**：Mantine UI
- **可视化**：Reaflow
- **状态管理**：Zustand
- **国际化**：next-i18next
- **编辑器**：Monaco Editor

## 最近更新

### 错误修复
- 修复了多个文件中的引号问题，解决了导致语法错误的问题
- 修正了图标导入问题（将 `LuXCircle` 替换为 `LuX`）
- 更新了 Next.js 链接用法，遵循最佳实践
- 增强了 i18next 配置，改进了国际化支持

### 新功能
- 改进了 JSON 编辑器的性能
- 优化了移动设备上的用户体验
- 添加了更多语言支持
- 完善了项目文档

## 贡献指南

我们欢迎各种形式的贡献！请参阅 `CONTRIBUTING.md` 文件了解详细指南。

### 贡献流程
1. Fork 项目仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 国际化

JSON Format 支持多种语言。目前，英文和中文已完全支持，未来计划添加更多语言。

如果您想贡献翻译或添加对新语言的支持，请参阅我们的[国际化指南](docs/i18n-guide.md)获取详细说明。

### 添加新语言
1. 在 `public/locales` 目录下创建新的语言文件夹
2. 复制 `en` 文件夹中的 JSON 文件到新文件夹
3. 翻译 JSON 文件中的文本
4. 在 `next-i18next.config.js` 中添加新语言

## 常见问题解答

**问：我可以离线使用 JSON Format 吗？**
答：目前 JSON Format 主要是一个在线工具，但您可以克隆仓库并在本地运行。

**问：JSON Format 支持哪些浏览器？**
答：JSON Format 支持所有现代浏览器，包括 Chrome、Firefox、Safari 和 Edge 的最新版本。

**问：如何报告 bug 或请求新功能？**
答：请在 GitHub 仓库中创建一个 issue，详细描述您遇到的问题或建议的功能。

**问：JSON Format 是否支持大型 JSON 文件？**
答：是的，但对于非常大的文件（超过 10MB），可能会出现性能问题。我们建议在这种情况下使用树形视图而不是图形视图。

## 许可证

本项目采用 [MIT 许可证](LICENSE) 授权。
